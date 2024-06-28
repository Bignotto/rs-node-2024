import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { app } from "../app";

describe("Transaction routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  it("should be able to create a new transaction", async () => {
    await request(app.server)
      .post("/transactions")
      .send({
        title: "New",
        amount: 500,
        type: "credit",
      })
      .expect(201);
  });

  it("should be able to list transactions", async () => {
    const createResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New",
        amount: 500,
        type: "credit",
      });

    const cookie: string[] | undefined = createResponse.get("Set-Cookie");

    const listResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookie ?? [])
      .expect(200);

    expect(listResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: "New",
        amount: 500,
      }),
    ]);
  });
});
