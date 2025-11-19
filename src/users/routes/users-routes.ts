import { Router, Request, Response } from "express";
import { deleteUser, findAll, findById, relationshipDistance, saveUsers, updateUser } from "../services/users.service";
import { validateDto } from "../../common/middlewares/middleware-dtos";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";

const router = Router();

router.post("/", validateDto(CreateUserDto), (req: Request, res: Response) => {
    res.status(201).json({ 
        data: saveUsers(req.body),
        message: "User saved succesfully"
    });
});

router.get("/", (req: Request, res: Response) => {
    res.status(200).json({ 
        data: findAll(),
        message: "Users obtained succesfully"
    });
});

router.get("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).json({ 
        data: findById(id),
        message: "User obtained succesfully"
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

router.get("/relationship-distance/:idBaseUser/:idTargetUser", (req: Request, res: Response) => {
    const { idBaseUser, idTargetUser } = req.params;
    res.status(200).json({ 
        data: relationshipDistance(idBaseUser, idTargetUser),
        message: "User obtained succesfully"
    });
});

export default router;
