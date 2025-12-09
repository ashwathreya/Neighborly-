import { Router } from 'express';
import { db } from '../db';

export const authRouter = Router();

// OAuth provider configuration (in production, these come from environment variables)
const OAUTH_CONFIG = {
	google: {
		clientId: process.env.GOOGLE_CLIENT_ID || 'demo-google-client-id',
		clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo-google-secret',
		enabled: true
	},
	facebook: {
		appId: process.env.FACEBOOK_APP_ID || 'demo-facebook-app-id',
		appSecret: process.env.FACEBOOK_APP_SECRET || 'demo-facebook-secret',
		enabled: true
	},
	apple: {
		clientId: process.env.APPLE_CLIENT_ID || 'demo-apple-client-id',
		enabled: true
	}
};

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

// OAuth initiation endpoints
authRouter.get('/oauth/:provider', (req, res) => {
	const { provider } = req.params;
	const { redirectUri } = req.query;

	if (!['google', 'facebook', 'apple'].includes(provider)) {
		return res.status(400).json({ error: 'Invalid OAuth provider' });
	}

	// In production, this would redirect to the actual OAuth provider
	// For demo, we'll simulate the OAuth flow
	const state = Buffer.from(JSON.stringify({ redirectUri: redirectUri || 'http://localhost:3000' })).toString('base64');
	
	// Store state for verification (in production, use Redis or session)
	// For demo, we'll return a mock OAuth URL
	const mockAuthUrl = `${req.protocol}://${req.get('host')}/auth/oauth/${provider}/callback?state=${state}&code=mock-auth-code`;
	
	// In production, redirect to actual OAuth provider:
	// Google: https://accounts.google.com/o/oauth2/v2/auth?...
	// Facebook: https://www.facebook.com/v18.0/dialog/oauth?...
	// Apple: https://appleid.apple.com/auth/authorize?...
	
	res.json({ 
		authUrl: mockAuthUrl,
		message: 'OAuth flow initiated. In production, this redirects to the provider.'
	});
});

// OAuth callback handler
authRouter.get('/oauth/:provider/callback', async (req, res) => {
	const { provider } = req.params;
	const { code, state } = req.query;

	if (!code || !state) {
		return res.status(400).json({ error: 'Missing OAuth parameters' });
	}

	try {
		// Decode state
		const stateData = JSON.parse(Buffer.from(String(state), 'base64').toString());
		const redirectUri = stateData.redirectUri || 'http://localhost:3000';

		// In production, exchange code for access token with OAuth provider
		// For demo, we'll create a mock user from the provider
		let userData: { name: string; email: string; providerId: string };

		switch (provider) {
			case 'google':
				// Mock Google user data
				userData = {
					name: 'Google User',
					email: `google.user.${Date.now()}@example.com`,
					providerId: `google_${Date.now()}`
				};
				break;
			case 'facebook':
				// Mock Facebook user data
				userData = {
					name: 'Facebook User',
					email: `facebook.user.${Date.now()}@example.com`,
					providerId: `facebook_${Date.now()}`
				};
				break;
			case 'apple':
				// Mock Apple user data
				userData = {
					name: 'Apple User',
					email: `apple.user.${Date.now()}@example.com`,
					providerId: `apple_${Date.now()}`
				};
				break;
			default:
				return res.status(400).json({ error: 'Invalid provider' });
		}

		// Check if user exists by email or create new user
		let user = db.users.find((u) => u.email === userData.email);
		
		if (!user) {
			// Create new user from OAuth
			user = {
				id: db.genId(),
				name: userData.name,
				email: userData.email,
				role: 'owner' // Default role, can be changed later
			};
			db.users.push(user);
		}

		// Generate token
		const token = `oauth-${provider}-${user.id}`;

		// Redirect to frontend with token
		const redirectUrl = new URL(redirectUri);
		redirectUrl.searchParams.set('token', token);
		redirectUrl.searchParams.set('user', encodeURIComponent(JSON.stringify(user)));
		
		res.redirect(redirectUrl.toString());
	} catch (error: any) {
		console.error('OAuth callback error:', error);
		res.status(500).json({ error: 'OAuth authentication failed' });
	}
});

// OAuth user info endpoint (for frontend to get user after redirect)
authRouter.get('/oauth/user', (req, res) => {
	const { token } = req.query;
	
	if (!token || typeof token !== 'string') {
		return res.status(401).json({ error: 'Invalid token' });
	}

	// Extract user ID from token (in production, verify token properly)
	const userId = token.split('-').pop();
	const user = db.users.find((u) => u.id === userId);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	res.json({ user, token });
});


