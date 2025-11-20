import "reflect-metadata";
import { usersData } from "../../common/data/users";
import { v4 as uuidv4 } from "uuid";
// import { IUser } from "../../common/interfaces/users.interface";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";

import {
  saveUsers,
  findAll,
  findById,
  updateUser,
  deleteUser,
  relationshipDistance,
} from "../services/users.service";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "uuid-mock"),
}));

describe("Users Service", () => {
  beforeEach(() => {
    usersData.length = 0;
  });

  it("should create and return a new user", () => {
    const dto: CreateUserDto = {
      name: "John",
      lastName: "Doe",
      age: 30,
      friends: [],
    };

    const user = saveUsers(dto);

    expect(user).toEqual({
      id: uuidv4(),
      ...dto,
    });
    expect(usersData.length).toBe(1);
  });

  it("should return all users", () => {
    const dto: CreateUserDto = { name: "John", lastName: "Doe", age: 30, friends: [] };
    saveUsers(dto);

    const allUsers = findAll();
    expect(allUsers.length).toBe(1);
    expect(allUsers[0].name).toBe("John");
  });

  it("should return user by id", () => {
    const dto: CreateUserDto = { name: "John", lastName: "Doe", age: 30, friends: [] };
    const user = saveUsers(dto);

    const found = findById("uuid-mock");
    expect(found).toEqual(user);
  });

  it("should update an existing user", () => {
    const dto: CreateUserDto = { name: "John", lastName: "Doe", age: 30, friends: [] };
    saveUsers(dto);

    const updatedData: UpdateUserDto = {
      id: "uuid-mock",
      name: "Updated John",
      lastName: "Updated Doe",
      age: 35,
      friends: [],
    };
    const updated = updateUser("uuid-mock", updatedData);

    expect(updated).toEqual(updatedData);
    expect(usersData[0].name).toBe("Updated John");
  });

  it("should throw error if user to update not found", () => {
    const updatedData: UpdateUserDto = {
      id: "nonexistent",
      name: "Test",
      lastName: "User",
      age: 20,
      friends: [],
    };
    expect(() => updateUser("nonexistent", updatedData)).toThrow("User not found");
  });

  it("should delete a user by id", () => {
    const dto: CreateUserDto = { name: "John", lastName: "Doe", age: 30, friends: [] };
    saveUsers(dto);

    const deleted = deleteUser("uuid-mock");
    expect(deleted.id).toBe("uuid-mock");
    expect(usersData.length).toBe(0);
  });

  it("should throw error if user to delete not found", () => {
    expect(() => deleteUser("nonexistent")).toThrow("User not found");
  });

  it("should return correct relationship degree", () => {

    const tmpUserA = saveUsers({ name: "A", lastName: "AA", age: 25, friends: [] });
    const userA = updateUser(tmpUserA.id, { id: 'mock-idA', name: "A", lastName: "AA", age: 25, friends: [] })
    const tmpUserB = saveUsers({ name: "B", lastName: "BB", age: 26, friends: [userA.id] });
    const userB = updateUser(tmpUserB.id, { id: 'mock-idB', name: "B", lastName: "BB", age: 26, friends: [userA.id] })
    const userC = saveUsers({ name: "C", lastName: "CC", age: 27, friends: [userB.id] });
   
    const result = relationshipDistance(userC.id, userA.id);
    expect(result).toBe("It's a 2nd-degree relationship");
  });

  it("should return no relationship if users not connected", () => {
    const tmpUserA = saveUsers({ name: "A", lastName: "AA", age: 25, friends: [] });
    const userA = updateUser(tmpUserA.id, { id: 'mock-idA', name: "A", lastName: "AA", age: 25, friends: [] })
    const userB = saveUsers({ name: "B", lastName: "BB", age: 26, friends: [] });
    
    const result = relationshipDistance(userA.id, userB.id);
    expect(result).toBe("There are no relationships between these users.");
  });
});
