const db = require("../models/index.js");
const template = db.Template;

const templateCreation = async (req, res) => {
  try {
    const createChannel = await template.create({
      template_name: req.body.template_name,
      description: req.body.description,
    });
    return res
      .status(200)
      .send({ status: true, message: res.__("TEMPLATE_CREATED") });
  } catch (error) {
    console.log(error)
    return res.status(400).send({ status: false, message: error.message });
  }
};






module.exports = {templateCreation}