import Item from "../models/student.js"

export function saveItem(req,res){
  const item = new Item(req.body)
  item.save().then(//methana thiyena save fuction eka  mogoose eke thiina model save wenna  thama eeka hadannne  
    ()=>{
        res.json({
            message:"item saveed  mokada post eke wenne save wena ekanui"
        })
    }
  )//newsfd
}

export function getAllItem(req,res){
   Item.find().then(
    (item)=>{
        res.json(item)
    }
).catch(
    ()=>{
        res.json({
            message:"error"
        })
    }
  )

}//hellow

export function updateItem(req,res){
    res.json({
        Message:"Student updated"
    })//export
}

export function deleteItem(req,res){
    res.json({
        Message:"Delete student"
    })
}

export function searchItem(req,res){

    //const itemName = req.body.name;    meeka dmme bn nama yatin gahala search karanna dn balamu  araka 
    //url ekeenama adaala eka gahala search karamma balamu api dan 

    const itemName = req.params.name; 
    Item.find(
        {
            name : itemName
        }
    ).then ((item)=>{
            res.json(item)
        }
    ).catch(
        ()=>{
            res.json({
                message:"error"
            })

        }
    )
}