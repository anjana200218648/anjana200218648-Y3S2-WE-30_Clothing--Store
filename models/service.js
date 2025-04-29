import mongoose from "mongoose"

const  serviceSchema = new mongoose.Schema({
        name : String,
        value : Number,
        description:String
       }    )
         
       const Service = mongoose.model("service",serviceSchema)

       export default Service
  