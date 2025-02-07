import { nanoid } from "nanoid";
import Job from "../models/JobModel.js";
import 'express-async-errors';
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customError.js";
import mongoose from "mongoose";
import day from 'dayjs'
import { monthMap } from "../utils/constants.js";

export const getAllJobs = async (req, res) => {
    const {search,jobStatus,jobType,sort} = req.query
    const queryObj = {
        createdBy: req.user.userId
    }   
    if(search){
       queryObj.$or = [
        {position:{$regex:search,$options:'i'}},
        {company:{$regex:search,$options:'i'}}
       ]
    }

    if(jobStatus && jobStatus!=='all'){
        queryObj.jobStatus = jobStatus
    }
    if(jobType && jobType!=='all'){
        queryObj.jobType = jobType
    }
    const sortOptions = {
        newest:'-createdAt',
        oldest:'createdAt',
        'a-z':'position',
        'z-a':'-position'
    }

    const sortKey = sortOptions[sort] || sortOptions.newest
    
    //pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit


    const jobs = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit)

    const totalJobs = await Job.countDocuments(queryObj)

    const noOfPages = Math.ceil(totalJobs/limit)


    res.status(StatusCodes.OK).json({totalJobs,noOfPages,currentPage:page,jobs})
}

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}
export const findJob = async (req, res) => {
    const job = await Job.findById(req.params.id)
    res.status(StatusCodes.OK).send(job)
}

export const updateJob = async (req, res) => {
    let updateJob = await Job.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json({ message: "Job edited successfully", updateJob })
}

export const deleteJob = async (req, res) => {
    const removedJob = await Job.findByIdAndDelete({ _id: req.params.id })
    return res.status(StatusCodes.OK).json({ message: "Job deleted", job: removedJob })
}

export const showStats = async (req, res) => {


    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$jobStatus', count: { $sum: 1 } } }
    ])

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr
        acc[title] = count
        return acc;
    }, {})

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0
    }

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                count: { $sum: 1 }
            },
        },
        {$sort:{'_id.year':-1,'_id.month':-1}},
        {$limit:6}
    ])

    let myCustomLogicFormonthlyApplicationResult = monthlyApplications.reduce((acc,curr)=>{
        const year = curr._id.year.toString()
        const modifiedYear = year.substring(year.length-2,year.length);
        const month = curr._id.month 
        const date = monthMap[month]+' '+modifiedYear
        const count = curr.count
        acc.push({date,count})
        return acc
    },[])

    monthlyApplications = monthlyApplications.map((item)=>{
        const {_id:{year,month},count} = item
        const date = day().month(month-1).year(year).format('MMM YY')
        return {date,count}
    }).reverse()

    res.status(StatusCodes.OK).json({ defaultStats,monthlyApplications})
}