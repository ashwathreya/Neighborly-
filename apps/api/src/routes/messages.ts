import { Router } from 'express';

type Message = { id: string; from: string; to: string; text: string; createdAt: string };
const messages: Message[] = [];
let counter = 1;

export const messagesRouter = Router();

messagesRouter.get('/', (_req, res) => {
	res.json(messages.slice(-100));
});

messagesRouter.post('/', (req, res) => {
	const { from, to, text } = req.body ?? {};
	if (!from || !to || !text) return res.status(400).json({ error: 'Missing fields' });
	const msg: Message = { id: String(counter++), from, to, text, createdAt: new Date().toISOString() };
	messages.push(msg);
	res.status(201).json(msg);
});


