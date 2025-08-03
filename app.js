import express from "express";
import {PORT} from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/subscriptions", subRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Welcome to Subsy App!");
});

app.listen (PORT, async () => {
    console.log(`Server started on port ${PORT}! http://localhost:${PORT}`);
    await connectToDatabase();
});


export default app;
