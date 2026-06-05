const jobModel = require("../models/job.model");

const postJob = async (req,res) => {
    try {
        const { tittle, description, requirements ,companyId ,position ,  salary,experience, location, jobType ,  } = req.body;
        const userId = req.user.id;

        if (!tittle || !description || !requirements || !location || !position || ! salary || !experience || !companyId || !jobType) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required'
            });
        }
        const job = await jobModel.create({
            tittle,
            description,
            requirements: requirements.split(","),
            location,
            position,
            salary : Number(salary),
            experience,
            company : companyId,
            jobType,
            created_By : userId
        });
        return res.status(200).send({
            success: true,
            message: 'Job posted successfully',
            job,
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

const getAllJobs = async (req,res) => {
    try {
        const Keyword = req.query.keyword || "";
        const query = {
            $or : [
                {tittle : {$regex : Keyword , $options : "i"}},
                {description : {$regex : Keyword , $options : "i"}},
            ]
        };

        const jobs = await jobModel.find(query).populate({
            path:"company"
        }).sort({ created: -1 })
        if(!jobs){
            return res.status(404).send({
                success: false,
                message: 'Jobs not found'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Jobs fetched successfully',
            jobs,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await jobModel.findById(jobId);
        if(!job){
            return res.status(404).send({
                success: false,
                message: 'Job not found'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Job fetched successfully',
            job,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

const updateJob = async (req, res) => {
    try {
        const {tittle, description, requirements ,location, position ,  salary,experience, jobType} = req.body;
        const file = req.file;

        const jobId = req.params.id;
        const updatedData = {tittle, description, requirements,location, position ,  salary,experience, jobType};
        const job = await jobModel.findByIdAndUpdate(jobId, updatedData, { new: true });
        if(!job){
            return res.status(404).send({
                success: false,
                message: 'Job not found'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Job updated successfully',
            job,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await jobModel.find({created_By : adminId});
        if(!jobs){
            return res.status(404).send({
                success: false,
                message: 'Jobs not found'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Jobs fetched successfully',
            jobs,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}
module.exports = { postJob,
    getAllJobs,
    getJobById,
    updateJob,
    getAdminJobs
 };