import Home from './components/Pages/Home';
import Login from './components/Pages/Login'
import NoPage from './components/Pages/NoPage';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from './components/Auth/AuthContext';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import PrivateOutlet from './components/Auth/PrivateOutlet';

import PrivateRoute from 'components/Auth/PrivateRoute';


function App() {

  const authContext = useAuth();
  
  //Server Link
  const httpLink = new HttpLink({ uri: process.env.REACT_APP_PUBLIC_GRAPHQL_SERVER_URL })

  //Auth token
  const authLink = setContext((_, { headers }) => {
    const token = authContext.token;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  // Apollo client
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
    //uri: process.env.PUBLIC_GRAPHQL_SERVER_URL
  });

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path='/' element={<PrivateOutlet />}>
              <Route element={<Home />} />
            </Route> */}
            <Route index element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
