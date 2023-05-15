const db = require("../models/index.js");
const channel = db.channel;
const post = db.post;
const userCard  = db.userCard
const moment = require("moment");
const category = db.category;
const postItem = db.postItem;
const subscription = db.subscription;
var Secret_Key = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(Secret_Key);
require("dotenv").config();




const channelCreate = async (req, res) => {
  try {
    const body = req.body;
    const channelCreate = await channel.create({
      channel_name: body.channel_name,
      template_id: body.template_id,
      user_id: req.user.id,
      created_date: moment(),
    });
    return res
      .status(200)
      .send({ status: true, message: res.__("CHANNEL_CREATED") });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

const uploadCoverImage = async (req, res) => {
  try {
    const upload = await channel.update(
      { cover_image: req.files[0].originalname },
      { where: { user_id: req.user.id } }
    );
    return res
      .status(200)
      .send({ status: true, message: res.__("COVER_IMAGE") });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    const upload = await channel.update(
      { profile_image: req.files[0].originalname },
      { where: { user_id: req.user.id } }
    );
    return res
      .status(200)
      .send({ status: true, message: res.__("PROFILE_IMAGE") });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

const addDescription = async (req, res) => {
  try {
    const updateAbout = await channel.update(
      { about: req.body.about },
      { where: { user_id: req.user.id } }
    );
    return res
      .status(200)
      .send({ status: true, message: res.__("DESCRIPTION_ADD") });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, messsage: error.message });
  }
};

const gethome = async (req, res) => {
  try {
    const data = await category.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: post,
          attributes: ["title", "description", "like", "view", "comment"],
          include: [
            {
              model: postItem,
            },
          ],
        },
      ],
    });

    return res.status(200).send({ status: true, records: data });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

const feed = async (req, res) => {
  try {
    const data = await post.findAll({
      where: {
        user_id: req.user.id,
      },
    });
    return res.status(200).send({ status: true, feed: data });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, messahe: error.message });
  }
};

const getSubscription = async (req, res) => {
  try {
    const data = await subscription.findAll();
    return res.status(200).send({ status: true, records: data});
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.messsage });
  }
};



const getcardDetail = async (req,res) =>{
try {
  let cardDetail = {};
  cardDetail.card = {
    number: req.body.number,
    name : req.body.name,
    exp_month: req.body.exp_month,
    exp_year: req.body.exp_year,
    cvc: req.body.cvc,
  };
  stripe.tokens.create(cardDetail, async (err, token) => {
    if (err) {
      console.log(err);
      return res.status(400).send({ status: false, message: err.message });
    }

    if(!req.user.stripe_id){
      return res.status(200).send({status:true,message:res.__('PLEASE_LOGIN')})
    }else{
      const card = await stripe.customers.createSource(
        req.user.stripe_id,
        {source: token.id}
      );
      let cardrecords = await userCard.create({number : card.id,name : req.body.name,exp_month:req.body.exp_month,exp_year:req.body.exp_year,cvc :req.body.cvc,user_id : req.user.id })
      return res.status(200).send({status:true,message: res.__("CARD_DETAIL")})
    }
  })

} catch (error) {
  console.log(error)
  return res.status(400).send({status:false,message : error.message})
}
}
 

module.exports = {
  channelCreate,
  uploadCoverImage,
  uploadProfileImage,
  addDescription,
  gethome,
  feed,
  getSubscription,
  getcardDetail
};
