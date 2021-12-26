import { ApolloServer, gql } from "apollo-server";
import { v4 } from "uuid";
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

const posts = [
  {
    id: 1,
    title: "Post Title One",
    description: "",
    published: false,
    author: 1,
  },
  {
    id: 2,
    title: "Post Title Two",
    description: "",
    published: false,
    author: 2,
  },
  {
    id: 3,
    title: "Post Title Three",
    description: "",
    published: true,
    author: 3,
  },
];

const comments = [
  { id: 1, text: "great post", author: 3, post: 1 },
  { id: 2, text: "Amazing post", author: 1, post: 2 },
  { id: 3, text: "The best post", author: 2, post: 3 },
  { id: 4, text: "what is this", author: 2, post: 1 },
];
const typeDefs = gql`
  type Query {
    me: User!
    post(id: ID!): Post!
    posts: [Post!]!
    users(query: String): [User!]!
    comments: [Comment!]!
  }
  type Mutation {
    createUser(data: CreateUserInput): User!
    createPost(data: CreatePostInput): Post!
    createComment(text: String!): Comment!
  }
  # to organize creaeUser we can implemnt input
  input CreateUserInput {
    username: String!
    email: String!
    name: String!
  }
  input CreatePostInput {
    title: String!
    description: String!
    published: Boolean!
  }
  input CreateCommentInput {
    id: Int
    text: String!
  }
  type User {
    name: String!
    username: String!
    email: String!
    password: String
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    description: String!
    published: Boolean!
    author: User!
  }
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

// Resolvers
const resolvers = {
  Post: {
    author(parent) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
  },
  Comment: {
    author(parent) {
      return users.find((user) => user.id === parent.author);
    },
    post(parent) {
      return posts.find((post) => post.id === parent.post);
    },
  },
  User: {
    posts(parent) {
      return posts.filter((post) => post.id === parent.id);
    },
    comments(parent) {
      return comments.filter((comment) => comment.id === parent.id);
    },
  },

  Mutation: {
    createUser(_, args) {
      // check if email is taken
      // 1) Find, Filter, Reduce, Map, some,
      const isEmailTaken = users.find((user) => user.email === args.data.email);
      if (isEmailTaken) {
        throw new Error("Email arealy Taken");
      }
      const user = { id: v4(), ...args.data };
      users.push(user);
      // console.log(users);
      return user;
    },
    createPost(_, args) {
      const post = { id: v4(), ...args.data };
      posts.push();
      return post;
    },
  },
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
    comments() {
      return comments;
    },
    me: () => {
      return {
        username: "username",
        email: "example@email.com",
      };
    },
    posts() {
      return posts;
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
