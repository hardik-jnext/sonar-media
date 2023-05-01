const db = require("../models/index.js");
const post = db.post;


const createPost = async (req, res) => {
  try {
    const body = req.body;

    const create = await post.create({
      title: body.title,
      description: body.description,
      category_id : 1,
      user_id : req.user.id,
      status : body.status, 
      post_date : body.post_date
      });

      return res.status(200).send({status : true, post : create})
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, messsage: error.messsage });
  }
};



module.exports = createPost
