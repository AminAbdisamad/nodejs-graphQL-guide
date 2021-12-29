export const Subscription = {
  countdown: {
    // This will return the value on every 1 sec until it reaches 0
    subscribe: async function* (_, { from }) {
      for (let i = from; i >= 0; i--) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        yield { countdown: i };
      }
    },
  },

  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;
      setInterval(() => {
        count++;
        pubsub.publish("count", {
          count,
        });
      }, 1000);
      return pubsub.subscribe("count");
    },
  },
  comment: {
    subscribe(_, { postId }, { db, pubsub }) {
      // check if the post exist
      const post = db.posts.find((post) => post.id === postId);
      if (!post) throw new Error("No Post with this ID");
      return pubsub.subscribe(`Comments_of_post_with_id_${postId}`);
    },
  },
  post: {
    subscribe(parent, args, { db, pubsub }) {
      return pubsub.subscribe(`post`);
    },
  },
};
