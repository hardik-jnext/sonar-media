const db = require('../models/index.js')
const channel = db.channel
const moment = require('moment')


const channelCreate  = async(req,res)=>{
try {
   const body = req.body 

 const channelCreate = await channel.create({

    channel_name : body.channel_name,
    template_id  : body.template_id,
    created_date : moment(),
     	   

 })


    
} catch (error) {
    console.log(error)
    return res.status(400).send({status :false,message : error.message})
}


}