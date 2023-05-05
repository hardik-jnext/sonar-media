const moment = require("moment");
const db = require("../models/index.js");
const post = db.post;
const postItem = db.postItem;
const subscription = db.subscription;

const getpost = async (req, res) => {
  try {
    const data = await post.findOne({ where: { user_id: req.user.id } });
    const records = await subscription.findAll({
      where: {
        user_id: data.user_id,
      },
    });
    return res.send(records);
    return res.status(200).send({ status: true, records: data });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};
const createPost = async (req, res) => {
  try {
    const body = req.body;
    const postDate = moment();
    const create = await post.create({
      title: body.title,
      description: body.description,
      category_id: 3,
      user_id: req.user.id,
      status: body.status,
      post_date: postDate,
      subscriptions_id: 2,
    });
    const contentArray = req.body.post_content;
    contentArray.forEach((result) => {
      const addContent = postItem.create({
        post_id: create.id,
        post_content: result.data,
        post_type: result.type,
      });
      return res.status(200).send({ status: true, post: create });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, messsage: error.message });
  }
};

let imageInsert = async (req, res) => {
  try {
    return res.send(req.files);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const body = req.body;
    const postUpdate = await post.update(
      {
        title: body.title,
        description: body.description,
        category_id: 3,
        user_id: req.user.id,
      },
      { where: { id: req.params.post_id } }
    );
    const contentArray = req.body.post_content;
    contentArray.forEach((result) => {
      const updateContent = postItem.update(
        {
          post_content: result.data,
          post_type: result.type,
        },
        { where: { post_id: req.params.post_id } }
      );
      return res
        .status(200)
        .send({ status: true, update: res.__("POST_UPDATE") });
    });
  } catch (error) {
    console.log(error);
    return res.status(200).send({ statua: true, message: error.message });
  }
};

const postDelete = async (req, res) => {
  try {
    const removePost = await post.destroy({
      where: {
        id: req.params.id,
      },
    });
    const removeContene = await postItem.destroy({
      where: {
        post_id: req.params.id,
      },
    });
    return res
      .status(200)
      .send({ status: false, message: res.__("POST_DELETE") });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

const deletecontent = async (req, res) => {
  try {
    const deleteContent = await postItem.destroy({
      where: {
        post_id: req.params.id,
      },
    });
    return res
      .status(200)
      .send({ status: true, message: res.__("CONTENT_DELETE") });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  getpost,
  createPost,
  imageInsert,
  updatePost,
  postDelete,
  deletecontent,
};
