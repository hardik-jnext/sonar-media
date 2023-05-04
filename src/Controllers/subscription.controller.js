const db = require("../models/index.js");
const subscription = db.subscription;
const sequelize = require("sequelize");


const createSubscription = async (req, res) => {
  try {
        let totalPost = await subscription.count()
      if (totalPost >= 3) {
        res
          .status(200)
          .send({ status: true, message: res.__("SUBSCRIPTION_OVER") });
      } else {
        const createSub = subscription.create({
          subscription_name: req.body.subscription_name,
          cost: req.body.cost,
          payment_period: req.body.payment_period,
          description: req.body.description,
          user_id: req.user.id,
        });
        return res
          .status(200)
          .send({ status: true, message: res.__("SUBSCRIPTION_CREATE") });
      }
  }catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const deleteSub = await subscription.destroy({
      where: {
        id: req.params.subscription_id,
      },
    });
    return res.status(200).send({
      status: true,
      message: res.__("SUBSCRIPTION_DELETE"),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

const getSubscrition = async (req, res) => {
  try {
    const data = await subscription.findAll({
      attributes: { exclude: ["user_id"] },
    });
    if (data.length) {
      return res
        .status(200)
        .send({ status: true, message: res.__("SUBSCRIPTION_LIST"), data });
    } else {
      return res
        .status(200)
        .send({ status: true, messafge: res.__("SUBSCRIPTION_EMPTY") });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = { createSubscription, deleteSubscription, getSubscrition };
