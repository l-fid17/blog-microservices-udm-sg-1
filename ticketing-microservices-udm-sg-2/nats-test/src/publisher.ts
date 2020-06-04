import nats from "node-nats-streaming";

// nats client
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("publisher connected to nats");
});
