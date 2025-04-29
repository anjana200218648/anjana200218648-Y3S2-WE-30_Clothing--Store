import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import acccoutRouter from './routes/accountRouter.js';
import serviceRouter from './routes/serviceRouter.js';
import employeeRouter from './routes/employeeRouter.js';
import jwt from "jsonwebtoken";

const app = express();

// MongoDB Connection
mongoose.connect("mongodb+srv://admin:123@cluster0.wjsfum8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to the database");
})
.catch(() => {
    console.log("Connection Failed");
});

app.use(bodyParser.json());

// Public Routes (No JWT Protection)
app.use("/api/user", userRouter);

// Authentication Middleware (Protected routes after this)
app.use((req, res, next) => {
    const header = req.header("Authorization");
    if (header != null) {
        const token = header.replace("Bearer ", "");
        jwt.verify(token, "random456", (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized - Invalid Token" });
            }//body
            req.employee = decoded; // Attach decoded token to request
            next();
        });
    } else {
        return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }
});

// Protected Routes (Need JWT)
app.use("/api/account", accountRouter);
app.use("/api/service", serviceRouter);

// Server Listen
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//index