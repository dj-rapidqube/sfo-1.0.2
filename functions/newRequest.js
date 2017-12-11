'use strict';

const assets = require('../models/assets');
const bcsdk = require('../invoke.js');

exports.newRequest = (rapidID,transactionString) =>{



  return  new Promise((resolve, reject) => {

       const newUser = new assets({
            rapidID:rapidID,
            transactionString:transactionString    
       });
        newUser.save()
        var txstr =JSON.stringify(transactionString);
       bcsdk.newRequest({"rapidID":rapidID,
                                "str":txstr})

       .then(() => resolve({
            status: 201,
            message: 'Assets added  Sucessfully !'
        }))

       .catch(err => {

           if (err.code == 11000) {

               reject({
                    status: 409,
                    message: 'User Already Registered !'
                });

           } else {

               reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });
            }
        });
    })};