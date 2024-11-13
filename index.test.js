const request = require("supertest");
const app = require("./src/app");
const syncSeed = require("./seed");
const { User } = require("./models");

describe("Method testing", () => {
  beforeAll(async () => {
    // connect to and rebuild the db
    await syncSeed();
  });

  test("GET will return 200 and an array", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text)).toHaveLength(4);
  });

  test("GET/:id will return single result", async () => {
    const response = await request(app).get("/users/1");
    expect(JSON.parse(response.text)).toEqual(
      expect.objectContaining({ name: "User 1", age: 30 })
    );
  });

  test("POST will create a new user", async () => {
    await request(app).post("/users").send({ name: "User 5", age: 100 });
    expect(await User.findAll()).toHaveLength(5);
  });

  test("PUT will update a user", async () => {
    await request(app).put("/users/1").send({ age: 31 });
    const user = await User.findByPk(1);
    expect(user.age).toBe(31);
  });

  test("DELETE will remove a user", async () => {
    await request(app).delete("/users/1");
    expect(await User.findAll()).toHaveLength(4);
  });
});
