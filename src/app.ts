import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";

const app = express();
app.use(express.json());
//routes
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/users", userRouter);
app.use(globalErrorHandler);
export default app;
