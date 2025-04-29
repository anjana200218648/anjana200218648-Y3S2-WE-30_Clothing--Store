import express from "express";
import { loginEmployee, saveemployee } from "../controllers/employeeController.js";

const employeeRouter = express.Router();

employeeRouter.post("/",saveEmployee)
employeeRouter.post("/login",loginEmployee) //securiti   chek krannath post thama use kranne 

export default employeeRouter;//serviceRouter new