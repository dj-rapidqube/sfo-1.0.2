'use strict';
var user = "risabh.s";
const assets = require('../models/assets');
//const bcSdk = require('../src/blockchain/blockchain_sdk');



exports.getAssets = (rapidID) => {
    console.log(rapidID)
    return new Promise((resolve, reject) => {

       

        assets.find({
                        "rapidID": rapidID
                    })

                    .then((assets) => {
                        console.log(assets)

                     return resolve({
                            status: 201,
                            assets: assets
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