import { Router } from 'express';
import { db } from '../db';

export const sittersRouter = Router();

sittersRouter.get('/', (req, res) => {
	const { location, petType } = req.query;
	// location ignored for now; petType filters specialties
	const results = db.sitters.filter((s) => {
		if (!petType) return true;
		return s.specialties.includes(String(petType));
	});
	res.json(results);
});

sittersRouter.get('/:id', (req, res) => {
	const s = db.sitters.find((x) => x.id === req.params.id);
	if (!s) return res.status(404).json({ error: 'Not found' });
	return res.json(s);
});


