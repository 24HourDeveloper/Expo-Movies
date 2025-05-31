import { createYoga } from "graphql-yoga";
import { schema } from "./schema";

const yoga = createYoga({
  schema,
  fetchAPI: {
    Request: Request,
    Response: Response,
  },
});

export const GET = async (req: Request) => {
  return yoga.handleRequest(req, {});
};

export const POST = async (req: Request) => {
  return yoga.handleRequest(req, {});
};


