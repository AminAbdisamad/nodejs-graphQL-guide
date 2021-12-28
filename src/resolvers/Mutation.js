import { v4 } from "uuid";

export const Mutation = {
  createUser(_, args, ctx) {
    const { users } = ctx.db;
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
  updateUser(_, args, { db }) {
    //   Get user by id
    const { id, data } = args;
    const user = db.users.find((user) => user.id == parseInt(id));
    if (!user) {
      throw new Error("User not found");
    }
    if (typeof data.email === "string") {
      const isEmailTaken = db.users.some((user) => user.email === data.email);
      if (isEmailTaken) {
        throw new Error("Email already taken");
      }
      user.email = data.email;
    }
    if (typeof data.username === "string") {
      user.username = data.username;
    }
    if (typeof data.name === "string") user.name = data.name;
    return user;
  },
  createPost(_, args, ctx) {
    const { posts } = ctx.db;
    const post = { id: v4(), ...args.data };
    posts.push(post);
    return post;
  },

  deletePost(_, args, ctx) {
    // check if post exist
    console.log(args.id);
    const { posts } = ctx.db;
    const postIndex = posts.findIndex((post) => post.id === parseInt(args.id));
    console.log(postIndex);
    if (postIndex === -1) {
      throw new Error("Post not found");
    }
    // Remove from posts
    posts.slice(postIndex, 1);
    return posts[postIndex];
  },

  updateComment(_, { id, data }, { db }) {
    // check if the comment exist
    const comment = db.comments.find((comment) => comment.id === parseInt(id));
    console.log(comment);
    if (!comment) {
      throw new Error("Comment not found");
    }
    if (typeof data.text === "string") {
      // user can only modify their comment
      comment.text = data.text;
    }
    return comment;
  },
};
