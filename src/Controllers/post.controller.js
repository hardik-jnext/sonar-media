const moment = require("moment");
const db = require("../models/index.js");
const post = db.post;
const postItem = db.postItem



const createPost = async (req, res) => {
  try {
    const body = req.body;
     const postDate = moment()
    const create = await post.create({
      title: body.title,
      description: body.description,
      category_id: 1,
      user_id: req.user.id,
      status: body.status,
      post_date: postDate,
    });      
    const contentArray = req.body.post_content
     contentArray.forEach((result)=>{
      const addContent =  postItem.create({post_id : create.id,post_content : result.data,post_type :result.type})
      return res.status(200).send({ status: true, post: create }); 
    })
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, messsage: error.message });
  }
};


const updatePost = async(req,res) =>{
try {
 
  const postUpdate  = await post.update({





  })
  
  
  
} catch (error) {
  console.log(error)
  return res.status(200).send({statua : true, message : error.message})
  
}

}


let imageInsert = async (req, res) => {
  try {
    return res.send(req.files);
  } catch (error) {
    console.log(error);
    return res.status(400).send({status : false ,message : error.message})
  }
};





module.exports = {createPost,imageInsert}
