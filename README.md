This is a project that is a REST API in NodeJS that contains the CRUD of users as well as an additional endpoint to view the distance between user relationships.

Interfaces:
IUser -> {
    id: string;
    name: string;
    lastName: string;
    age: number;
    friends: string[];
}

DTOS:
CreateUserDto -> {
  name!: string;
  lastName!: string;
  age!: number;
  friends!: string[]; (It is an array of IDs of the users who are his friends)
}

UpdateUserDto -> {
  id!: string;
  name!: string;
  lastName!: string;
  age!: number;
  friends!: string[]; (It is an array of IDs of the users who are his friends)
}

Endpoints 
POST /users -> It receives data of type CreateUserDto in the body and returns data of type IUser
GET /users -> It receives nothing and returns an array of IUser
GET /users/:id -> Receives a user's id as a parameter and returns data of type IUser
PATCH /users/:id -> It receives as a parameter the id of a user and data of type UpdateUserDto, and returns data of type IUser.
DELETE /users/:id -> Receives a user's id as a parameter and returns data of type IUser
GET users/relationship-distance/:idBaseUser/:idTargetUser -> It receives the ID of a base user and an ID of the destination user to determine the relationship distance between those users and returns a string
