const otpGenrator = (number)=>{
    const totalValue = Math.floor(Math.random() * (9 * Math.pow(10, number - 1)))
     const lowestvalue = totalValue + Math.pow(10, number - 1)
 return lowestvalue
}

module.exports = otpGenrator