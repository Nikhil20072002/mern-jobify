import { login,logout,register } from "../controllers/authController.js";
import { Router } from "express";
import { validateLoginInput, validateUserInput } from "../middleware/validationMiddleware.js";
const router = Router()

router.route('/register').post(validateUserInput,register)
router.route('/login').post(validateLoginInput,login)
router.route('/logout').get(logout)

export default router