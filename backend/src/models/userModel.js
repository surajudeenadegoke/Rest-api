const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [ true, 'please enter a name' ],
        
    },
    email : {
        type : String,
        required : [ true, 'please enter a  email address' ],
        unique : true
    },
    password : {
        type : String,
        required : [ true, 'please enter a valid password' ],
    }  
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('User', userSchema)