export const Post = {
  author(parent, _, { db }) {
    return db.users.find((user) => {
      return user.id === parent.author;
    });
  },
};
