export const Comment = {
  author(parent: any, args: any, { db }: any) {
    return db.users.find((user: any) => user.id === parent.author);
  },
  post(parent: any, args: any, { db }: any) {
    return db.posts.find((post: any) => post.id === parent.post);
  },
};
