import nats from "node-nats-streaming";

console.clear();

// nats client
const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("publisher connected to nats");

  const data = {
    id: "123",
    title: "title",
    price: 20,
  };

  const dataString = JSON.stringify(data);

  stan.publish("ticket:created", dataString, () => {
    console.log(`published ${dataString}`);
  });
});
