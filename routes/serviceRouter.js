import express from 'express';
import { deleteItem, getAllItem, saveItem, searchItem, updateItem } from '../controllers/itemController.js';


const itemRouter = express.Router();

itemRouter.get("/",getAllItem)

itemRouter.post("/",saveItem)

itemRouter.put("/",updateItem)

itemRouter.delete("/",deleteItem)


//itemRouter.get("/search",searchItem)
itemRouter.get("/:name",searchItem)

export default itemRouter;
//employeerouter