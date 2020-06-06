import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@sg-udemy-gittix/common";

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
    res.send({});
  }
);

export { router as newOrderRouter };
