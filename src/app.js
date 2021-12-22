import { ApolloServer, gql } from "apollo-server";

// Type definations - Schema
const typeDefs = gql`
  type Query {
    id: ID!
    name: String!
    location: String!
    isEmployed: Boolean!
    gpa: Float
    city: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    id: () => "ID2323",
    name: () => "Here is my name",
    location: () => "no idea",
    isEmployed: () => true,
    gpa: () => null,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// GraphQL Scalar Types
// 1) String
// 2) Int
// 3) Boolean
// 4) Float
// 5) ID
