import { ApolloServer, gql } from "apollo-server";

import { readFileSync } from "fs";
// import typeDefs from "./schema.graphql";
import db from "./db";
// we must convert the file Buffer to a UTF-8 string
const typeDefs = readFileSync("./src/schema.graphql").toString("utf-8");
import { Query } from "./resolvers/Query";
import { Mutation } from "./resolvers/Mutation";
import { Post } from "./resolvers/Post";
import { User } from "./resolvers/User";
import { Comment } from "./resolvers/Comment";
// Resolvers
const resolvers = {
  Query,
  Mutation,
  User,
  Post,
  Comment,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    db,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// GraphQL Scalar Types
// 1) String
// 2) Int
// 3) Boolean
// 4) Float
// 5) ID

// There are 4 arguments thats gets passed to all resolver functions
// 1) Parent - parent
// 2) Args - arg - agrs provided
// 3) Context - ctx - contextual data - for example id of user
// 4) Info - info -- actual information sent to server
// example
// Query: {
// greeting(info,arg,ctx,info){
//
// }
// }

// Type definations - Schema

// — Customer
// — Item
// — Number of items
// — Balance
// — Credit
// — Total
// — Number pieces
