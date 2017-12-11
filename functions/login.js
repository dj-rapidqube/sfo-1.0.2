'use strict';

const users = require('../models/user');

exports.Login = (email,password) =>

    new Promise((resolve, reject) => {



        users.find({
                "email": email
            })
            .then(users => {

                const dbpassword = users[0].password;
                console.log(users[0].password)
                console.log(dbpassword + "   " + users[0].password)

                if (String(password) === String(dbpassword)) {

                    resolve({
                        status: 200,
                        message: "Login Successful",
                        users: users
                    });

                } else {

                    reject({
                        status: 402,
                        message: "email or password wrong!"
                    });
                }
            })




            .then(users => {
                console.log(users)
                if (users.length == 0) {

                    reject({
                        status: 404,
                        message: 'User Not Found !'
                    });

                } else {

                    return users[0];

                }
            })


            .catch(err => reject({
                status: 401,
                message: 'user does not exist !'
            }));


    });