import {emailTemplates} from "./email-template.js";
import dayjs from "dayjs";
import {accountEmail, transporter} from "../config/nodemailer.js";
import {response} from "express";

export const sendEmail = async ({to, type, subscription}) => {
    if (!to || !type) {
        throw new Error("You must specify a type/Subject to email.");
    }

    const template = emailTemplates.find((t) => t.label === type);

    if (!template) {throw new Error("Invalid email template type");}

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format("MM-DD-YYYY"),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} ${subscription.frequency}.`,
        paymentMethod: subscription.paymentMethod,
    }

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);
    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message,
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err, "error sending email");
        }
        console.log(`Sent: ` + info.response);
    })
}