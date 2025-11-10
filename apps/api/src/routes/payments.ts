import { Router } from 'express';

export const paymentsRouter = Router();

paymentsRouter.post('/intent', (req, res) => {
	const { amount, currency } = req.body ?? {};
	if (!amount || !currency) return res.status(400).json({ error: 'Missing fields' });
	// Placeholder for Stripe Payment Intent
	res.json({ clientSecret: 'pi_fake_secret', amount, currency });
});

paymentsRouter.post('/payout', (req, res) => {
	const { sitterId, amount } = req.body ?? {};
	if (!sitterId || !amount) return res.status(400).json({ error: 'Missing fields' });
	// Placeholder for Stripe Connect Payout
	res.json({ transferId: 'tr_fake', sitterId, amount });
});


