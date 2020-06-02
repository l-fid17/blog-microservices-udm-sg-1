import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { validateRequest, BadRequestError } from "@sg-udemy-gittix/common";
import { Password } from "../utils/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a valid password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const isMatch = await Password.compare(existingUser.password, password);

    if (!isMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session ? (req.session.jwt = userJwt) : null;

    // req.session = {
    //   jwt: userJwt,
    //   // isChanged: false,
    //   // isNew: true,
    //   // isPopulated: true,
    // };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
