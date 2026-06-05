const User = require("../models/user.model");
const jwt = require('jsonwebtoken');


const registerUser = async (req,res) => {

    try {
        const {fullname,email,password,role,phoneNumber} = req.body;

    if(!fullname || !email || !password || !role || !phoneNumber){
        return res.status(400).send({
            message : "All fields are required",
            success : false
        })
    }

    const user = await User.findOne({email});

    if(user){
        return res.status(400).send({
            message : "User already exists",
            success : false
        })
    }

    // hash password here

    const newUser  = await User.create({
        fullname,
        email,
        password,
        role,
        phoneNumber
    });

    return res.status(200).send({
        message : "User registered successfully",
        success : true,
        user : newUser
    });

    } catch (error) {
        res.status(500).send({
            message : error.message,
            success : false
        });
    }
}

const loginUser  = async (req,res) => {

    try {
        const{email,password,role} = req.body;

        if(!email || !password || !role){
            return res.status(400).send({
                message : "All fields are required",
                success : false
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).send({
                message : "User does not exist",
                success : false
            });
        }

        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).send({
                message : "Invalid credentials",
                success : false
            })
        }

        if(user.role !== role){
            return res.status(400).send({
                message : "User not found with this role",
                success : false
            })
        }

        const accessToken = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        const refreshToken = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "7d"
            }
        );

        user.refreshToken = refreshToken;
        await user.save();

        res
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .status(200)
        .send({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).send({
            message : error.message,
            success : false
        });
    }
}

const refreshAccessToken = async (req, res) => {
    try {

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).send({
                success: false,
                message: "Refresh token missing"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const user = await User.findById(decoded.userId);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).send({
                success: false,
                message: "Invalid refresh token"
            });
        }

        const accessToken = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        return res.status(200).send({
            success: true,
            message: "Access token refreshed"
        });

    } catch (error) {
        return res.status(401).send({
            success: false,
            message: "Invalid refresh token"
        });
    }
};

const logoutUser = async (req, res) => {

   try {
     const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {

        const user = await User.findOne({
            refreshToken
        });

        if (user) {
            user.refreshToken = null;
            await user.save();
        }
    }

    res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .status(200)
        .send({
            success: true,
            message: "Logged out successfully"
        });
   } catch (error) {
    return res.status(500).send({
        message : error.message,
        success : false
    });
   }
};

const updateUser = async (req,res) => {
   try {
     const {fullname , email , phoneNumber , bio , skills } = req.body;

    const file =  req.file;

    if(!fullname && !email && !phoneNumber && !bio && !skills && !file){
        return res.status(400).send({
            message : "Please provide atleast one field to update",
            success : false
        })
    }

    const skillsArray = skills ? skills.split(",") : undefined;

    const userId = req.user.id;
    let user = await User.findByIdAndUpdate(userId,{
        fullname,
        email,
        phoneNumber,
        bio,
        skills : skillsArray,
        avatar : file?.path
    },{new : true});
    
    user = await user.populate("jobs");

    if(!user){
        return res.status(400).send({
            message : "User not found",
            success : false
        })
    }

    return res.status(200).send({
        message : "User updated successfully",
        success : true,
        user
    })

   } catch (error) {
        return res.status(500).send({
            message : error.message,
            success : false
        });
   }

}

 module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    updateUser
}