const {celebrate,Joi,Segments,errors} = require("celebrate")



const registerUservalid = {
    [Segments.BODY]: Joi.object().keys({
       
        firstname :Joi.string().required(),
        lastname : Joi.string().required(),
        email : Joi.string().required(),
        password : Joi.string().required(),
        repeatpassword : Joi.string().required()
    })
    }
    

    const loginUservalid = {
        [Segments.BODY] : Joi.object().keys({
          email : Joi.string().required(),
          password : Joi.string().required(), 
        })
     
     }
     
     const userVerifyvalid = {
        [Segments.BODY] : Joi.object().keys({
            email : Joi.string().required(),
    
        }),[Segments.PARAMS]: {
            otp : Joi.number().integer()
        }
    }
     
     const forgotPasswordmailValid = {
        [Segments.BODY] : Joi.object().keys({
           email : Joi.string().required(),
        })
     }
     

     const forgetPasswordvalid = {
        [Segments.BODY] : Joi.object().keys({
           email : Joi.string().required(),
           newpassword : Joi.string().required(),
           repeatpassword : Joi.string().required()
        }), [Segments.PARAMS] : {
          otp :Joi.number().integer()
        
        }
     }
     



    module.exports = {registerUservalid,loginUservalid,userVerifyvalid,forgotPasswordmailValid,forgetPasswordvalid}