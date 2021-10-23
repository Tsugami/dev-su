async function fetchGraphQL<V extends Record<string, unknown>>(text: string, variables: V) {
  const response = await fetch(process.env.REACT_APP_API_URI as string, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}

export default fetchGraphQL;
