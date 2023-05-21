import express from 'express'
import { storeToken } from '../controller/tokenController.js';

const router = express.Router();

router.post('/store', storeToken)

export default router