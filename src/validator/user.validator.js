const {celebrate,Joi,Segments,errors} = require("celebrate")


module.exports = {
 registerUservalid : ()=>  celebrate({
    [Segments.BODY]: Joi.object().keys({      
        firstname :Joi.string().required(),
        lastname : Joi.string().required(),
        email : Joi.string().required(),
        password : Joi.string().required(),
        repeatpassword : Joi.string().required()
    })
    }),
   
    

     loginUservalid : ()=> celebrate({
        [Segments.BODY] : Joi.object().keys({
          email : Joi.string().required(),
          password : Joi.string().required(), 
        })
     
     }),
     
      userVerifyvalid : ()=> celebrate({
        [Segments.BODY] : Joi.object().keys({
            email : Joi.string().required(),
    
        }),[Segments.PARAMS]: {
            otp : Joi.number().integer()
        }
    }),

     
      forgotPasswordmailValid : () => celebrate({
        [Segments.BODY] : Joi.object().keys({
           email : Joi.string().required(),
        })
     }),
     

      forgetPasswordvalid : ()=> celebrate({
        [Segments.BODY] : Joi.object().keys({
           email : Joi.string().required(),
           newpassword : Joi.string().required(),
           repeatpassword : Joi.string().required()
        }), [Segments.PARAMS] : {
          otp :Joi.number().integer()
        
        }
     })
     
   }

