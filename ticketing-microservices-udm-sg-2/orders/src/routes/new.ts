import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@sg-udemy-gittix/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

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

    // build the order and save it to db

    // publish an event saying that an order has been created

    res.send({});
  }
);

export { router as newOrderRouter };
