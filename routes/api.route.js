import express from 'express';
import { getCurrentDate, getDate } from '../controllers/api.controller.js';

const router = express.Router();

router.get('/', getCurrentDate);
router.get('/:date', getDate);

export default router;
