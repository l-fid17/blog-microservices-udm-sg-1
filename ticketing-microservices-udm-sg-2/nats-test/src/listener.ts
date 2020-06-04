import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const clientID = randomBytes(4).toString("hex");

const stan = nats.connect("ticketing", clientID, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("listener connected to nats");

  stan.on("close", () => {
    console.log("connection closed");
    process.exit();
  });

  const options = stan.subscriptionOptions().setManualAckMode(true);
  const subscription = stan.subscribe(
    "ticket:created",
    "order-service-queue-group",
    options
  );

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      const parsed = JSON.parse(data);
      console.log(`Received event #${msg.getSequence()} with data: ${parsed}`);
    }

    msg.ack();
  });
});

// intercept interrupt/terminate signals and exit gracefully
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
