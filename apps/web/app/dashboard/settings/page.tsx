'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
	const [user, setUser] = useState<{ name: string; email: string } | null>(null);
	const [notifications, setNotifications] = useState({
		email: true,
		push: true,
		sms: false
	});
	const [privacy, setPrivacy] = useState({
		profileVisible: true,
		showEmail: false,
		showPhone: false
	});
	const [status, setStatus] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const userStr = localStorage.getItem('user');
			if (!userStr) {
				router.push('/');
				return;
			}
			try {
				setUser(JSON.parse(userStr));
			} catch (e) {
				router.push('/');
			}
		}
	}, [router]);

	const handleSave = () => {
		// Save settings (in real app, send to API)
		localStorage.setItem('settings', JSON.stringify({ notifications, privacy }));
		setStatus('✅ Settings saved successfully!');
		setTimeout(() => setStatus(null), 3000);
	};

	if (!user) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
				<div>Loading...</div>
			</div>
		);
	}

	return (
		<div style={{ minHeight: '100vh', background: '#f8fafc' }}>
			<header
				style={{
					background: 'white',
					borderBottom: '1px solid #e5e7eb',
					padding: '20px 32px',
					boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
				}}
			>
				<div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Link
						href="/"
						style={{
							fontSize: '24px',
							fontWeight: 800,
							background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							textDecoration: 'none'
						}}
					>
						🏘️ Neighborly
					</Link>
					<Link
						href="/dashboard"
						style={{
							color: '#6366f1',
							textDecoration: 'none',
							fontWeight: 500,
							fontSize: '15px'
						}}
					>
						← Back to Dashboard
					</Link>
				</div>
			</header>

			<div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 32px', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '32px' }}>
				<aside
					style={{
						background: 'white',
						borderRadius: '16px',
						padding: '24px',
						height: 'fit-content',
						boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
					}}
				>
					<nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
						{[
							{ href: '/dashboard', label: '📊 Dashboard' },
							{ href: '/dashboard/profile', label: '👤 Profile' },
							{ href: '/dashboard/bookings', label: '📅 Bookings' },
							{ href: '/dashboard/messages', label: '💬 Messages' },
							{ href: '/dashboard/settings', label: '⚙️ Settings' }
						].map((item) => (
							<Link
								key={item.href}
								href={item.href}
								style={{
									padding: '12px 16px',
									borderRadius: '12px',
									textDecoration: 'none',
									color: item.href === '/dashboard/settings' ? '#6366f1' : '#374151',
									background: item.href === '/dashboard/settings' ? '#6366f110' : 'transparent',
									fontWeight: item.href === '/dashboard/settings' ? 600 : 500,
									fontSize: '15px',
									transition: 'all 0.2s',
									display: 'flex',
									alignItems: 'center',
									gap: '12px'
								}}
								onMouseEnter={(e) => {
									if (item.href !== '/dashboard/settings') {
										e.currentTarget.style.background = '#f3f4f6';
										e.currentTarget.style.color = '#6366f1';
									}
								}}
								onMouseLeave={(e) => {
									if (item.href !== '/dashboard/settings') {
										e.currentTarget.style.background = 'transparent';
										e.currentTarget.style.color = '#374151';
									}
								}}
							>
								<span>{item.label.split(' ')[0]}</span>
								<span>{item.label.split(' ').slice(1).join(' ')}</span>
							</Link>
						))}
					</nav>
				</aside>

				<main>
					<div
						style={{
							background: 'white',
							borderRadius: '16px',
							padding: '40px',
							boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
						}}
					>
						<h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 8px 0', color: '#111827' }}>Settings</h1>
						<p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '16px' }}>
							Manage your account settings and preferences
						</p>

						{/* Notifications */}
						<div style={{ marginBottom: '40px' }}>
							<h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#111827' }}>Notifications</h2>
							<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
								{[
									{ key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
									{ key: 'push', label: 'Push Notifications', desc: 'Receive browser push notifications' },
									{ key: 'sms', label: 'SMS Notifications', desc: 'Receive text message updates' }
								].map((item) => (
									<div
										key={item.key}
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											padding: '16px',
											border: '2px solid #e5e7eb',
											borderRadius: '12px'
										}}
									>
										<div>
											<div style={{ fontWeight: 600, color: '#111827', marginBottom: '4px' }}>{item.label}</div>
											<div style={{ fontSize: '14px', color: '#6b7280' }}>{item.desc}</div>
										</div>
										<button
											type="button"
											onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
											style={{
												width: '48px',
												height: '24px',
												borderRadius: '12px',
												border: 'none',
												background: notifications[item.key as keyof typeof notifications] ? '#6366f1' : '#d1d5db',
												cursor: 'pointer',
												position: 'relative',
												transition: 'background 0.2s'
											}}
										>
											<div
												style={{
													width: '20px',
													height: '20px',
													borderRadius: '50%',
													background: 'white',
													position: 'absolute',
													top: '2px',
													left: notifications[item.key as keyof typeof notifications] ? '26px' : '2px',
													transition: 'left 0.2s',
													boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
												}}
											/>
										</button>
									</div>
								))}
							</div>
						</div>

						{/* Privacy */}
						<div style={{ marginBottom: '40px' }}>
							<h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#111827' }}>Privacy</h2>
							<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
								{[
									{ key: 'profileVisible', label: 'Profile Visibility', desc: 'Make your profile visible to other users' },
									{ key: 'showEmail', label: 'Show Email', desc: 'Display your email on your profile' },
									{ key: 'showPhone', label: 'Show Phone', desc: 'Display your phone number on your profile' }
								].map((item) => (
									<div
										key={item.key}
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											padding: '16px',
											border: '2px solid #e5e7eb',
											borderRadius: '12px'
										}}
									>
										<div>
											<div style={{ fontWeight: 600, color: '#111827', marginBottom: '4px' }}>{item.label}</div>
											<div style={{ fontSize: '14px', color: '#6b7280' }}>{item.desc}</div>
										</div>
										<button
											type="button"
											onClick={() => setPrivacy({ ...privacy, [item.key]: !privacy[item.key as keyof typeof privacy] })}
											style={{
												width: '48px',
												height: '24px',
												borderRadius: '12px',
												border: 'none',
												background: privacy[item.key as keyof typeof privacy] ? '#6366f1' : '#d1d5db',
												cursor: 'pointer',
												position: 'relative',
												transition: 'background 0.2s'
											}}
										>
											<div
												style={{
													width: '20px',
													height: '20px',
													borderRadius: '50%',
													background: 'white',
													position: 'absolute',
													top: '2px',
													left: privacy[item.key as keyof typeof privacy] ? '26px' : '2px',
													transition: 'left 0.2s',
													boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
												}}
											/>
										</button>
									</div>
								))}
							</div>
						</div>

						{/* Account Actions */}
						<div style={{ marginBottom: '40px' }}>
							<h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#111827' }}>Account Actions</h2>
							<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
								<button
									type="button"
									style={{
										padding: '12px 20px',
										border: '2px solid #e5e7eb',
										borderRadius: '12px',
										background: 'white',
										color: '#374151',
										fontWeight: 500,
										cursor: 'pointer',
										textAlign: 'left',
										transition: 'all 0.2s'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.borderColor = '#6366f1';
										e.currentTarget.style.background = '#f3f4f6';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.borderColor = '#e5e7eb';
										e.currentTarget.style.background = 'white';
									}}
								>
									🔒 Change Password
								</button>
								<button
									type="button"
									style={{
										padding: '12px 20px',
										border: '2px solid #e5e7eb',
										borderRadius: '12px',
										background: 'white',
										color: '#dc2626',
										fontWeight: 500,
										cursor: 'pointer',
										textAlign: 'left',
										transition: 'all 0.2s'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.borderColor = '#dc2626';
										e.currentTarget.style.background = '#fee2e2';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.borderColor = '#e5e7eb';
										e.currentTarget.style.background = 'white';
									}}
								>
									🗑️ Delete Account
								</button>
							</div>
						</div>

						{status && (
							<div
								style={{
									padding: '12px 16px',
									borderRadius: '12px',
									background: status.includes('✅') ? '#d1fae5' : '#fee2e2',
									color: status.includes('✅') ? '#065f46' : '#991b1b',
									fontSize: '14px',
									marginBottom: '24px'
								}}
							>
								{status}
							</div>
						)}

						<button
							type="button"
							onClick={handleSave}
							style={{
								padding: '14px 24px',
								background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
								color: 'white',
								border: 'none',
								borderRadius: '12px',
								fontSize: '16px',
								fontWeight: 600,
								cursor: 'pointer',
								transition: 'all 0.3s',
								boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'translateY(-2px)';
								e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
							}}
						>
							Save Settings
						</button>
					</div>
				</main>
			</div>
		</div>
	);
}




