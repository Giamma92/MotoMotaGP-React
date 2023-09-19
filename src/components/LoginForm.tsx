import '../scss/LoginForm.scss';
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Md5 } from 'ts-md5';
import { LOGIN_QUERY } from './queries';
import { Toast, notifyError, notifySuccess } from "./Toast";
import type { LazyQueryHookOptions } from '@apollo/client';


localStorage.clear();

function LoginForm() {

  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });

  const [loginState, setLoginState] = useState({
    error: '',
  });

  const queryOptions = {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  } as LazyQueryHookOptions

  const [ doLogin, { loading, error, data }] = useLazyQuery(LOGIN_QUERY, queryOptions);

  useEffect(() => {
    // handle data here
    if(data && data.user && data.user.iduser && !loading) {
      //console.log(data);
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('user', JSON.stringify(data.user, null, 4));
      localStorage.setItem('config', JSON.stringify(data.config, null, 4));
      
      notifySuccess('Login effettuato con successo!');
      window.location.href = '/';
    } else if(!!data && !data.user && !loading) {
      localStorage.setItem('isLoggedIn', "false");
      notifyError('Username o password errati!');
      // setLoginState({error: 'Login Failed!'});
    }
    
  }, [data, loading]);

  return (
    <form className="login-form space-content">
      <Toast />
      <div className="login-form__controls">
      {!!loginState && <h5>{loginState.error}</h5>}
      {error && <h5>{error?.message}</h5>}
      {loading && <h2>Loading...</h2>}
        <label>Username</label>
        <input type="username" name="username" required
          onChange={(e) =>
            setFormState({
              ...formState,
              username: e.target.value
            })
          }/>
      </div>
      <div className="login-form__controls">
        <label>Password</label>
        <input type="password" name="password" autoComplete="on" required onChange={(e) =>
            setFormState({
              ...formState,
              password: Md5.hashStr(e.target.value)
            })
          } />
      </div>
      <button className="button color-secondary behavior-full" 
        onClick={(e) => {
          e.preventDefault();
          console.log("[LoginForm] Submit login");
          doLogin({ variables: { username: formState.username, password: formState.password, configId: '1' } });}
        }
        >Login
      </button>
      <label className="checkbox">
        <input type="checkbox" name="remember" />
        <span>Remember me</span>
      </label>
      <a href="#">Forgot password?</a>
    </form>
  );
};

export default LoginForm;