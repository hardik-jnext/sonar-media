let passwordHash = require("pbkdf2-password-hash")




const otpGenrator = (number)=>{
    const totalValue = Math.floor(Math.random() * (9 * Math.pow(10, number - 1)))
     const lowestvalue = totalValue + Math.pow(10, number - 1)
 return lowestvalue
}



let passwordEncrpt = async(password) =>{
 return  await passwordHash.hash(password,{iterations: 100, digest: 'sha1', keylen: 16, saltlen: 16})

}

let comparePassord = async(oldPassword,newPassword)=>{
 return await passwordHash.compare(newPassword,oldPassword)
}






module.exports = {otpGenrator,passwordEncrpt}

