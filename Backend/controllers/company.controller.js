const companyModel = require("../models/company.model");

const registerCompany = async (req,res) => {
   
    try {
        const {companyName} = req.body;

    if(!companyName){
        return res.status(400).send({
            success: false,
            message: 'Please provide company name',
        });
    }

    let company = await companyModel.findOne({ name : companyName });

    if(company){
        return res.status(409).send({
            success: false,
            message: 'Company already exists with this name',
        });
    }

    company = await companyModel.create({
        name: companyName,
        userId: req.user.id
    });

    return res.status(201).send({
        success: true,
        message: 'Company registered successfully',
        company,
    });
    
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

const getcompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await companyModel.findById(companyId);
        if(!company){
            return res.status(404).send({
                success: false,
                message: 'Company not found'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Company fetched successfully',
            company,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

const getCompany = async (req,res) => {
    try {
        const userId = req.user.id;
        const company = await companyModel.findOne({ userId : userId });
        if(!company){
            return res.status(404).send({
                success: false,
                message: 'Company not found'
            });
        }
        
        return res.status(200).send({
            success: true,
            message: 'Company fetched successfully',
            company,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

const updateCompany = async (req, res) =>  {
    try {
        const {name, description , website,location} = req.body;
        const file = req.file;

        const companyId = req.params.id;
        const updatedData = {name, description , website,location};
        const company = await companyModel.findByIdAndUpdate(companyId, updatedData, { new: true });
        if(!company){
            return res.status(404).send({
                success: false,
                message: 'Company not found'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Company updated successfully',
            company,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await companyModel.findByIdAndDelete(companyId);
        if(!company){
            return res.status(404).send({
                success: false,
                message: 'Company not found'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Company deleted successfully',
            company,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

module.exports = { registerCompany,
                    getcompanyById,
                    getCompany,
                    updateCompany,
                    deleteCompany
                };