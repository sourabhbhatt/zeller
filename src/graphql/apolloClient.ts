import {setContext} from '@apollo/client/link/context';
import {createHttpLink} from '@apollo/client/link/http';
import {ApolloClient, InMemoryCache} from '@apollo/client';

import awsExports from '../config/aws-exports';

const httpLink = createHttpLink({
  uri: awsExports.aws_appsync_graphqlEndpoint,
});

const authLink = setContext(async (_, {headers}) => {
  const token = awsExports.aws_appsync_apiKey;
  return {headers: {...headers, 'x-api-key': token}};
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
