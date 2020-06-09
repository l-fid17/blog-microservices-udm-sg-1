import {
    Listener, NotFoundError,
    Subjects, TicketCreatedEvent,
    TicketUpdatedEvent,
} from "@sg-udemy-gittix/common";
import { Message } from "node-nats-streaming";
import {queueGroupName} from "./queue-group-name";
import {Ticket} from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
        const {title, price} = data
        const ticket = await Ticket.findById(data.id)
        if (!ticket) {
            throw new NotFoundError()
        }
        ticket.set({title, price})
        await ticket.save()

        msg.ack()
    }
}