
const redis = require('redis');
const redis_port = process.env.PORT || 6379;
const client = redis.createClient(redis_port);

const translator = require('@vitalets/google-translate-api');
const isoCode = require('iso-639-1');

// renders home page with details
module.exports.home = (req, res) => {
    return res.render('home');
}

// to translate data , store in cache and call preCache
module.exports.translate = (req, res) =>{
    let reqText = req.body ; 
    // console.log('In controller')    
    
    // getting the codes of given languages
    let targetLanguageCode = isoCode.getCode(reqText.targetLanguage)
    let sourceLanguageCode = isoCode.getCode(reqText.sourceLanguage) || 'en';

    // calling preCache
    preCache(sourceLanguageCode, targetLanguageCode, reqText.text);
    
    // translating the text
    translator(req.body.text, {from: sourceLanguageCode, to: targetLanguageCode}).then(response => {
        console.log(response.text);
        let saveData = req.body.text+':'+sourceLanguageCode+':'+targetLanguageCode ;
        client.setex(saveData, 3600, response.text);
        
        return res.status(200).json({
            message : 'translation complete',
            data: response.text
        });
    }).catch(err => {
        console.log('Error in translation ',err)
        return res.status(500).json({
            message: 'error'
        })
    })
}

const similarLanguagesList=[
    ["hi","kn","bn","gu","pa","ta","te"],
    ["en","cy",],
    ["fr","de","it","es","nl"]
]

// pre cache function to create a cache for similar languages
function preCache(sourceLanguageCode, targetLanguageCode, text){
 
    // search for similar languages inside the array
    for(let i=0;i<similarLanguagesList.length;i++){
        let index=similarLanguagesList[i].indexOf(targetLanguageCode);
        
    // if language is not there in list then continue
        if(index==-1){
            continue;
        }
         
       for(let j=0;j<similarLanguagesList[i].length;j++){
           if(j!=index){
            //    console.log(similarLanguagesList[i][j]);
                translator(text, {from: sourceLanguageCode, to: similarLanguagesList[i][j]}).then(response => {
                    console.log(response.text);
                    let saveData = text+':'+sourceLanguageCode+':'+similarLanguagesList[i][j] ;
                    client.setex(saveData, 3600, response.text);
                
                    console.log(`${similarLanguagesList[i][j]} => ${response.text}`)
                    
            }).catch(err => {
                console.log('Error in pre cache',err);
            });
           }
       }   
        
    }

}
