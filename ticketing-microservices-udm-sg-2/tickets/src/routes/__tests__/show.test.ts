import request from "supertest";
import { app } from "../../app";

it("returns 404 if ticket is not found", async () => {
  await request(app).get("/api/tickets/fakeinvalidID").send().expect(404);
});

it("returns the ticket if found", async () => {
  const title = "title";
  const price = 10;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
