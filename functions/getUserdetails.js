'use strict';
var user = "risabh.s";
const users = require('../models/user');
//const bcSdk = require('../src/blockchain/blockchain_sdk');



exports.getUserdetails = (rapidID) => {
    console.log(rapidID)
    return new Promise((resolve, reject) => {

       

                users.find({
                        "rapidID": rapidID
                    })

                    .then((users) => {
                        console.log(users)

                     return resolve({
                            status: 201,
                            users: users
                        })
                    })
            })
                
            .catch(err => {

                console.log("error occurred" + err);

                return reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });
            })

};