import express from 'express'
import { 
    authUser,
    registerUser,
    logoutUser,
    updateUser,
    getUser
} from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/auth', authUser)
router.post('/register', registerUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getUser).put(protect, updateUser)

export default router