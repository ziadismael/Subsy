import { createRequire } from "module";
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
import {sendEmail} from "../utils/send-email.js";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const RMNDRS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== "Active") {
        return;
    }

    const renewalDate = dayjs(subscription.renewalDate);
    if (renewalDate.isAfter(dayjs())) {
        console.log(`Renewal date: ${dayjs()} has passed. Stopping workflow`);
    }

    for (const daysBefore of RMNDRS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before `, reminderDate);
        }
        if (dayjs() .isSame(reminderDate, 'day')) {
            await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
        }
    }

});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate("user", "name email");
    });

}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleep until ${label} reminder @ : ${date}`);
    await  context.sleepUntil(label,date.toDate());
}

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(`Trigger reminder : ${label}`);
        // Send Email, SMS, Push Notifications
        await sendEmail({
            to: subscription.user.email,
            type: label,
            subscription,
        });
    })
}