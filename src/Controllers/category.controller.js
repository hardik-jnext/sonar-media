const db = require("../models/index.js");
const category = db.category;
const post = db.post;
const sequelize = require("sequelize");

const getcategory = async (req, res) => {
  try {
    let postCount = await post.findAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("*")), "post count"],
        [sequelize.col("category.title"), "Category name"],
        [sequelize.col("category.updatedAt"), "Last update"],
      ],
      include: [
        {
          model: category,
          attributes: [],
        },
      ],
      group: ["post.category_id"],
    });

    console.log(postCount.updatedAt);
    return res.status(200).send({ status: true, data: postCount });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const create = await category.create({
      title: req.body.title,
    });
    return res
      .status(200)
      .send({ status: true, message: res.__("CATEGORY_CREATED") });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: true, message: error.message });
  }
};

const editCategory = async (req, res) => {
  try {
    const update = await category.update(
      {
        title: req.body.title,
      },
      { where: { id: req.params.id } }
    );
    return res
      .status(200)
      .send({ status: true, message: res.__("CATEGORY_UPDATED") });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryDelete = await category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res
      .status(200)
      .send({ status: true, message: res.__("CATEGORY_DELETED") });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: true, message: error.message });
  }
};

const postwithoutcaegory = async (req, res) => {
  try {
    const data = await post.findAll({
      where: {
        category_id: null,
      },
    });
    return res.status(200).send({ status: true, records: data });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  createCategory,
  editCategory,
  deleteCategory,
  getcategory,
  postwithoutcaegory,
};
