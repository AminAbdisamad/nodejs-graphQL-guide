const users = [
  {
    id: "1",
    name: "Alas",
    username: "alas",
    email: "alas@example.com",
    password: "****",
  },
  {
    id: "2",
    name: "Peterson",
    username: "peters",
    email: "peters@example.com",
    password: "****",
  },
  {
    id: "3",
    name: "Check",
    username: "checki",
    email: "checki@example.com",
    password: "****",
  },
];

const posts = [
  {
    id: "1",
    title: "Post Title One",
    description: "",
    published: false,
    author: "1",
    comment: "1",
  },
  {
    id: "2",
    title: "Post Title Two",
    description: "",
    published: false,
    author: "2",
    comment: "2",
  },
  {
    id: "3",
    title: "Post Title Three",
    description: "",
    published: true,
    author: "3",
    comment: "3",
  },
];

const comments = [
  { id: "1", text: "great post", author: "3", post: "1" },
  { id: "2", text: "Amazing post", author: "1", post: "2" },
  { id: "3", text: "The best post", author: "2", post: "3" },
  { id: "4", text: "what is this", author: "2", post: "1" },
];

const db = { users, posts, comments };
export default db;
