import 'scss/LoginForm.scss';
import { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { Navigate, useNavigate } from 'react-router-dom';
import { Md5 } from 'ts-md5';
// import { LOGIN_QUERY } from './queries';
import { LOGIN_MUTATION } from '../mutations';
// import { AUTH_TOKEN } from './constants';
import { Toast, notifyError, notifySuccess } from "../Toast";
import { useAuth } from '../Auth/AuthContext';
// import type { LazyQueryHookOptions } from '@apollo/client';

function LoginForm() {

  let authContext: any = useAuth(); 
  const navigate = useNavigate();

  // //clear token when navigate to login page
  // authContext.logout();

  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });

  // const [ loginState ] = useState({
  //   error: '',
  // });

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

  const firstUpdate = useRef(true);

  useEffect(() => {

    //avoid first render
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    // handle data here
    if(!loading) {
      if(!!data?.loginUser?.token) {
        //console.log(data);
        authContext.login(data.loginUser.token);
        console.log("[LoginForm] Login successful!");
        // localStorage.setItem('config', JSON.stringify(data.config, null, 4));
        
        notifySuccess('Login effettuato con successo!');
        navigate('/');
  
      } 
      else if (!!error || !data?.loginUser?.token) {
        notifyError('Username o password errati!');;
        console.log("[LoginForm] Login failed!");
      }
      
    }
    
    
  }, [data, loading, error, authContext, navigate]);

  return (
    authContext.isAuthenticated() ? <Navigate to="/" /> 
    : (

      <section className="bg-gray-50 dark:bg-gray-900">
            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <Toast />
                        {loading && <h2>Loading...</h2>}
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                            <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required 
                                onChange={(e) =>
                                  setFormState({
                                    ...formState,
                                    username: e.target.value
                                  })
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
                                onChange={(e) =>
                                  setFormState({
                                    ...formState,
                                    password: Md5.hashStr(e.target.value)
                                  })
                                }
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                  <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="/" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            onClick={(e) => {
                                  e.preventDefault();
                                  console.log("[LoginForm] Submit login");
                                  sendLogin();
                                }
                              }
                        >Sign in</button>
                    </form>
                </div>
        </div>
      </section>
    // <form className="login-form space-content">
    //   <Toast />
    //   <div className="login-form__controls">
    //   {!!loginState && <h5>{loginState.error}</h5>}
    //   {error && <h5>{error?.message}</h5>}
    //   {loading && <h2>Loading...</h2>}
    //     <label>Username</label>
    //     <input type="username" name="username" required
    //       onChange={(e) =>
    //         setFormState({
    //           ...formState,
    //           username: e.target.value
    //         })
    //       }/>
    //   </div>
    //   <div className="login-form__controls">
    //     <label>Password</label>
    //     <input type="password" name="password" autoComplete="on" required onChange={(e) =>
    //         setFormState({
    //           ...formState,
    //           password: Md5.hashStr(e.target.value)
    //         })
    //       } />
    //   </div>
    //   <button className="button color-secondary behavior-full" 
    //     onClick={(e) => {
    //         e.preventDefault();
    //         console.log("[LoginForm] Submit login");
    //         sendLogin();
    //       }
    //     }
    //     >Login
    //   </button>
    //   <label className="checkbox">
    //     <input type="checkbox" name="remember" />
    //     <span>Remember me</span>
    //   </label>
    //   <a href="/">Forgot password?</a>
    // </form>
    )

  );
};

export default LoginForm;