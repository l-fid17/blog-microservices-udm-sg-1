import {
  OrderCreatedEvent,
  Publisher,
  Subjects,
} from "@sg-udemy-gittix/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
