export const User = {
  posts(parent, args, { db }) {
    return db.posts.filter((post) => post.id === parent.id);
  },
  comments(parent, args, { db }) {
    return db.comments.filter((comment) => comment.id === parent.id);
  },
};
