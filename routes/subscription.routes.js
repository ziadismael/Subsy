import { Router } from "express";

const subRouter = Router();

subRouter.get("/", (req, res) => {
    return res.status(200).send({message : "Get All Subscriptions"});
});

subRouter.get("/:subID", (req, res) => {
    return res.status(200).send({message : "Get Subscription Details"});
});

subRouter.post("/", (req, res) => {
    return res.status(200).send({message : "CREATE Subscription"});
});

subRouter.put("/:subID", (req, res) => {
    return res.status(200).send({message : "UPDATE Subscriptions"});
});

subRouter.delete("/:subID", (req, res) => {
    return res.status(200).send({message : "DELETE Subscriptions"});
});

subRouter.get("/user/:subID", (req, res) => {
    return res.status(200).send({message : "Get User Subscriptions Details"});
});

subRouter.put("/:subID/cancel", (req, res) => {
    return res.status(200).send({message : "Get Subscription Details"});
});

subRouter.get("/upcoming-renewals", (req, res) => {
    return res.status(200).send({message : "Get Upcoming Renewals"});
});


export default subRouter;