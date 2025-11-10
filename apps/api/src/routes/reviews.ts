import { Router } from 'express';
import { db } from '../db';

export const reviewsRouter = Router();

reviewsRouter.post('/', (req, res) => {
	const { bookingId, reviewerId, rating, comment } = req.body ?? {};
	if (!bookingId || !reviewerId || typeof rating !== 'number') {
		return res.status(400).json({ error: 'Missing fields' });
	}
	const review = { id: db.genId(), bookingId, reviewerId, rating, comment: comment ?? '' };
	db.reviews.push(review);
	// Attach to sitter profile if found via booking
	const booking = db.bookings.find((b) => b.id === bookingId);
	if (booking) {
		const sitter = db.sitters.find((s) => s.id === booking.sitterId);
		if (sitter) {
			sitter.reviews = sitter.reviews ?? [];
			sitter.reviews.push({ ...review, reviewerName: db.users.find((u) => u.id === reviewerId)?.name } as any);
			const avg =
				(sitter.reviews.reduce((sum, r: any) => sum + (r.rating ?? 0), 0) / sitter.reviews.length) || 0;
			sitter.rating = Math.round(avg * 10) / 10;
		}
	}
	res.status(201).json(review);
});


