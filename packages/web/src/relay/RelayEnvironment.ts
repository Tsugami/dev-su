import { Environment, Network, RecordSource, Store, FetchFunction } from 'relay-runtime';
import fetchGraphQL from './fetchGraphQL';

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
const fetchRelay: FetchFunction = async (params, variables) => {
  console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`);
  console.log(params.text); // a
  return fetchGraphQL(params.text as string, variables);
};

// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
