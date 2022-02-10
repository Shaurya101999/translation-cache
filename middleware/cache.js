
const redis = require('redis');
const redis_port = process.env.PORT || 6379;
const client = redis.createClient(redis_port);
// client.connect();
const isoCode = require('iso-639-1');

module.exports.myCache = (req, res, next) => {
    if(req.body.text.length == 0 || req.body.sourceLanguage.length == 0 || req.body.targetLanguage.length == 0){
        return res.json(400, {
            message: 'Please enter text or sourceLanguage or targetLanguage'
        })
    }

    let reqText = req.body ; 
    console.log('In cache')    
    let targetLanguageCode = isoCode.getCode(reqText.targetLanguage)
    let sourceLanguageCode = isoCode.getCode(reqText.sourceLanguage) || 'en';
    
    let saveData = req.body.text+':'+sourceLanguageCode+':'+targetLanguageCode ;
    
    client.get(saveData , (err, data)=>{
        if(err) throw err;
        if(data !== null){
            return res.json(200, {
                message: 'text from cache',
                data: data
            })
        }else{
            next();
        }
    })    
}