
const redis = require('redis');
const redis_port = process.env.PORT || 6379;
const client = redis.createClient(redis_port);
// client.connect();
const isoCode = require('iso-639-1');

module.exports.myCache = (req, res, next) => {
    // console.log('For Test : ', req.body);
    if(req.body===undefined || req.body.text.length == 0 || req.body.sourceLanguage.length == 0 || req.body.targetLanguage.length == 0){
        return res.status(400).json({
            message: 'Please enter all data that is text, sourceLanguage and targetLanguage'
        })
    }

    let reqText = req.body ; 
    // console.log('In cache')    
    let targetLanguageCode = isoCode.getCode(reqText.targetLanguage)
    let sourceLanguageCode = isoCode.getCode(reqText.sourceLanguage) || 'en';
    
    let saveData = req.body.text+':'+sourceLanguageCode+':'+targetLanguageCode ;
    
    client.get(saveData , (err, data)=>{
        if(err) throw err;
        if(data !== null){
            return res.status(200).json({
                message: 'translation complete',
                data: data
            })
        }else{
            next();
        }
    })    
}