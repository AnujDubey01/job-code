const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema ({
    tittle : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    requirements : {
        type : [String],
        required : true
    },
    company : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Company',
        required : true
    },
    position : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    },
    jobType : {
        type : String,
        enum : ['full-time', 'part-time', 'internship'],
        required : true
    },
    experience : {
        type: Number,
        required : true
    },
    created_By : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    applicants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Application'
    }]
});

module.exports = mongoose.model('Job', jobSchema);