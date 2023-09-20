import { render, screen } from '@testing-library/react';
import App from './App';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from './components/constants';

test('renders app', () => {

  //Server Link
  const httpLink = new HttpLink({ uri: process.env.REACT_APP_PUBLIC_GRAPHQL_SERVER_URL })
  console.log("Apollo server url: ", process.env)
  //Auth token
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
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


  render(
    <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  );
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
