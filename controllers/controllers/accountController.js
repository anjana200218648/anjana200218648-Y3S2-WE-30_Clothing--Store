import Item from "../models/item.js"
import Account from "../models/student.js"

export function saveAccount(req,res){
  const student = new Account(req.body)
  account.save().then(//methana thiyena save fuction eka  mogoose eke thiina model save wenna  thama eeka hadannne  
    ()=>{
        res.json({
            message:"student saveed  mokada post eke wenne save wena ekanui"
        })
    }
  )
}//accountmanagement

export function getAllAccount(req,res){
    Account.find().then(
    (account)=>{
        res.json(account)
    }
).catch(
    ()=>{
        res.json({
            message:"error"
        })
    }
  )

}

export function updateAccount(req,res){
    res.json({
        Message:"Student updated"
    })
}

export function deleteAccount(req,res){
    res.json({
        Message:"Delete student"
    })
}

