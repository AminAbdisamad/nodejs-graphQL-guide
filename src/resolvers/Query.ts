export const Query = {
  users(_, { query }, { db }) {
    if (!query) {
      return db.users;
    }
    return db.users.filter((user) => {
      const name = user.name.toLowerCase();
      return name.includes(query.toLowerCase());
    });
  },
  comments(parent, _, { db }) {
    return db.comments;
  },
  me: () => {
    return {
      username: "username",
      email: "example@email.com",
    };
  },
  post(_, args, { db }) {
    const post = db.posts.find((post) => post.id === args.id);
    return post;
  },
  posts(parent, args, { db }) {
    return db.posts;
  },
};
