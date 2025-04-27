const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const companyschema = new mongoose.Schema({

    team :{
        type : String,
        required : true
    },

    date : {
        type : Date,
        required : true
    },

    Operatorname : {
        type : String,
        required : true
    },

    Operatorgrade : {
        type : String,
        required : true
    },

    Operationname : {
        type : String,
        required : true
    },

    Operationgrade : {
        type : String,
        required : true
    },

    adjustedTime: {
        type : Number,
        required : true,
    },

    piecesPerHour : {
        type : Number,
        required : true,
        // default: 0,
    }
});
const Companysystem = mongoose.model("Companysystem",companyschema);

module.exports = Companysystem; 
