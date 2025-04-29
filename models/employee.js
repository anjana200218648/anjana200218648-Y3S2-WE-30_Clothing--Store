import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema  ({
     
    email : {
        type :String,
        required : true,   //oonama   user  save krnakota  apita e mail eka oonani a nisa thmai meka daanne ........(innama oona ekak )
        unique : true   //eka user knk ta ekai thiyuena oona nisa 


    },
    firstName : {
        type : String,
        required : true
    },
    LastName : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "user" //user=costomer  metthnadi      // e koiyanne karu hari role kiyana magaarala giyoth uuta   auto value ekak watenawa  

    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true,
        default : "Not given"
    },
    idDisabled : {
        type : Boolean,
        required : true,
        default : false
    },
    idEmailVerified : {
        type : Boolean,
        required : true,
        default : false
    },


})
const Employee = mongoose.model("employee",emplyeeSchema)
export default  Employee;

//service.js 