import mongoose from "mongoose"

const  accountSchema = new mongoose.Schema({
        name : String,
        age : Number,
        city:String
       }    )
         
       const Account = mongoose.model("account",accountSchema)

       export default Account
//account.js