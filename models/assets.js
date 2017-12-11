'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assetsSchema = mongoose.Schema({
    
    rapidID: String,
    transactionString:Object,

});


mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });

mongoose.connect('mongodb://shraddhak26:swaraa02@ds123556.mlab.com:23556/sfo', { useMongoClient: true });



module.exports = mongoose.model('assets', assetsSchema);