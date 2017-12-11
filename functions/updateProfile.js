'use strict';

const users = require('../models/user');


///---//

exports.updateProfile = (fullname,age,relation,gender,occupation,phone,nationality,formdate,email,rapidID,password) =>{
    return new Promise((resolve, reject) => {
        users.findOneAndUpdate({
            rapidID: rapidID
        }, {
            $set: {
                'fullname': fullname,
                'age':age,
                'relation':relation,
                'gender':gender,
                'occupation':occupation,
                'phone':phone,
                'nationality':nationality,
                'formdate':formdate,
                'email':email,
              
            }
    }, {new: true}).then((requests) => 
    
    {
        console.log("requests"+requests)
        resolve({status: 201, message: "update addded"})
    
    
    })
            .catch(err => {
    
               if (err.code == 11000)  {
    
                   reject({status: 500, message: 'Internal Server Error !'});
                }
            });
    });
    }