import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("response");
});

export { router as currentUserRouter };
