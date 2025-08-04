import nodemailer from "nodemailer";
import {EMAIL_PASSWORD} from "./env.js";

export const accountEmail = "ziad.ismael.studymail@gmail.com"
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: accountEmail,
        pass: EMAIL_PASSWORD,
    }
})