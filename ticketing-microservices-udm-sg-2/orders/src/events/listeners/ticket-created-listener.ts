import {
  Listener,
  Subjects,
  TicketCreatedEvent,
} from "@sg-udemy-gittix/common";
import { Message } from "node-nats-streaming";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "orders-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {}
}
