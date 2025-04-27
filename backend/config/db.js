import mongoose from "mongoose";

export const connectDB = async () => {
    // Connect to MongoDB using mongoose
    await mongoose.connect('mongodb+srv://user1:123user@cluster0.zmxyl.mongodb.net/cloth-del').then(() => console.log("DB Connected"));
}