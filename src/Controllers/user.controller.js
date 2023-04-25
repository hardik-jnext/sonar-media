const db = require("../Config/Config.js");
const user = db.user;
const secretkey = "secretkey"
const otpGenerator = require("../helpers/otpgenerator.helper.js")
const moment = require("moment");
const {Op} = require("sequelize")
const jwt = require("jsonwebtoken")
const registerMail = require("../helpers/registerMail.helper.js")

const userRegistration = async (req, res) => {
  try {
    const body = req.body;
    const fineUser = await user.findOne({ where: { email: body.email } });
    if (fineUser) {
      return res
        .status(200)
        .send({ status: true, message: res.__("YOU_ARE_ALREADY_REGISTEDS!!!")});
    } else {

      if (body.password == body.repeatpassword) {
        let expireDate = moment().add(5, "minutes");
        const createUser = await user.create({
          firstname: body.firstname,
          lastname: body.lastname,
          email: body.email,
          password: body.password,
          repeatpassword: body.repeatpassword,
          otp : otpGenerator,
          otp_expiry :expireDate
        });
        let obj = { userName: createUser.userName, otp: createUser.otp };
        await registerMail("dishang.jnext@gmail.com", createUser.email, obj);
        return res.json({ message: res.__("THANKS_FOR_REGISTRATION...") });

      } else {
        return res
          .status(200)
          .send({
            status: true,
            message: res.__("PASSOWRD_AND_ REPEATPASSWORD_NOT_MATCH"),
          });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, message: error });
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
      return res.json({ message: res.__("YOU_ARE_NOT_REGISTERED_USER...") });
    }
    let token = jwt.sign(findRecord, secretkey);
    return res.json({ message: token });
  } catch (error) {
    console.log(error);
  }
};


const userVerify = async (req, res) => {
    try {
      const data = await user.findOne({ where: { email: req.body.email } });
      const currentTime = moment().utc();
      if (data.status == "Active") {
        return res.json({ message: res.__("YOUR_ACCOUNT_IS_ALREADY_VERIFIED...") });
      } else {
        if (data.otp_expiretime < currentTime) {
          return res.json({ message: res.__("OTP_HAS_EXPIRED!!!")});
        } else {
          if (data.otp == req.params.otp) {
            const dataVerify = await user.update(
              {
                is_verify: true,
                status: "Active",
              },
              {
                where: {
                  otp: req.params.otp,
                },
              }
            );
            return res.json({
              message: res.__("YOUR_PROFILE_IS_VERIFIRD_SUCCESSFULLY..."),
            });
          } else {
            return res.json({ message: res.__("YOUR_OTP_IS INVALID...") });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };



  const forgetPasswordmail = async (req, res) => {
    try {
      let expireDate = moment().add(5, "minutes");
      const data = await user.update(
        { otp: genrateOtp, otp_expiretime: expireDate },
        { where: { email: req.body.email } }
      );
      const find = await user.findOne({ where: { email: req.body.email } });
  
      let obj = { firstname: find.firstname, otp: data.otp };
  
      await registerMail("dishang.jnext@gmail.com", find.email, obj);
      return res.json({ data });
    } catch (error) {
      console.log(error);
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
              message: res.__("NEW_PASSWORD_AND_REPEAT_PASSORD_DOES'T_MATCH"),
            });
          }
        } else {
          return res.json({ message: res.__("YOUR_OTP_IS_WRONG") });
        }
      } else {
        return res.json({ message: res.__("YOUR_OTP_IS_EXPIRED!!!" )});
      }
    } catch (error) {
      console.log(error);
    }
  };
  




module.exports = {userRegistration,userlogin,userVerify,forgetPasswordmail,forgotPassword}
