import { ApolloServer, gql } from "apollo-server";

// Type definations - Schema
const typeDefs = gql`
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return "Hello there";
    },
    name() {
      return "My name is Aminux";
    },
    location() {
      return "Istanbul";
    },
    bio() {
      return "bio";
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
