import { createRequire } from "module";
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const RMNDRS = [7, 3, 2, 1];

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
        await triggerReminder(context, `Reminder of ${daysBefore} days before`);
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

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Trigger reminder : ${label}`);
        // Send Email, SMS, Push Notifications
    })
}