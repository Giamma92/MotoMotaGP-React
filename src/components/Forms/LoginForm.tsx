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
import Input from 'components/UI/form/Input';
// import { useFormInput } from 'components/UI/form/FormInput';
// import type { LazyQueryHookOptions } from '@apollo/client';

function LoginForm() {

  let authContext: any = useAuth(); 
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    username: '',
    password: '',
    remember: true,

    isValid: true
  });


  function OnChangeInputForm(value: any, error: string, field: string): void {
      (formState as any)[field] = value;

      const isValid = !error || error === ''
      setFormState({...formState, isValid})
  }

  function  ValidatePassword(value: any) {
    if (value?.length < 8) {
          return 'La password deve essere lunga almeno 8 caratteri';
        }
        return ''; // No error
  }

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
    if(!formState.username || formState.username === '' || !formState.password || formState.password === '')
      notifyError("Inserisci username e password!");
    else 
      doLogin({
        variables: { 
          username: formState.username, 
          password: Md5.hashStr(formState.password) 
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
                    <h1 className="text-xl text-white font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Accedi con il tuo account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <Toast />
                        {loading && <h2 className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Caricamento...</h2>}
                        <div>
                            <Input
                              label="Username"
                              type="text"
                              id="username"
                              placeholder="Inserisci il tuo nome utente..."
                              autoComplete='username'
                              value={formState.username}
                              onChange={(value, err) => OnChangeInputForm(value, err, 'username')}
                              required={true}
                            />
                        </div>
                        <div>
                          <Input
                              label="Password"
                              type="password"
                              id="password"
                              placeholder="Inserisci la tua password..."
                              autoComplete='current-password'
                              value={formState.password}
                              onChange={(value, err) => OnChangeInputForm(value, err, 'password')}
                              validationFn={ValidatePassword}
                              required={true}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                  <Input
                                    label=""
                                    type="checkbox"
                                    id="remember"
                                    placeholder="Inserisci la tua password..."
                                    value={formState.remember}
                                    onChange={(value, err) => OnChangeInputForm(value, err, 'remember')}
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                  />
                                </div>
                                <div className="ml-3 text-sm">
                                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Ricordati di me</label>
                                </div>
                            </div>
                            <a href="/" className="text-sm text-white font-medium text-primary-600 hover:underline dark:text-primary-500">Password dimenticata?</a>
                        </div>
                        <button className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                disabled = {!formState.isValid}
                                style={{backgroundColor: !formState.isValid ? 'grey' : ''}}
                                onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      console.log("[LoginForm] Submit login");
                                      sendLogin();
                                    }
                                }
                        >Accedi
                      </button>
                    </form>
                </div>
        </div>
      </section>
    )

  );
};

export default LoginForm;