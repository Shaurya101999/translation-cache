let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// Assertion Style
let should = chai.should();

chai.use(chaiHttp);

describe('Translation API', () => {
    
    // test the post route
    describe("POST /translate", () =>{
        it("It should POST all key val pairs and get transalated word", (done) =>{
            let test1 = {
                text: "bonjour" ,
                sourceLanguage: "french",
                targetLanguage:  "english"
            };
            chai.request(server)
                .post("/translate")
                .type('json')
                .send(test1)
                .end((err, response) => {
                    response.status.should.equal(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('data');
                    response.body.should.have.property('message');
                    response.body.should.be.eql({
                        "message": "translation complete",
                        "data": "Hello"
                    })
                done();
                });
        });

        it("It should ask all 3 fields to be filled as one or more are empty", (done) =>{
            let test2 = {
                text: "" ,
                sourceLanguage: "french",
                targetLanguage:  "english"
            };
            chai.request(server)
                .post("/translate")
                .type('json')
                .send(test2)
                .end((err, response) => {
                    response.status.should.equal(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message');
                    response.body.should.be.eql({
                        "message": "Please enter all data that is text, sourceLanguage and targetLanguage"
                    })
                done();
                });
        });

        it("If language or data is invalid then it will return same text", (done) =>{
            let test3 = {
                text: "good morning" ,
                sourceLanguage: "cat",
                targetLanguage:  "dog"
            };
            chai.request(server)
                .post("/translate")
                .type('json')
                .send(test3)
                .end((err, response) => {
                    response.status.should.equal(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message');
                    response.body.should.be.eql({
                        "message": "translation complete",
                        "data": "good morning"
                    })
                done();
                });
        });

        
    });

});