import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@sg-udemy-gittix/common";
import { Order, OrderStatus } from "../models/order";

const router = express.Router();

router.patch(
  "/api/orders/:orderID",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderID } = req.params;

    const order = await Order.findById(orderID);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userID !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    res.status(200).send(order);
  }
);

export { router as deleteOrderRouter };
