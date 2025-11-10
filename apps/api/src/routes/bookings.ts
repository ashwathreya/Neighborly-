import { Router } from 'express';
import { db } from '../db';

export const bookingsRouter = Router();

bookingsRouter.get('/quote', (req, res) => {
	const days = Number(req.query.days ?? 1);
	const baseRate = Number(req.query.baseRate ?? 40);
	const subtotal = days * baseRate;
	const serviceFee = Math.max(2, Math.round(subtotal * 0.1 * 100) / 100);
	const taxes = Math.round(subtotal * 0.07 * 100) / 100;
	const total = Math.round((subtotal + serviceFee + taxes) * 100) / 100;
	const policy = {
		cancellation: 'Full refund up to 24h before start, then 50%',
		fees: { serviceFee, taxes }
	};
	res.json({ days, baseRate, subtotal, serviceFee, taxes, total, policy });
});

bookingsRouter.post('/', (req, res) => {
	const { ownerId, sitterId, startDate, endDate, total } = req.body ?? {};
	if (!ownerId || !sitterId || !startDate || !endDate || typeof total !== 'number') {
		return res.status(400).json({ error: 'Missing fields' });
	}
	const booking = {
		id: db.genId(),
		ownerId,
		sitterId,
		startDate,
		endDate,
		total,
		status: 'pending' as const
	};
	db.bookings.push(booking);
	res.status(201).json(booking);
});


