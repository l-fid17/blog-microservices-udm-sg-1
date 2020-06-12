import {
  Listener,
  NotFoundError,
  OrderCreatedEvent,
  Subjects,
} from "@sg-udemy-gittix/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

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

    // emit event
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      version: ticket.version,
      userID: ticket.userID,
      orderID: ticket.orderID,
    });

    // ack the message
    msg.ack();
  }
}
