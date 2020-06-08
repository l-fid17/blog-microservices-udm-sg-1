import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@sg-udemy-gittix/common";
import { Order } from "../models/order";

const router = express.Router();

router.get(
  "/api/orders/:orderID",
  requireAuth,
  async (req: Request, res: Response) => {
    // should check for a valid id first, then ->
    const order = await Order.findById(req.params.orderID).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userID !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
