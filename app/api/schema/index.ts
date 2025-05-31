import { createSchema } from "graphql-yoga";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import { moviesTypeDefs, moviesResolvers } from "../schema/movies";

const typeDefs = mergeTypeDefs([moviesTypeDefs]);
const resolvers = mergeResolvers([moviesResolvers]);

export const schema = createSchema({
  typeDefs,
  resolvers,
});