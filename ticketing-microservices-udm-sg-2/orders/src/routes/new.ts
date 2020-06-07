import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@sg-udemy-gittix/common";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

const router = express.Router();

// could extract this to an env variable for better manipulation
// could also save it to db to change it via UI or set it per user
const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketID")
      .not()
      .isEmpty()
      //   // test if the id is valid
      //   // however this is a big assumption about the tickets service which is not suggested in real apps
      // .custom((input:string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("ticketID must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketID } = req.body;

    // find the ticket the user is trying to order
    const ticket = await Ticket.findById(ticketID);
    if (!ticket) {
      throw new NotFoundError();
    }

    // make sure the ticket has not been reserved yet
    const isReserved = await ticket.isReserved();

    if (isReserved) {
      throw new BadRequestError("Ticket is already reserved");
    }

    // calculate the expiration for the order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // build the order and save it to db
    const order = Order.build({
      // we are checking this in requireAuth middleware
      userID: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });
    await order.save();

    // publish an event saying that an order has been created

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
