import {Message} from "node-nats-streaming";
import {Listener} from "./base-listener";
import {TicketCreateEvent} from "./ticket-create-event";
import {Subjects} from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreateEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: any, msg: Message) {
    console.log("Event data: ", data);

    msg.ack();
  }
}
