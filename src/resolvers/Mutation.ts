import { v4 } from "uuid";

export const Mutation = {
  createUser(_: any, args: any, ctx: any) {
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
  updateUser(_: any, args: any, { db }: any) {
    //   Get user by id
    const { id, data } = args;
    const user = db.users.find((user: any) => user.id == id);
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
  createPost(_: any, args: any, { db, pubsub }: any) {
    const post = { id: v4(), ...args.data };
    console.log(post);
    db.posts.push(post);
    console.log(args.data.published);
    if (args.data.published) {
      pubsub.publish("post", {
        post: {
          mutation: "CREATED",
          data: post,
        },
      });
    }
    return post;
  },

  deletePost(_: any, args: any, { pubsub, db }: any) {
    // check if post exist

    const postIndex = db.posts.findIndex((post) => post.id === args.id);
    if (postIndex === -1) {
      throw new Error("Post not found");
    }
    // Remove from posts
    db.posts.slice(postIndex, 1);
    pubsub.publish("post", {
      post: {
        mutation: "DELETED",
        data: db.posts[postIndex],
      },
    });
    return db.posts[postIndex];
  },
  updatePost(parent, args, { db, pubsub }) {
    const { id, data } = args;
    const post = db.posts.find((post) => post.id === id);
    const originalPost = { ...post };
    if (!post) {
      throw new Error("No Post Found");
    }
    if (typeof data.title === "string") post.title = data.title;
    if (typeof data.description === "string")
      post.description = data.description;
    if (typeof data.published === "boolean") {
      post.published = data.published;

      if (originalPost.published && !post.published) {
        //Already Published, Delete
        pubsub.publish("post", {
          post: {
            mutation: "DELETED",
            data: originalPost,
          },
        });
      } else if (!originalPost.published && post.published) {
        // Publish Now, Create
        pubsub.publish("post", {
          post: {
            mutation: "CREATED",
            data: post,
          },
        });
      }
    } else if (post.published) {
      pubsub.publish("post", {
        post: {
          mutation: "UPDATED",
          data: post,
        },
      });
    }
    return post;
  },
  createComment(parent, args, { db, pubsub }) {
    const postToComment = db.posts.some((post) => post.id === args.postId);

    const userToComment = db.users.some((user) => user.id === args.authorId);

    if (!postToComment && !userToComment)
      throw new Error("Unable to find user or post");

    const comment = {
      id: v4(),
      author: args.authorId,
      post: args.postId,
      text: args.text,
    };
    db.comments.push(comment);

    pubsub.publish(`Comments_of_post_with_id_${post}`, {
      comment,
    });
    return comment;
  },
  updateComment(_, { id, data }, { db }) {
    // check if the comment exist
    const comment = db.comments.find((comment) => comment.id === id);
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
