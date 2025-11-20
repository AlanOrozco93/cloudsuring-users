import { usersData } from "../../common/data/users";
import { IUser } from "../../common/interfaces/users.interface";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { v4 as uuidv4 } from "uuid";

export function saveUsers(userData: CreateUserDto): IUser{
  try {
    const newUser: IUser = {
        id: uuidv4(),
        ...userData
    };
    usersData.push(newUser);

    return newUser;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error");
  }
}

export function findAll(): IUser[]{
    try {
        return usersData;
    } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error");
  }
}

export function findById(id: string): IUser{
    try {
        let userIndex = usersData.findIndex(user => user.id === id);
        
        return usersData[userIndex];
    } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error");
  }
}

export function updateUser(id: string, updateUserData: UpdateUserDto): IUser{
    try {
        let userIndex = usersData.findIndex(user => user.id === id);

        if(userIndex < 0){
            throw new Error('User not found');
        }

        usersData.splice(userIndex, 1);
        usersData.push(updateUserData);
        return updateUserData;
    } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error");
  }
}

export function deleteUser(id: string): IUser{
    try {
        let userIndex = usersData.findIndex(user => user.id === id);

        if(userIndex < 0){
            throw new Error('User not found');
        }
        const userDeleted = usersData[userIndex];
        usersData.splice(userIndex, 1);
        return userDeleted;
    } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error");
  }
}


export function relationshipDistance(idBaseUser: string, idTargetUser: string):string{
    try {
       const userChecked = new Set<string>();
       const queue: { id: string, distance: number }[] = [{id: idBaseUser, distance: 0}];

        while (queue.length > 0 ) {
            const { id, distance } = queue.shift()!;
            if (id === idTargetUser) return `It's a ${formatedGrade(distance)}-degree relationship`;

            userChecked.add(id);

            const user = usersData.find(u => u.id === id);
            if (!user) continue;

            for (const friend of user.friends) {
                if (!userChecked.has(friend)) {
                    queue.push({ id: friend, distance: distance + 1 });
                }
            }
        }

        return 'There are no relationships between these users.';
    } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error");
  }
}

function formatedGrade(grade: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = grade % 100;

  if (v >= 11 && v <= 13) {
      return `${grade}th`;
  }
  const lastDigit = grade % 10;
  const suffix = suffixes[lastDigit] || "th";

  return `${grade}${suffix}`;
}