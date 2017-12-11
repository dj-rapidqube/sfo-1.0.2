'use strict';

const assets = require('../models/assets');

exports.addAssets = (assetDetails,rapidID) =>{


   return  new Promise((resolve, reject) => {

    assets.find({
        "rapidID": rapidID
    })

        const newUser = new assets({
            assetDetails:assetDetails,
            rapidID:rapidID
            
        });
        newUser.save()

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
