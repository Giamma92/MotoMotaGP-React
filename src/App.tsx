import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from './components/Auth/AuthContext';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// Pages
import Login from './components/Pages/Login'
import NoPage from './components/Pages/NoPage';
import Home from 'components/Pages/Home';
import TableBetsRace from "components/Pages/TableBetsRace";


// Route elements
// import PrivateOutlet from './components/Auth/PrivateOutlet';
import PrivateRoute from 'components/Auth/PrivateRoute';

//Font-awesome Icons
// import the library
import { library } from '@fortawesome/fontawesome-svg-core'

// import your icons
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import Layout from "components/UI/elements/Layout";

function App() {

  const authContext = useAuth();
  
  //Server Links
  const httpLink = new HttpLink({ uri: process.env.REACT_APP_PUBLIC_GRAPHQL_SERVER_URL });
  
  //Auth Link
  // apply widdleware to add access token to request
  const authLink = setContext((_, { headers }) => {
    const token = authContext.token;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  //Error Links
  // handle network error
  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          // Apollo Server sets code to UNAUTHENTICATED
          // when an AuthenticationError is thrown in a resolver
          case "UNAUTHENTICATED":
            // Modify the operation context with a new token
            // const oldHeaders = operation.getContext().headers;
            // operation.setContext({
            //   headers: {
            //     ...oldHeaders,
            //     authorization: getNewToken(),
            //   },
            // });
            // authContext.logout();
            // Retry the request, returning the new observable
            return forward(operation);
        }
      }
    }
  
    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  // Apollo client
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
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
            <Route path="betsrace" element={
              <PrivateRoute>
                <Layout>
                  <TableBetsRace />
                </Layout>
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
library.add(fab, fas, far);
