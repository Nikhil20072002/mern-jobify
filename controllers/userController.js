import { StatusCodes } from "http-status-codes";
import User from '../models/userModel.js'
import Job from '../models/JobModel.js'
import {UnauthorizedError} from '../errors/customError.js'
import cloudinary from 'cloudinary'
import {promises as fs} from 'fs'

export const getCurrentUser = async(req,res)=>{
    const user = await User.findById(req.user.userId)
    user.toJSON()
    res.status(StatusCodes.OK).send({user})
}

export const getApplicationStats = async(req,res)=>{
    const users = await User.countDocuments()
    const jobs = await Job.countDocuments()
    const role = req.user.role

    if(role==='admin'){
        return res.status(StatusCodes.OK).json({users,jobs})
    }
    throw new UnauthorizedError('not authorized for this route')
}

export const updateUser = async(req,res)=>{
    const newUser = {...req.body}
    delete newUser.password;

    if(req.file){
        const response = await cloudinary.v2.uploader.upload(req.file.path);
        const res = await fs.unlink(req.file.path)
        
        newUser.avatar = response.secure_url
        newUser.avatarPublicId = response.public_id
    }
    const updateUser = await User.findByIdAndUpdate(req.user.userId,newUser);
    if(req.file && updateUser.avatarPublicId){
        await cloudinary.v2.uploader.destroy(updateUser.avatarPublicId)
    }
    res.status(StatusCodes.OK).json({message:"updated user"})
}