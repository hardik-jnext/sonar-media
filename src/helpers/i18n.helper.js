const {I18n} = require("i18n")
const path = require('path')




const i18n = new I18n({
    locales :['en','de','fr'],
    directory : path.join(__dirname,'../translation'),
    defaultLocale : 'en',
    header :'accept-language'   
})


module.exports = i18n