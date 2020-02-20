const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Book = new Schema(
    {
        title : {
            type: String
        }, 
        desc : {
            type: String
        },
        author : {
            type: String
        },
        category : {
            type: String
        },
        location : {
            type: String
        },
        cover: {
            type: String
        },
        owner : { 
            name : { type: String }, 
            email : { type: String } 
        }, 
        status : {
            type: String
        }, 
        borrower : { 
            id : { type: String },
            name : { type: String }, 
            email : { type: String } 
        }, 
        assignDate : {
            type: String
        }, 
        validTill : {
            type: String
        } 
    }
);
module.exports = Book;