import express from "express";
import { addCloth, listCloth, removeCloth, updateCloth } from "../controllers/clothController.js";
import multer from "multer";

const clothRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
//api 
clothRouter.post("/add", upload.single("image"), addCloth);
clothRouter.get("/list", listCloth);
clothRouter.post("/remove", removeCloth);
clothRouter.put("/update/:id", upload.single("image"), updateCloth); // New route for updating

export default clothRouter;