import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
    cancelSubscription,
    createSubscription,
    getAllSubscriptions, getSubscriptionDetails, getUpcomingRenewals,
    getUserSubscriptions
} from "../controllers/subscriptions.controller.js";

const subRouter = Router();

subRouter.get("/", authorize, getAllSubscriptions);

subRouter.get("/upcoming-renewals",authorize, getUpcomingRenewals);

subRouter.get("/:subID", authorize, getSubscriptionDetails);

subRouter.post("/", authorize ,createSubscription);

subRouter.put("/:subID", (req, res) => {
    return res.status(200).send({message : "UPDATE Subscriptions"});
});

subRouter.delete("/:subID", (req, res) => {
    return res.status(200).send({message : "DELETE Subscriptions"});
});

subRouter.get("/user/:userID", authorize ,getUserSubscriptions);

subRouter.put("/:subID/cancel",authorize, cancelSubscription);




export default subRouter;