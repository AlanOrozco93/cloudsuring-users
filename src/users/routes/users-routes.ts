import { Router, Request, Response } from "express";
import { deleteUser, findAll, findById, relationshipDistance, saveUsers, updateUser } from "../services/users.service";
import { validateDto } from "../../common/middlewares/middleware-dtos";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";

const router = Router();

router.get("/relationship-distance/:idBaseUser/:idTargetUser", (req: Request, res: Response) => {
    const { idBaseUser, idTargetUser } = req.params;
    res.status(200).json({ 
        data: relationshipDistance(idBaseUser, idTargetUser),
        message: "User obtained succesfully"
    });
});

router.post("/", validateDto(CreateUserDto), (req: Request, res: Response) => {
    res.status(201).json({ 
        data: saveUsers(req.body),
        message: "User saved succesfully"
    });
});

router.get("/", (req: Request, res: Response) => {
    const users = findAll();
   if (!users || users.length === 0) {
        return res.status(404).json({
            data: [],
            message: "No users found"
        });
    }

    res.status(200).json({
        data: users,
        message: "Users obtained successfully"
    });
});

router.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const user = findById(id);
    if (!user) {
        return res.status(404).json({
            data: [],
            message: "User not found"
        });
    }

    res.status(200).json({
        data: user,
        message: "User obtained successfully"
    });
});

router.patch("/:id", validateDto(UpdateUserDto), (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).json({ 
        data: updateUser(id, req.body),
        message: "User updated succesfully"
    });
});

router.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).json({ 
        data: deleteUser(id),
        message: "User deleted succesfully"
    });
});

export default router;
