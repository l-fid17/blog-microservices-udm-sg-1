import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("fetches the order", async () => {
  // create a ticket
  const ticket = await Ticket.build({
    title: "title",
    price: 20,
  });
  await ticket.save();

  const user = global.signin();

  // build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketID: ticket.id })
    .expect(201);

  // fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("returns unauthorized if user is trying to fetch someone else's order", async () => {
  // create a ticket
  const ticket = await Ticket.build({
    title: "title",
    price: 20,
  });
  await ticket.save();

  const user = global.signin();

  // build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketID: ticket.id })
    .expect(201);

  // fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});
