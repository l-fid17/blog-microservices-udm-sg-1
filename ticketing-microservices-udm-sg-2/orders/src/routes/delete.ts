import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@sg-udemy-gittix/common";
import { Order, OrderStatus } from "../models/order";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.patch(
  "/api/orders/:orderID",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderID } = req.params;

    const order = await Order.findById(orderID).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userID !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    // publish event
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    res.status(200).send(order);
  }
);

export { router as deleteOrderRouter };
