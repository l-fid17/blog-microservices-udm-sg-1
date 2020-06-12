import {
  Listener,
  NotFoundError,
  OrderCreatedEvent,
  Subjects,
} from "@sg-udemy-gittix/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // throw err if no ticket
    if (!ticket) {
      throw new NotFoundError();
    }

    // mark the ticket as reserved by setting the orderID
    ticket.set({ orderID: data.id });

    // save the ticket
    await ticket.save();

    // ack the message
    msg.ack();
  }
}
