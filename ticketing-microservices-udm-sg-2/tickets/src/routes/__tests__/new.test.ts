import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets for POST requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if signed in", async () => {});

it("returns an error if title is invalid", async () => {});

it("returns an error if price is invalid", async () => {});

it("creates a ticket with if inputs are valid", async () => {});
