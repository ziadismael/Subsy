import { Router } from "express";
import {getAllUsers, getUser} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:userID", authorize, getUser)

userRouter.post("/", (req, res) => {
    return res.status(200).json({message : "CREATE User"});
});

userRouter.put("/:userID", (req, res) => {
    return res.status(200).json({message : "UPDATE User"});
});

userRouter.delete("/:userID", (req, res) => {
    return res.status(200).json({message : "DELETE User"});
});

export default userRouter;
