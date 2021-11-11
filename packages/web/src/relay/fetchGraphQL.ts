async function fetchGraphQL<V extends Record<string, unknown>>(query: string, variables: V) {
  const response = await fetch(process.env.REACT_APP_API_URI as string, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      authentication: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  // Get the response as JSON
  const data = await response.json();

  return data;
}

export default fetchGraphQL;
