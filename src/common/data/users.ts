import { IUser } from "../interfaces/users.interface";

export const usersData: IUser[] = [
    {
        id: "4550dd22-15e5-4fa4-9bb1-b58c007face5",
        name: "Jhon",
        lastName: "Doe",
        age: 32,
        friends: [
            "4ddd2b05-5f3d-4528-9dce-f026aeb9d722",
            "b3a03d99-cf22-4e8d-b487-3aeb0a51d424"
        ]
    },
    {
        id: "4ddd2b05-5f3d-4528-9dce-f026aeb9d722",
        name: "Clara",
        lastName: "Smith",
        age: 28,
        friends: [
            "4550dd22-15e5-4fa4-9bb1-b58c007face5"
        ]
    },
    {
        id: "b3a03d99-cf22-4e8d-b487-3aeb0a51d424",
        name: "Carl",
        lastName: "Sampson",
        age: 23,
        friends: [
            "4550dd22-15e5-4fa4-9bb1-b58c007face5"
        ]
    },
    {
        id: "aa908c19-04b0-4b20-9435-4e3a847ce40e",
        name: "Sara",
        lastName: "Winter",
        age: 27,
        friends: []
    }
];