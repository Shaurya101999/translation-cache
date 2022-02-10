
const redis = require('redis');
const redis_port = process.env.PORT || 6379;
const client = redis.createClient(redis_port);

const translator = require('@vitalets/google-translate-api');
const isoCode = require('iso-639-1');

module.exports.home = (req, res) => {
    return res.render('home');
}

module.exports.translate = (req, res) =>{
    let reqText = req.body ; 
    console.log('In controller')    
    let targetLanguageCode = isoCode.getCode(reqText.targetLanguage)
    let sourceLanguageCode = isoCode.getCode(reqText.sourceLanguage) || 'en';

    translator(req.body.text, {from: sourceLanguageCode, to: targetLanguageCode}).then(response => {
        console.log(response.text);
        let saveData = req.body.text+':'+sourceLanguageCode+':'+targetLanguageCode ;
        client.setex(saveData, 3600, response.text);
        
        return res.json(200, {
            message : 'translation complete',
            data: response.text
        });
    }).catch(err => {
        console.log('Error in translation ',err)
        return res.json(500, {
            message: 'error'
        })
    })

}