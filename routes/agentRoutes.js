import express from 'express';
import { isAgentEnabled, startAgent, stopAgent } from '../agent/agent.js';
const router = express.Router();

router.get('/', (_req, res) => res.json({ enabled: isAgentEnabled() }));
router.post('/enable', (_req, res) => { startAgent(); res.json({ enabled: true }); });
router.post('/disable', (_req, res) => { stopAgent(); res.json({ enabled: false }); });

export default router;
