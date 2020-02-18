const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema(
    {
        id : {
            type: String
        },
        name : {
            type: String
        }, 
        email : {
            type: String
        }
    }
);
module.exports = User;