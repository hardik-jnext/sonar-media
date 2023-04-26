const db = require("../models/index.js");
const user = db.user;
const secretkey = "secreatkey";
const otpGenerator = require("../helpers/otpgenerator.helper.js");
const moment = require("moment");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const sendMail = require("../helpers/sendMail.helper.js");




const userRegistration = async (req, res) => {
  try {
    const body = req.body;
    const fineUser = await user.findOne({ where: { email: body.email } });
    if (fineUser) {
      return res
        .status(200)
        .send({ status: true, message: res.__("REGISTERED") });
    } else {
      if (body.password == body.repeatpassword) {
        let expireDate = moment().add(5, "minutes");
        const createUser = await user.create({
          firstname: body.firstname,
          lastname: body.lastname,
          email: body.email,
          password: body.password,
          repeatpassword: body.repeatpassword,
          otp: otpGenerator(4),
          otp_expiry: expireDate,
        });
        let obj = { userName: createUser.userName, otp: createUser.otp };
        await sendMail(global.config.FROM_EMAIL, createUser.email, obj);
        return res.json({ message: res.__("THANK_REGISTER") });
      } else {
        return res.status(200).send({
          status: true,
          message: res.__("PASSOWRD_AND_REPEATPASSWORD"),
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

const userlogin = async (req, res) => {
  try {
    const findRecord = await user.findOne({
      where: {
        [Op.and]: [{ email: req.body.email }, { password: req.body.password }],
      },
      raw: true,
    });
    if (!findRecord) {
      return res.json({ message: res.__("NOT_REGISTERED") });
    }
    let token = jwt.sign(findRecord, secretkey);
    return res.json({ message: token });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

const userVerify = async (req, res) => {
  try {
    const data = await user.findOne({ where: { email: req.body.email } });
      if(!data){
         return res.status(200).send({status : true,message :res.__("RECORDS_NOT")})
      }else{
    const currentTime = moment().utc();
    if (data.status == "Active") {
      return res.json({ message: res.__("ALREADY_VERIFIED") });
    } else {
      if (data.otp_expiretime < currentTime) {
        return res.json({ message: res.__("OTP_EXPIRED") });
      } else {
        if (data.otp == req.params.otp) {
          const dataVerify = await user.update(
            {
              is_verify: true,
              status: "Active",
            },
            {
              where: {
                email : data.email,
              },
            }
          );
          return res.json({
            message: res.__("VERIFIED_SUCCESSFULLY"),
          });
        } else {
          return res.json({ message: res.__("OTP_INVALID") });
        }
      }
    }
  }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

const forgetPasswordmail = async (req, res) => {
  try {
    let expireDate = moment().add(5, "minutes");
    let genrateOtp = otpGenerator(4);
    const data = await user.update(
      { otp: genrateOtp, otp_expiretime: expireDate },
      { where: { email: req.body.email } }
    );
    const find = await user.findOne({ where: { email: req.body.email } });
    let obj = { firstname: find.firstname, otp: genrateOtp };

    await sendMail(global.config.FROM_EMAIL, find.email, obj);
    return res.json({ data });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    let find = await user.findOne({ where: { email: req.body.email } });
    let currentdate = moment().utc();

    if (find.expireOtpTime > currentdate) {
      if (find.otp == req.params.otp) {
        if (req.body.newpassword === req.body.repeatpassword) {
          let data = await user.update(
            { password: req.body.newpassword },
            {
              where: {
                email: req.body.email,
              },
            }
          );
          return res.json({ data });
        } else {
          return res.json({
            message: res.__("PASSORD_DOES'T_MATCH"),
          });
        }
      } else {
        return res.json({ message: res.__("WRONG_OTP") });
      }
    } else {
      return res.json({ message: res.__("YOUR_OTP_IS_EXPIRED") });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = {
  userRegistration,
  userlogin,
  userVerify,
  forgetPasswordmail,
  forgotPassword,
};
