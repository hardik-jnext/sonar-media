const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const body = require("body-parser")
const db = require("./src/models/index.js")
const router = require('./src/routes/user.routes.js')
const i18n = require("./src/helpers/i18n.helper.js")
const env = process.env.NODE_ENV || "development"
const config = require("./src/Config/config.json")[env]
global.config = config




function encrypt(plaintext, key) {
    let ciphertext = '';
    for (let i = 0; i < plaintext.length; i++) {
      // get the ASCII code of the current character
      let asciiCode = plaintext.charCodeAt(i);
      // add the key to the ASCII code
      let encryptedCode = asciiCode + key;
      // convert the encrypted code back to a character
      let encryptedChar = String.fromCharCode(encryptedCode);
      // add the encrypted character to the ciphertext
      ciphertext += encryptedChar;
    }
    return ciphertext;
  }

  console.log(encrypt("hardik108",2))


   function decrypt(ciphertext, key) {
    let plaintext = '';
    for (let i = 0; i < ciphertext.length; i++) {
      // get the ASCII code of the current character
      let asciiCode = ciphertext.charCodeAt(i);
      // subtract the key from the ASCII code
      let decryptedCode = asciiCode - key;
      // convert the decrypted code back to a character
      let decryptedChar = String.fromCharCode(decryptedCode);
      // add the decrypted character to the plaintext
      plaintext += decryptedChar;
    }
    return plaintext;
  }


  console.log(decrypt("jctfkm32:",3))



app.use(body.json())

db.sequelize.sync({force : false})



app.use(i18n.init)

app.use("/user",router)



app.listen(config.PORT,()=>{
    console.log(`Server running at port no.${config.PORT}`);
})