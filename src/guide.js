import { ApolloServer, gql } from "apollo-server";

// Type definations - Schema

// — Customer
// — Item
// — Number of items
// — Balance
// — Credit
// — Total
// — Number pieces
const typeDefs = gql`
  type Query {
    me: User!
    cargo: Cargo!
    greeting(name: String): String!
    add(number1: Float!, number2: Float!): Float!
    addNumbers(numbers: [Float!]!): Float!
  }
  type User {
    name: String
    username: String!
    email: String!
    password: String!
    age: Int
  }
  type Cargo {
    id: ID!
    customer: Customer!
    item: [Item]!
    kg: Float!
    total: Float!
  }
  type Item {
    name: String!
    description: String
    quantity: Int!
    price: Float!
  }
  type Customer {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    add(_, { number1, number2 }) {
      return number1 + number2;
    },
    addNumbers(_, { numbers }) {
      if (!numbers.length) {
        return 0;
      }
      return numbers.reduce((acc, current) => {
        return acc + current;
      });
    },
    greeting(_, { name }) {
      console.log({ name });
      // console.log({ parent, args, ctx, info });
      return name ? `Greeting ${name}` : "Greeting!!";
    },
    me: () => {
      return {
        username: "username",
        email: "example@email.com",
      };
    },
    cargo: () => {
      return {
        id: "dh34",
        customer: {
          id: "23DS",
          firstName: "Customer",
          lastName: "No LastName",
        },
        item: [
          {
            name: "Item 1",
            quantity: 2,
          },
          {
            name: "Item 2",
            quantity: 5,
          },
        ],
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
