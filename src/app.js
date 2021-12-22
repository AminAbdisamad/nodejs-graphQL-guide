import { ApolloServer, gql } from "apollo-server";

// Type definations - Schema

// — Customer
// — Item
// — Number of items
// — Balance
// — Credit
// — Total
// — Number pieces

const users = [
  {
    id: 1,
    name: "Alas",
    username: "alas",
    email: "alas@example.com",
    password: "****",
  },
  {
    id: 2,
    name: "Peterson",
    username: "peters",
    email: "peters@example.com",
    password: "****",
  },
  {
    id: 3,
    name: "Check",
    username: "checki",
    email: "checki@example.com",
    password: "****",
  },
];
const typeDefs = gql`
  type Query {
    me: User!
    post: Post!
    users(query: String): [User!]!
  }

  type User {
    name: String
    username: String!
    email: String!
    password: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    description: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users(_, { query }) {
      if (!query) {
        return users;
      }
      return users.filter((user) => {
        const name = user.name.toLowerCase();
        return name.includes(query.toLowerCase());
      });
    },

    me: () => {
      return {
        username: "username",
        email: "example@email.com",
      };
    },
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
