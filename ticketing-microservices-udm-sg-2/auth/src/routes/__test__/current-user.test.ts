import request from "supertest";
import { app } from "../../app";

it("returns the current user", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentuser.email).toEqual("test@test.com");
});
