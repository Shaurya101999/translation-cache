const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8000 ;

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('./assets'));
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server');
    }
    console.log(`Server running on port ${port}`);
})