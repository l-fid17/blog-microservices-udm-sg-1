import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for POST requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("does not return 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if title is invalid", async () => {
  await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({
        title: '',
        price: 10
      })
});

it("returns an error if price is invalid", async () => {});

it("creates a ticket if inputs are valid", async () => {});
