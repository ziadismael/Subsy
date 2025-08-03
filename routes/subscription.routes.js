import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {createSubscription, getUserSubscriptions} from "../controllers/subscriptions.controller.js";

const subRouter = Router();

subRouter.get("/", (req, res) => {
    return res.status(200).send({message : "Get All Subscriptions"});
});

subRouter.get("/:subID", (req, res) => {
    return res.status(200).send({message : "Get Subscription Details"});
});

subRouter.post("/", authorize ,createSubscription);

subRouter.put("/:subID", (req, res) => {
    return res.status(200).send({message : "UPDATE Subscriptions"});
});

subRouter.delete("/:subID", (req, res) => {
    return res.status(200).send({message : "DELETE Subscriptions"});
});

subRouter.get("/user/:subID", authorize ,getUserSubscriptions);

subRouter.put("/:subID/cancel", (req, res) => {
    return res.status(200).send({message : "Get Subscription Details"});
});

subRouter.get("/upcoming-renewals", (req, res) => {
    return res.status(200).send({message : "Get Upcoming Renewals"});
});


export default subRouter;