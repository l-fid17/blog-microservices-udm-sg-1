import express, { Request, Response } from "express";

const router = express.Router();

router.delete("/api/orders/:orderID", async (req: Request, res: Response) => {
  res.send({});
});

export { router as deleteOrderRouter };
