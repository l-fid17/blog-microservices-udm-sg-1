import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from "@sg-udemy-gittix/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
