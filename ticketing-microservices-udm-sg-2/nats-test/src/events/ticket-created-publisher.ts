import { Publisher } from "./base-publisher";
import { TicketCreateEvent } from "./ticket-create-event";
import { Subjects } from "./subjects";

export class TicketCreatedPublisher extends Publisher<TicketCreateEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
