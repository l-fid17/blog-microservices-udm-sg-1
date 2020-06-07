import express, { Request, Response } from "express";
import { requireAuth } from "@sg-udemy-gittix/common";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  // const orders = await Order.find({});

  res.send({});
});

export { router as indexOrderRouter };
