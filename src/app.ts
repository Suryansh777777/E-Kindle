import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";

const app = express();

//routes
app.get("/", (req, res, next) => {
    res.send("Hello World");
});
app.use("/api/users", userRouter);
app.use(globalErrorHandler);
export default app;
