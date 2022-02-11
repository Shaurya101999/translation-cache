const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000 ;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// for accessing assets and views
app.use(express.static('./assets'));
app.use('/', require('./routes'));

module.exports = app.listen(port, function(err){
    if(err){
        console.log('Error in running the server');
    }
    console.log(`Server running on port ${port}`);
})