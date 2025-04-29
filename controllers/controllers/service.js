import Service from "../models/account.js"

export function saveService(req,res){
  const service = new Service(req.body)
  service.save().then(//methana thiyena save fuction eka  mogoose eke thiina model save wenna  thama eeka hadannne  
    ()=>{
        res.json({
            message:"service saveed  mokada post eke wenne save wena ekanui"
        })
    }
  )//newsfd
}

export function getAllService(req,res){
    Service.find().then(
    (service)=>{
        res.json(service)
    }
).catch(
    ()=>{
        res.json({
            message:"error"
        })
    }
  )

}//hellow

export function updateService(req,res){
    res.json({
        Message:"Student updated"
    })//export
}

export function deleteService(req,res){
    res.json({
        Message:"Delete student"
    })
}

export function searchService(req,res){

    //const itemName = req.body.name;    meeka dmme bn nama yatin gahala search karanna dn balamu  araka 
    //url ekeenama adaala eka gahala search karamma balamu api dan 

    const serviceName = req.params.name; 
    Service.find(
        {
            name : serviceName
        }
    ).then ((service)=>{
            res.json(service)
        }
    ).catch(
        ()=>{
            res.json({
                message:"error"
            })

        }
    )
}