import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successfull signup", () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
});

it("returns a 400 with an invalid email", () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "invalid.com", password: "password" })
    .expect(400);
});

it("returns a 400 with an invalid password", () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "invalid.com", password: "inv" })
    .expect(400);
});

it("returns a 400 with missing credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com" })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({ password: "validPassword" })
    .expect(400);
});

it("doesn't allow duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after succsessful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
