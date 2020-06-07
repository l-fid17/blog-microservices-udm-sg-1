import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";

it("returns an error if ticket does not exist", async () => {
  const ticketID = mongoose.Types.ObjectId();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketID })
    .expect(404);
});

it("returns an error if ticket is already reserved", async () => {
  const ticket = Ticket.build({
    title: "test",
    price: 20,
  });
  await ticket.save();

  const order = Order.build({
    ticket,
    userID: "userid",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketID: ticket.id })
    .expect(400);
});

it("reserves a ticket", async () => {
  const ticket = Ticket.build({
    title: "test",
    price: 20,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketID: ticket.id })
    .expect(201);
});
