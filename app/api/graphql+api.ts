import { buildSchema, graphql } from 'graphql';
//import { schema } from "./schema";
import { moviesResolvers, moviesTypeDefs } from './schema/movies';
import { tvsTypeDefs, tvsResolvers } from './schema/tvs';

const graphiqlHTML = `
<!DOCTYPE html>
<html>
  <head>
    <title>GraphQL Playground</title>
    <link rel="stylesheet" href="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.css" />
  </head>
  <body style="margin: 0; overflow-x: hidden; overflow-y: hidden">
    <div id="sandbox" style="height: 100vh; width: 100vw;"></div>
    <script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script>
    <script>
      new window.EmbeddedSandbox({
        target: '#sandbox',
        initialEndpoint: '/api/graphql',
      });
    </script>
  </body>
</html>
`;

const schema = buildSchema(`${moviesTypeDefs} ${tvsTypeDefs}`);

async function handleGraphQLRequest(req: Request) {
  try {
    const { query, variables } = await req.json();
    
    const result = await graphql({
      schema,
      source: query,
      rootValue: {
        ...moviesResolvers.Query,
        ...tvsResolvers.Query,
      },
      variableValues: variables,
    });

    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error?.message || 'An error occurred' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const query = url.searchParams.get('query');
  const variables = url.searchParams.get('variables');

  // Show GraphQL Playground if no query is provided
  if (!query) {
    return new Response(graphiqlHTML, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }

  try {
    const result = await graphql({
      schema,
      source: query,
      rootValue: {
        ...moviesResolvers.Query,
        ...tvsResolvers.Query,
      },
      variableValues: variables ? JSON.parse(variables) : undefined,
    });

    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error?.message || 'An error occurred' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const POST = async (req: Request) => {
  return handleGraphQLRequest(req);
};



