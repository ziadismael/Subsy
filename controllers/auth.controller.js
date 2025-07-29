import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Logic for creating a new user
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating the user and signing a token
        const newUsers = await User.create([{name, email, password: hashedPassword}], session);
        const token = jwt.sign({userID: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        // Commiting and ending session
        await session.commitTransaction();
        await session.endSession();
        return res.status(201).json({
            success: true,
            message: "User successfully Created",
            data: {
                token,
                user: newUsers[0],
            }
        });
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            const error = new Error("Password is invalid");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userID: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
        res.status(200).json({
            success: true,
            message: "User successfully Signed",
            data: {
                token,
                user,
            }
        })
        next();
    }
    catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {
    try {
        // If token is stored in an HTTP-only cookie, clear it
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        });

        return res.status(200).json({
            success: true,
            message: "User signed out successfully"
        });
    } catch (error) {
        next(error);
    }
}