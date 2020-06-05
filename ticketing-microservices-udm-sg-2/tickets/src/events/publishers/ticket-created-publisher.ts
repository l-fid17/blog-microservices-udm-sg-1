import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@sg-udemy-gittix/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
