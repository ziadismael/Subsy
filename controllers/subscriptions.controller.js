import Subscription from "../models/subscription.model.js";
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
           },
            headers: {
                'content-type': 'application/json',
            },
           retries: 0,
    });

        console.log(workflowRunId);
        res.status(201).json({ success: true, data: { subscription, workflowRunId } });
    }
    catch (error) {
        next(error);
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        return res.status(200).json({success: true, data: subscriptions});
    }
    catch (error) {
        next(error);
    }
}

export const getSubscriptionDetails = async (req, res, next) => {
    try {
        if (!req.params.subID) {
            const error = new Error('No subscription found with that id');
            error.status = 404;
            throw error;
        }

        const subscriptions = await Subscription.find({_id: req.params.subID});
        return res.status(200).json({success: true, data: subscriptions});
    }
    catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        // User in req same as token
        if (req.user._id.toString()!==req.params.userID.toString()) {
            const error = new Error("You are not the owner of the account.");
            // error.message = (req.user._id + " " + req.params.subID);
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({user: req.user._id});
        return res.status(200).send({success: true, data: subscriptions});
    }
    catch (error) {
        next(error);
    }
}

export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const userSubs = await Subscription.find({user: req.user._id});
        // const renewals = [];
        // for (const sub of userSubs) {
        //     if (sub.status === "Expired" || (sub.renewalDate - Date.now()) <= (7 * 24 * 60 * 60 * 1000))
        //     {
        //         renewals.push(sub);
        //     }
        // }

        const renewals = userSubs.filter(sub => {
            const timeUntil = sub.renewalDate - Date.now();
            return (
                sub.status === "Expired" ||
                (timeUntil <= 7 * 24 * 60 * 60 * 1000 &&
                timeUntil > 0)
            );
        });
        return res.status(200).send({success: true, data: renewals})
    }
    catch (error) {
        next(error);
    }
}

export const cancelSubscription = async (req, res, next) => {
    try {
        const userSubs = await Subscription.find({user: req.user._id});
        const activeSubs = userSubs.filter(sub => sub.status === "Active");

        const cancelledSub = activeSubs.find(
            sub => sub._id.toString() === req.params.subID
        );
        if (!cancelledSub) {
            const error = new Error('No subscription found with that id');
            error.status = 404;
            throw error;
        }
        // cancelledSub.renewalDate = new Date();
        cancelledSub.status = "Cancelled";
        await cancelledSub.save();

        res.status(200).send({success: true, data: cancelledSub});
    }
    catch (error) {
        next(error);
    }
}


