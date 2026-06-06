const applicationModel = require("../models/application.model");
const jobModel = require("../models/job.model");


const applyJob = async (req,res) => {
    try {
        const userId = req.user.id;
        const jobId = req.params.id;

        // check if job Id exists or not 
        if(!jobId){
            return res.status(400).send({
                success: false,
                message: 'Job id is required'
            });
        }
        
        // check if user already applied for this job
        const existingApplication = await applicationModel.findOne({job: jobId, applicant: userId});
        if(existingApplication){
            return res.status(400).send({
                success: false,
                message: 'You have already applied for this job'
            });
        }

        // check if job already exists 
        const job = await jobModel.findById(jobId);
        if(!job){
            return res.status(404).send({
                success: false,
                message: 'Job not found'
            });
        }

        // create a new application 
        const newApplication = await applicationModel.create({
            job: jobId,
            applicant: userId,
        });

        job.applicants.push(newApplication._id);
        await job.save();
        
        return res.status(201).send({
            success: true,
            message: 'Job applied successfully',
            application: newApplication
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.user.id;
        const applications = await applicationModel.find({applicant: userId}).populate({
            path:'job',
            populate:{
                path:'company',
                select:'name logo'
            }
        });
        if(!applications){
            return res.status(404).send({
                success: false,
                message: 'No applications found'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Applications fetched successfully',
            applications,
        });


    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;

        const applications = await applicationModel.find({job: jobId}).populate({
            path:'applicant',
            select:'name email'
        });

        if(!applications){
            return res.status(404).send({
                success: false,
                message: 'No applicants found'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Applicants fetched successfully',
            applications,
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

const updateStatus = async (req,res) => {
    try {
        const applications = await applicationModel.findById(req.params.id);
    const {status} = req.body;

    if (!applications ) {
        return res.status(404).send({
            success: false,
            message: 'Application not found'
        });
    }

    if (!status ) {
        return res.status(400).send({
            success: false,
            message: 'Status is required'
        });
    }
    applications.status = status.toLowerCase();
    await application.save();

    return res.status(200).send({
        success: true,
        message: 'Application status updated successfully',
        application,
    });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }

}

module.exports = { applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus
 };