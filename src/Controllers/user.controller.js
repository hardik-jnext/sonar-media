const db = require("../models/index.js");
const user = db.user;
const secretkey = "token";
const moment = require("moment");
const jwt = require("jsonwebtoken");
const sendMail = require("../helpers/sendMail.helper.js");
const {
  otpGenrator,
  passwordEncrpt,
  comparePassword,
} = require("../helpers/utils.js");
var Secret_Key = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(Secret_Key);
require("dotenv").config();


const userRegistration = async (req, res) => {
  try {
    const body = req.body;
    const findUser = await user.findOne({ where: { email: body.email } });

    if (findUser && findUser.status == "Active") {
      return res
        .status(200)
        .send({ status: true, message: res.__("REGISTERED") });
    } else if (findUser && findUser.status == "Inacitve") {
      let expireDate = moment().add(5, "minutes");
      let otp = otpGenrator(4);
      let obj = { firstname: findUser.firstname, otp: otp };
      const updateRecords = await user.update(
        {
          firstname: body.firstname,
          lastname: body.lastname,
          password: await passwordEncrpt(body.password),
          repeatpassword: body.repeatpassword,
          otp: otp,
          otp_expiry: expireDate,
        },
        {
          where: {
            email: body.email,
          },
        }
      );
      await sendMail(global.config.FROM_EMAIL, body.email, obj);
      return res
        .status(200)
        .send({ status: true, message: res.__("THANK_REGISTER") });
    } else {
      if (body.password == body.repeatpassword) {
        let expireDate = moment().add(5, "minutes");

        const createUser = await user.create({
          firstname: body.firstname,
          lastname: body.lastname,
          email: body.email,
          password: await passwordEncrpt(body.password),
          repeatpassword: body.repeatpassword,
          otp: otpGenrator(4),
          otp_expiry: expireDate,
        });
        let obj = { firstname: createUser.firstname, otp: createUser.otp };
        await sendMail(global.config.FROM_EMAIL, createUser.email, obj);
        return res
          .status(200)
          .send({ status: true, message: res.__("THANK_REGISTER") });
      } else {
        return res.status(200).send({
          status: true,
          message: res.__("PASSWORD_AND_REPEATPASSWORD"),
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
        email: req.body.email,
      },
      raw: true,
    });

    if (!findRecord) {
      return res.json({ message: res.__("NOT_REGISTERED") });
    }
    if (await comparePassword(findRecord.password, req.body.password)) {
      if (!findRecord.stripe_id) {
        const customer = await stripe.customers.create({});
        await user.update(
          { stripe_id: customer.id },
          {
            where: {
              id: findRecord.id,
            },
          }
        );
      }
      let token = jwt.sign(findRecord, secretkey);
      return res.json({ message: token });
    } else {
      return res
        .status(200)
        .send({ status: true, message: res.__("INVALID_PASSWORD") });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};

const userVerify = async (req, res) => {
  try {
    const data = await user.findOne({ where: { email: req.body.email } });
    if (!data) {
      return res
        .status(200)
        .send({ status: true, message: res.__("RECORDS_NOT") });
    } else {
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
                  email: data.email,
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
    console.log(expireDate);
    let genrateOtp = otpGenrator(4);
    const data = await user.update(
      { otp: genrateOtp, otp_expiretime: expireDate },
      { where: { email: req.body.email } }
    );
    const find = await user.findOne({ where: { email: req.body.email } });

    let obj = { firstname: find.firstname, otp: genrateOtp };

    await sendMail(global.config.FROM_EMAIL, find.email, obj);
    return res.status(200).send({ status: true, message: res.__("OTP_SEND") });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error.message });
  }
};
const forgotPassword = async (req, res) => {
  try {
    let find = await user.findOne({ where: { email: req.body.email } });
    let currentdate = moment().utc();
    if (find.otp == req.params.otp) {
      if (find.otp_expiry > currentdate) {
        if (req.body.newpassword === req.body.repeatpassword) {
          let data = await user.update(
            { password: await passwordEncrpt(req.body.newpassword) },
            {
              where: {
                email: req.body.email,
              },
            }
          );
          return res
            .status(200)
            .send({ status: 200, message: res.__("PAASWORD_UPDATE") });
        } else {
          return res.status(200).send({
            status: true,
            message: res.__("PASSWORD_DOES'T_MATCH"),
          });
        }
      } else {
        return res
          .status(200)
          .send({ status: true, message: res.__("YOUR_OTP_IS_EXPIRED") });
      }
    } else {
      return res
        .status(200)
        .send({ status: true, message: res.__("WRONG_OTP") });
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
