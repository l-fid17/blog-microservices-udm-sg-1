import mongoose from "mongoose";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { TicketUpdatedEvent } from "@sg-udemy-gittix/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
  // create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // create and save a ticket
  const ticket = await Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "test",
    price: 10,
  });
  await ticket.save();

  // create a fake data obj
  const data: TicketUpdatedEvent["data"] = {
    version: ticket.version + 1,
    id: ticket.id,
    title: "newTestTitle",
    price: 20,
    userID: "fakeuserID",
  };

  // create a fake msg obj
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // return the whole lot
  return { listener, ticket, data, msg };
};

it("finds, updates, and saves a ticket", async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it("acks the msg", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
