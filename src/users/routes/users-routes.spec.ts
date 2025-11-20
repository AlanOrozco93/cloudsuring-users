import request from "supertest";
import express, { Express } from "express";
import router from "../routes/users-routes";

jest.mock("../services/users.service", () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  saveUsers: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  relationshipDistance: jest.fn(),
}));

jest.mock("../../common/middlewares/middleware-dtos", () => ({
  validateDto: () => (req: any, res: any, next: any) => next(),
}));

import { findAll, findById, saveUsers, updateUser, deleteUser, relationshipDistance } from "../services/users.service";

describe("Users Routes", () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/users", router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // GET /users
  it("GET /users -> should return all users", async () => {
    (findAll as jest.Mock).mockReturnValue([{ id: "1", name: "John" }]);
    
    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([{ id: "1", name: "John" }]);
  });

  it("GET /users -> should return 404 if no users", async () => {
    (findAll as jest.Mock).mockReturnValue([]);
    
    const res = await request(app).get("/users");

    expect(res.status).toBe(404);
    expect(res.body.data).toEqual([]);
  });

  // GET /users/:id
  it("GET /users/:id -> should return a user", async () => {
    (findById as jest.Mock).mockReturnValue({ id: "1", name: "John" });
    
    const res = await request(app).get("/users/1");

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({ id: "1", name: "John" });
  });

  it("GET /users/:id -> should return 404 if user not found", async () => {
    (findById as jest.Mock).mockReturnValue(null);
    
    const res = await request(app).get("/users/999");

    expect(res.status).toBe(404);
    expect(res.body.data).toEqual([]);
  });

  // POST /users
  it("POST /users -> should create a user", async () => {
    (saveUsers as jest.Mock).mockReturnValue({ id: "1", name: "John" });

    const res = await request(app).post("/users").send({ name: "John" });

    expect(res.status).toBe(201);
    expect(res.body.data).toEqual({ id: "1", name: "John" });
  });

  // PATCH /users/:id
  it("PATCH /users/:id -> should update a user", async () => {
    (updateUser as jest.Mock).mockReturnValue({ id: "1", name: "Updated John" });

    const res = await request(app).patch("/users/1").send({ name: "Updated John" });

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({ id: "1", name: "Updated John" });
  });

  // DELETE /users/:id
  it("DELETE /users/:id -> should delete a user", async () => {
    (deleteUser as jest.Mock).mockReturnValue({ id: "1" });

    const res = await request(app).delete("/users/1");

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({ id: "1" });
  });

  // GET /users/relationship-distance/:idBaseUser/:idTargetUser
  it("GET /users/relationship-distance/:idBaseUser/:idTargetUser -> should return distance", async () => {
    (relationshipDistance as jest.Mock).mockReturnValue(2);

    const res = await request(app).get("/users/relationship-distance/1/2");

    expect(res.status).toBe(200);
    expect(res.body.data).toBe(2);
  });
});
