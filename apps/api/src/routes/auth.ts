import { Router } from 'express';
import { db } from '../db';

export const authRouter = Router();

authRouter.post('/login', (req, res) => {
	const { email, password } = req.body ?? {};
	if (!email) {
		return res.status(400).json({ error: 'Email is required' });
	}
	const user = db.users.find((u) => u.email === email);
	if (!user) {
		return res.status(401).json({ error: 'Invalid email or password' });
	}
	// In a real app, verify password hash here
	// For demo: any password works if user exists
	// Placeholder session token
	return res.json({ 
		token: `fake-${user.id}`, 
		user,
		message: 'Login successful'
	});
});

authRouter.post('/register', (req, res) => {
	const { name, email, password, role } = req.body ?? {};
	if (!name || !email || !password || !role) {
		return res.status(400).json({ error: 'Missing required fields: name, email, password, and role' });
	}
	if (password.length < 6) {
		return res.status(400).json({ error: 'Password must be at least 6 characters' });
	}
	if (db.users.some((u) => u.email === email)) {
		return res.status(409).json({ error: 'Email already exists' });
	}
	const user = { id: db.genId(), name, email, role };
	db.users.push(user);
	// In a real app, hash the password before storing
	return res.status(201).json({ 
		user,
		message: 'Account created successfully'
	});
});


