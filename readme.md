# translation-cache : translation api with cache

A simple translation API with cache implementation so that response time is very less as no. of times API is called because of cache which fetches data from redis 

**Tech Stack used:**
>* Node.js
>* Express
>* redis



**Important Modules Used**
>* @vitalets/google-translate-api: to translate text
>* iso-639-1: to find code of language entered


**Design Decisions**
* Used MVC structure to make API so any improvements could be done easily (but right now views and models aren't used)

* Used Redis for caching as it stores simple key value pairs and All of the data is stored in RAM, so the speed of this system is phenomenal 

**Structure (main functionalities)**
* Used express framwork

* User has to enter the details like text, sourceLanguage and targetLanguage and then API will return the translated text

* Controller folder has all the main functionalities like translation and pre caching

* Middleware folder has cache implementation which is accessed in routes as middleware to check cache memory before calling the controller (or function) to translate . Also expiration time is set in cache while putting data in it from home_controller, we can change it according to our needs right now it is 1 hour 

* There is a manually made array of similar languages to implement precache function in home_controller 

* test folder is to to test the API using mocha 


# Setup and run the Server
* Install redis and node js
* Clone the repo
* Install node modules using npm install ( for redis make sure you install redis@3.0.2 version only as other versions might give errors)
* Fire up the redis server on port 6379
* write npm start in folder terminal to run the server 

# Testing
* Used mocha and chai to test the API
* Type npm test in terminal to test the API

**Cache Database**
>* In cache data is stored like key : value pairs where key is 'originalText:sourceLanguageCode:targetLanguageCode'
and value is translated text

**Evaluation**
* Evaluation is done by comparing response time of frequent hits and test.js in test folder

**Ideas for further Improvement**
* We can add some conditions which will check if language/text is valid or not or we can auto-correct them 
* We can try/make similarLanguage array dynamic 

# Screenshots

**First call to API( its taking something 2s)**
![eng to hindi text](https://github.com/Shaurya101999/translation-cache/blob/master/assets/screenshots/2022-02-11.png "Title")

**Calling again( now its taking 7ms)**
![eng to hindi text](https://github.com/Shaurya101999/translation-cache/blob/master/assets/screenshots/2022-02-11(3).png "Title")

**Calling again for similar language (preCache)**
![eng to gujarati text](https://github.com/Shaurya101999/translation-cache/blob/master/assets/screenshots/2022-02-11(4).png "Title")

**If some field is empty**
![empty text](https://github.com/Shaurya101999/translation-cache/blob/master/assets/screenshots/2022-02-11(5).png "Title")

**If language/ text is invalid**( then it will return same text )
![eng to gujarati text](https://github.com/Shaurya101999/translation-cache/blob/master/assets/screenshots/2022-02-11(6).png "Title")
