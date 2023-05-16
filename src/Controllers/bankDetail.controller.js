const db = require("../models/index.js");
const bankDetail = db.bankDetail;
const user = db.user;

const insertBank = async (req, res) => {
  try {
    console.log(req.user);
    const findstatus = await user.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (findstatus.status == "active") {
      const insertdetail = await bankDetail.create({
        Account_name: req.body.account_name,
        bsb: req.body.bsb,
        Account_number: req.body.account_number,
        user_id: req.user.id,
      });
      return res
        .status(200)
        .send({ status: true, message: res.__("BANK_DETAILS") });
    } else {
      return res.status(200).send({ status: true, message: res.__("VERIFY") });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = insertBank;
