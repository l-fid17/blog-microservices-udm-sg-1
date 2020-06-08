import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";

it("updates the status to Cancelled", async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: "test",
    price: 20,
  });
  await ticket.save();

  const user = global.signin();
  // build an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketID: ticket.id })
    .expect(201);

  // patch the order to cancelled
  await request(app)
    .patch(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  // make sure the order is now cancelled
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});
