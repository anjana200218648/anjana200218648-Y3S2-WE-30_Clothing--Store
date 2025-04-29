import Item from "../models/item.js"
import Student from "../models/student.js"

export function saveStudent(req,res){
  const student = new Student(req.body)
  student.save().then(//methana thiyena save fuction eka  mogoose eke thiina model save wenna  thama eeka hadannne  
    ()=>{
        res.json({
            message:"student saveed  mokada post eke wenne save wena ekanui"
        })
    }
  )
}//new

export function getAllStudents(req,res){
   Student.find().then(
    (student)=>{
        res.json(student)
    }
).catch(
    ()=>{
        res.json({
            message:"error"
        })
    }
  )

}

export function updateStudent(req,res){
    res.json({
        Message:"Student updated"
    })
}

export function deleteStudent(req,res){
    res.json({
        Message:"Delete student"
    })
}

