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
    subscribe: async function (parent, args, { pubsub }, info) {
      console.log(pubsub);
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
};
