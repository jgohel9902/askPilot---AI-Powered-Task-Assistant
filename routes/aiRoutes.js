import express from 'express';
import { aiSuggest } from '../controllers/aiController.js';

const router = express.Router();

router.post('/suggest', aiSuggest);

export default router;
