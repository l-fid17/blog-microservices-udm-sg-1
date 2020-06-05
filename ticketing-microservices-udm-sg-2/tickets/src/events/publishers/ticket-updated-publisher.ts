import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@sg-udemy-gittix/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
