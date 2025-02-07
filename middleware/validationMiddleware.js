import { body, param, validationResult } from 'express-validator';
import { BadRequestError,NotFoundError, UnauthorizedError } from '../errors/customError.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import { validatePassword } from '../utils/common.js';
import User from '../models/userModel.js';

const withValidationErrors = (validateValues) => {
    return [validateValues,
        (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                if(errorMessages[0].startsWith("no job")){
                    throw new NotFoundError(errorMessages)
                }
                if(errorMessages[0].startsWith("not authorized")){
                    throw new UnauthorizedError(errorMessages)
                }
                throw new BadRequestError(errorMessages)
            }
            next();
        },
    ];
};

export const validateTest = withValidationErrors(
    [
        body('name').trim().notEmpty().withMessage('Name required').isLength({ min: 3, max: 50 }).withMessage('name must be at between 3 and 50 characters long').trim()
    ]
)


export const validateJobInput = withValidationErrors(
    [
        body('company').trim().notEmpty().withMessage('Company is required'),
        body('position').trim().notEmpty().withMessage('position is required'),
        body('jobLocation').trim().notEmpty().withMessage('location is required'),
        body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('invalid status value'),
        body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid type value')
    ]
)

export const validateIdParam = withValidationErrors([
    param('id')
        .custom(async (value,{req}) => {
            const isValidId = mongoose.Types.ObjectId.isValid(value)
            if (!isValidId) {
                throw new BadRequestError('Invalid MongoDB id')
            }
            const job = await Job.findById(value)
            if (!job) {
                throw new NotFoundError(`no job found with id : ${value}`)
            }
            const isAdmin = req.user.role === 'admin'
            const isOwner = req.user.userId === job.createdBy.toString()    
            
            
            if(!isAdmin && !isOwner){
                throw new UnauthorizedError('not authorized to access this route')
            }
            
        })
])


// body('password').trim().notEmpty().withMessage('Password is required').custom((value)=>{
    //     const validateMessage = validatePassword(value)
    //     if(validateMessage.startsWith("❌")){
    //         throw new BadRequestError(validateMessage);
    //     }
    // })
export const validateUserInput = withValidationErrors([
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('password').trim().notEmpty().withMessage('Password is required').isLength({min:5,max:20}),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage("Invalid email format")
    .custom(async(email)=>{
        const user = await User.findOne({email});
        if(user){
            throw new BadRequestError('email already registered')
        }
    }),
    body('lastName').trim().notEmpty().withMessage('lastname is required')
])


export const validateLoginInput = withValidationErrors([
    body('password').trim().notEmpty().withMessage('password is required'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage("Invalid email format")
    .custom((email)=>{
        return User.findOne({email})
    })
    
])

export const validateUpdateUserInput = withValidationErrors([
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage("Invalid email format")
    .custom(async(email,{req})=>{
        const user = await User.findOne({email});
        if(user && user._id.toString()!==req.user.userId){
            throw new BadRequestError('email already exists');
        }
    }),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('lastName').trim().notEmpty().withMessage('lastname is required')

])


