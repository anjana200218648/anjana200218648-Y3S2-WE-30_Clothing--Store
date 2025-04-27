import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://user1:123user@cluster0.zmxyl.mongodb.net/cloth-del').then(() => console.log("DB Connected"));
}