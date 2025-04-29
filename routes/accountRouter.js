import express from 'express';
import { deleteAccount, getAllAccount, saveAccount, updateAccount } from '../controllers/accountControllers.js';

const accountRouter = express.Router();

accountRouter.get("/",getAllAccount)

accountRouter.post("/",saveAccount)

accountRouter.put("/",updateAccount)

studentRouter.delete("/",deleteAccount)


export default studentRouter;
