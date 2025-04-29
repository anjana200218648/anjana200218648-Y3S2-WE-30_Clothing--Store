import express from 'express';
import { deleteStudent, getAllStudents, saveStudent, updateStudent } from '../controllers/studentControllers.js';

const studentRouter = express.Router();

studentRouter.get("/",getAllStudents)

studentRouter.post("/",saveStudent)

studentRouter.put("/",updateStudent)

studentRouter.delete("/",deleteStudent)


export default studentRouter;
