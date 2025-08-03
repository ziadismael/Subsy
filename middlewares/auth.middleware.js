import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/env.js";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) {
            return res.status(401).json({message : "Not Authorized"});
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        console.log("✅ Decoded Token:", decoded);
        const user = await User.findById(decoded.userID); // ✅ This matches your token payload


        if (!user) {
            return res.status(401).json({message : "Not Authorized"});
        }

        req.user = user;

        next();
    } catch (error){
        next(error);
    }
}
export default authorize;
