import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });
        res.status(201).send({success: true, message : "Subscription created successfully.", data : subscription});
    }
    catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        // User in req same as token
        if (req.user._id.toString()!==req.params.subID.toString()) {
            const error = new Error("You are not the owner of the account.");
            // error.message = (req.user._id + " " + req.params.subID);
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({user: req.params.subID});
        return res.status(200).send({success: true, data: subscriptions});
    }
    catch (error) {
        next(error);
    }
}


