import nats from "node-nats-streaming";
import { randomBytes } from "crypto";

import { TicketCreatedListener } from "./events/ticket-created-listener";

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

  new TicketCreatedListener(stan).listen();
});

// intercept interrupt/terminate signals and exit gracefully
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
