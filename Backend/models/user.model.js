const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
import * as next from 'next';

const userSchema = new mongoose.Schema({

    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['student',Recruiter],
        required : true,
        default : 'student'
    },
    profile: {
        bio : {type : 'String'},
        skills : [{type : 'String'}],
        resume : {type : 'String'},
        resumeOrignalName : {type : 'String'},
        company : {type : mongoose.Schema.Types.ObjectId, ref : 'Company'},
        savedJobs : [{type : mongoose.Schema.Types.ObjectId, ref : 'Job'}],
        profilePhoto : {
            type : String,
            default : ""
        }
    },
},
    {timeStamp : true}
);

userSchema.pre('save',async function (next) {

    if(!this.isModified('password')) return next(); 
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        next();

    } catch (error) {
        res.status(500).send({
            message : error.message
        });
    }
});

userSchema.methods.matchPassword = async function(enteredPassword) { 
  return await bcrypt.compare(enteredPassword, this.password); 
}; 

module.exports = mongoose.model('User', userSchema);