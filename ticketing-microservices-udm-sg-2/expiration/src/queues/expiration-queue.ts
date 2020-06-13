import Queue from "bull";

interface Payload {
  orderID: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  console.log("publish expiration:complete for orderID", job.data.orderID);
});

export { expirationQueue };
