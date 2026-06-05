const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// import * as next from 'next';

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
        enum : ['student','Recruiter'],
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
    {timeStamps : true}
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.matchPassword = async function(enteredPassword) { 
  return await bcrypt.compare(enteredPassword, this.password); 
}; 

module.exports = mongoose.model('User', userSchema);