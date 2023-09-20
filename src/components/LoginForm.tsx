import '../scss/LoginForm.scss';
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Md5 } from 'ts-md5';
// import { LOGIN_QUERY } from './queries';
import { LOGIN_MUTATION } from './mutations';
import { AUTH_TOKEN } from './constants';
import { Toast, notifyError, notifySuccess } from "./Toast";
// import type { LazyQueryHookOptions } from '@apollo/client';


localStorage.clear();

function LoginForm() {

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });

  const [ loginState ] = useState({
    error: '',
  });

  // const queryOptions = {
  //   fetchPolicy: "no-cache",
  //   notifyOnNetworkStatusChange: true,
  // } as LazyQueryHookOptions

  //const [ doLogin, { loading, error, data }] = useLazyQuery(LOGIN_QUERY, queryOptions);

  const [doLogin, { loading, error, data }] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: formState.username,
      password: formState.password
    }
    // ,onCompleted: ({ login }) => {
    //   console.log("Get token ", login.token);
    //   localStorage.setItem(AUTH_TOKEN, login.token);
    //   navigate('/');
    // }
  });

  const sendLogin = () => {
    if(!formState.username || !formState.password)
      notifyError("Inserisci username e password!");
    else 
      doLogin({
        variables: { 
          username: formState.username, 
          password: formState.password 
        }
      });
  }

  useEffect(() => {
    // handle data here
    if(data?.loginUser?.token && !loading) {
      //console.log(data);
      localStorage.setItem(AUTH_TOKEN, data.loginUser.token);
      //localStorage.setItem('isLoggedIn', "true");
      // localStorage.setItem('user', JSON.stringify(data.user, null, 4));
      // localStorage.setItem('config', JSON.stringify(data.config, null, 4));
      
      notifySuccess('Login effettuato con successo!');
      navigate('/');
      //window.location.href = '/';
    } else if(!!data && !data.user && !loading) {
      localStorage.setItem('isLoggedIn', "false");
      notifyError('Username o password errati!');
      // setLoginState({error: 'Login Failed!'});
    }
    
  }, [data, loading, navigate]);

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
            sendLogin();
          }
        }
        >Login
      </button>
      <label className="checkbox">
        <input type="checkbox" name="remember" />
        <span>Remember me</span>
      </label>
      <a href="/">Forgot password?</a>
    </form>
  );
};

export default LoginForm;