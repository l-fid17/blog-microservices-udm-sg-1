import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const clientID = randomBytes(4).toString("hex");

// nats client
const stan = nats.connect("ticketing", clientID, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("publisher connected to nats");

  const data = {
    id: "123",
    title: "title",
    price: 20,
  };
  const publisher = new TicketCreatedPublisher(stan);
  publisher.publish(data);
});
