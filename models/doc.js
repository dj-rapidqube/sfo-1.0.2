'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const docSchema = mongoose.Schema({

    fullname: String,
    age: Number,
    relation:String,
    gender: String,
    occupation:String,
    phone: Number,
    nationality: String,
    formdate: String,
    email: { type: String, unique: true },
    occupation: String,
    rapidID: String,
    password: String

});


mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });
mongoose.connect('mongodb://shraddhak26:swaraa02@ds123556.mlab.com:23556/sfo', { useMongoClient: true });

module.exports = mongoose.model('doc', docSchema);