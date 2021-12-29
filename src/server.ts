import { createServer, createPubSub } from "graphql-yoga";
import { readFileSync } from "fs";
// import typeDefs from "./schema.graphql";
import db from "./db";
// we must convert the file Buffer to a UTF-8 string
const typeDefs = readFileSync("./src/schema.graphql").toString("utf-8");
import { Subscription } from "./resolvers/Subscription";
import { Query } from "./resolvers/Query";
import { Mutation } from "./resolvers/Mutation";
import { Post } from "./resolvers/Post";
import { User } from "./resolvers/User";
import { Comment } from "./resolvers/Comment";

const pubsub = createPubSub();
const resolvers = { Subscription, Query, Mutation, Post, User, Comment };
// Provide your schema
const server = createServer({
  typeDefs,
  resolvers,
  context: {
    db,
    pubsub,
  },
});

server.start();
