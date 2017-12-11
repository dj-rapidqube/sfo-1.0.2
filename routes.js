//here only routing is done
'use strict';

const cors = require('cors');
const nodemailer = require('nodemailer');
var request = require('request');
var mongoose = require('mongoose');

var path = require('path');
var cloudinary = require('cloudinary').v2;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var crypto = require('crypto');
var express = require('express');

const updateProfile = require('./functions/updateProfile');
const getUserdetails = require('./functions/getUserdetails');
const login = require('./functions/login');
const newRequest = require('./functions/newRequest');
const getAssets = require('./functions/getAssets');
module.exports = router => {
    // file upload API
    cloudinary.config({
        cloud_name: 'rapidqubedigi',
        api_key: '247664843254646',
        api_secret: 'NNP88tw2YEBofSww9bPK7AV9Jc0'
    });
    // weather API key
    var apiKey = '6ebeec1ed5f648e88de55743172109';
    // Iot Data Thingworks 
    router.get('/rapidID', cors(), (req, res) => {
        const rapidID = getrapidID(req);
        res.send({
            "rapidId": rapidID
        })
    });
    router.get('/Trading', cors(), (req, res1) => {
        console.log("entering into IOT function ");
        var options = {
            url: 'http://api.bitcoincharts.com/v1/markets.json',
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                'Accept': 'application/json'
            },
        };
        request(options, function(err, result, body) {
            if (result && (result.statusCode === 200 || result.statusCode === 201 || result.statusCode === 401 || result.statusCode === 402 || result.statusCode === 404)) {
                var mydata = JSON.parse(result.body)
                res1.status(result.statusCode).json({
                    data: mydata,
                })
            }
        });
    });
    router.get('/stocks', cors(), (req, res1) => {
        console.log("entering into stocks function ");
        var options = {
            url: 'https://www.quandl.com/api/v3/datasets/NSE/HEXAWARE.json?api_key=EGT68rVF17ytsV284s5k&start_date=2011-06-29',
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                'Accept': 'application/json'
            },
        };
        request(options, function(err, result, body) {
            if (result && (result.statusCode === 200 || result.statusCode === 201 || result.statusCode === 401 || result.statusCode === 402 || result.statusCode === 404)) {
                var mydata = JSON.parse(result.body)
                res1.status(result.statusCode).json({
                    data: mydata,
                })
            }
        });
    });
    // ----------------------------- Services For Login-----------------------------------------
    router.post('/Login', cors(),(req, res) => {
        console.log("body",req.body);
        var email = req.body.email;
        console.log(email);
        var password = req.body.password;
        const password1 =  crypto.createHash('sha256').update(password).digest('base64');
        console.log(password1);
       
     
       if(!email || !password) {
            
                        res.status(400).json({
                            message: 'Invalid Request !'
                        });
            
                    } else {
            
                        login.Login(email,password)
            
                        .then(result => {
            
                            res.status(result.status).json({
                                "message": "Login Successful",
                                status: result.status,
                                "user":result.users
                            })
                        })
            
                        .catch(err => res.status(err.status).json({
                            message: err.message
                        }).json({
                            status: err.status
                        }));
                    }
        
    });
//---------------------service for buildProfile--------------------//
    router.post('/buildProfile',cors(), (req, res) => {
        
        const fullname = req.body.fullname;
        console.log(fullname);
        const age = req.body.age;
        console.log(age);
        const relation = req.body.relation;
        console.log(relation);
        const gender = req.body.gender;
        console.log(gender);
        const occupation = req.body.occupation;
        console.log(occupation);
        const phone = req.body.phone;
        console.log(phone);
        const nationality = req.body.nationality;
        console.log(nationality);
        const formdate = req.body.formdate;
        console.log(formdate);
        const email = req.body.email;
        console.log(email);
        const rapidID = crypto.createHash('sha256').update(email.concat(phone)).digest('base64');
        console.log(rapidID);
        const password = makeid();
        const password1 =  crypto.createHash('sha256').update(password).digest('base64');
        console.log(password1);
        var transporter = nodemailer.createTransport("SMTP", {
            host: 'smtp.office365.com',
            port: 25,
            secure: true,
            auth: {
                user: "shraddha.kharat@rapidqube.com",
                pass: "Swaraa02"
            }
        });
console.log("email"+password);
        var mailOptions = {
            transport: transporter,
            from: '"welcome Single Family Office"<shraddha.kharat@rapidqube.com>',
            to: email,
            subject: 'Please confirm your Email account and Password',
            text: password,
            html: "Hello,login with this password." +password
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
            }else{
                console.log(info)
            }
        });
        if (!fullname || !age || !relation || !gender || !occupation || !phone || !nationality || !formdate || !email) {
            
                        res.status(400).json({
                            message: 'Invalid Request !'
                        });
            
                    } else {
            
                        buildprofile.buildProfile(fullname,age,relation,gender,occupation,phone,nationality,formdate,email,rapidID,password)
            
                        .then(result => {
            
                            res.status(result.status).json({
                                message: result.message
                            })
                        })
            
                        .catch(err => res.status(err.status).json({
                            message: err.message
                        }).json({
                            status: err.status
                        }));
                    }
                });
//--------------------------service for updateProfile-------------//
router.post('/updateProfile',cors(), (req, res) => {
    const rapidID = req.get('Authorization');
    console.log(rapidID)
    if (!rapidID==rapidID) {
console.log(" invalid body ")
return res.status(400).json({
    message: 'Invalid Request !'
});
}
    
    const fullname = req.body.fullname;
    console.log(fullname);
    const age = req.body.age;
    console.log(age);
    const relation = req.body.relation;
    console.log(relation);
    const gender = req.body.gender;
    console.log(gender);
    const occupation = req.body.occupation;
    console.log(occupation);
    const phone = req.body.phone;
    console.log(phone);
    const nationality = req.body.nationality;
    console.log(nationality);
    const formdate = req.body.formdate;
    console.log(formdate);
    const email = req.body.email;
    console.log(email);
    
    const password = makeid();
    const password1 =  crypto.createHash('sha256').update(password).digest('base64');
    console.log(password1);
    if (!fullname || !age || !relation || !gender || !occupation || !phone || !nationality || !formdate || !email) {
        
                    res.status(400).json({
                        message: 'Invalid Request !'
                    });
        
                } else {
        
                    updateProfile.updateProfile(fullname,age,relation,gender,occupation,phone,nationality,formdate,email,rapidID,password)
        
                    .then(result => {
        
                        res.status(result.status).json({
                            message: result.message
                        })
                    })
        
                    .catch(err => res.status(err.status).json({
                        message: err.message
                    }).json({
                        status: err.status
                    }));
                }
            });
//----------------------------servcie for getUserdetails------------//
   router.get('/getUserdetails',cors(),(req,res)=>{
  
            const rapidID = req.get('Authorization');
            console.log(rapidID)
            if (!rapidID==rapidID) {
        console.log(" invalid body ")
        return res.status(400).json({
            message: 'Invalid Request !'
        });
    }
         getUserdetails.getUserdetails(rapidID)
                     .then(result=>{
                        res.status(result.status).json({
                         "message": result.users
                     })
                 })
                 
                 .catch(err => res.status(err.status).json({
                     message: err.message
                 }).json({
                     status: err.status
                 }));
             
         
     });
//----------------------------servcie for addAssets----------------//                    
   
    router.post('/newRequest',cors(),(req, res) => {
        console.log(req.body)
        const rapidID = req.get('Authorization');
        const transactionString = req.body.transactionString;
    
        if (!rapidID||!transactionString) {
    return res.status(400).json({
        message: 'Invalid Request !'
    });
    
    }       
                        newRequest.newRequest(rapidID,transactionString)
            
                        .then(result => {
            
                            res.status(result.status).json({
                                message: result.message
                            })
                        })
            
                        .catch(err => res.status(err.status).json({
                            message: err.message
                        }).json({
                            status: err.status
                        }));
                    });
            
        
//----------------------Service For getAssets-----------------------//
router.get('/getAssets',cors(),(req,res)=>{
    
      
                const rapidID = req.get('Authorization');
                console.log(rapidID)
    
                if (!rapidID==rapidID) {
            console.log(" invalid body ")
            return res.status(400).json({
                message: 'Invalid Request !'
            });
    
        }
        getAssets.getAssets(rapidID)
                         .then(result=>{
                            res.status(result.status).json({
                             "message": result.assets
                         })
                     })
                     
                     .catch(err => res.status(err.status).json({
                         message: err.message
                     }).json({
                         status: err.status
                     }));
                 
             
         });
        }
//--------------------------------------------