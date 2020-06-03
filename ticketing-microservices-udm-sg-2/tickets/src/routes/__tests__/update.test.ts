import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it("returns 404 if id is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "title",
      price: 10,
    })
    .expect(404);
});

it("returns 401 if not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "title",
      price: 10,
    })
    .expect(401);
});

it("returns 401 if user does not own the ticket", async () => {
  await request(app).put("/api/tickets/${id}");
});

it("returns 400 if user provides invalid inputs", async () => {
  await request(app).put("/api/tickets/${id}");
});

it("updates the ticket if inputs are valid and user owns the ticket", async () => {
  await request(app).put("/api/tickets/${id}");
});
