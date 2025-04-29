import express from 'express';
import { deleteAccount, getAllAccount, saveAccount, updateAccount } from '../controllers/accountControllers.js';

const accountRouter = express.Router();

studentRouter.get("/",getAllAccount)

studentRouter.post("/",saveAccount)

studentRouter.put("/",updateAccount)

studentRouter.delete("/",deleteAccount)


export default studentRouter;
