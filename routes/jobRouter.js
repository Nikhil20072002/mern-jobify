import { Router } from "express";
import { validateJobInput,validateIdParam } from "../middleware/validationMiddleware.js";
import {checkForTestUser} from '../middleware/authMiddleware.js'
const router = Router()

// import {getAllJobs,deleteJob,updateJob,findJob,createJob} from '../controllers/jobController_temp.js'
import { getAllJobs,deleteJob,updateJob,findJob,createJob, showStats } from "../controllers/JobController.js";

router.route('/').get(getAllJobs).post(checkForTestUser,validateJobInput,createJob)
router.route('/stats').get(showStats)
router.route('/:id').get(validateIdParam,findJob).patch(checkForTestUser,validateIdParam,validateJobInput,updateJob).delete(checkForTestUser,validateIdParam,deleteJob)

export default router