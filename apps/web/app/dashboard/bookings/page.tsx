'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Booking = {
	id: string;
	client: string;
	service: string;
	date: string;
	time: string;
	status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
	amount: string;
	avatar: string;
	location: string;
	duration: string;
	notes?: string;
};

export default function BookingsPage() {
	const [user, setUser] = useState<{ name: string; email: string; role: string; viewMode?: string } | null>(null);
	const router = useRouter();

	// Sample bookings data
	const [bookings] = useState<Booking[]>([
		{
			id: '1',
			client: 'Sarah Johnson',
			service: 'Pet Sitting',
			date: 'Dec 20, 2024',
			time: '9:00 AM - 5:00 PM',
			status: 'confirmed',
			amount: '$120',
			avatar: '👩',
			location: '123 Main St, Downtown',
			duration: '8 hours',
			notes: 'Two dogs - Max (Golden Retriever) and Bella (Labrador). Need feeding twice daily.'
		},
		{
			id: '2',
			client: 'Mike Chen',
			service: 'Dog Walking',
			date: 'Dec 22, 2024',
			time: '3:00 PM - 4:00 PM',
			status: 'confirmed',
			amount: '$35',
			avatar: '👨',
			location: '456 Oak Ave, Midtown',
			duration: '1 hour',
			notes: 'Medium-sized dog, friendly. Prefers longer walks in the park.'
		},
		{
			id: '3',
			client: 'Emma Wilson',
			service: 'Pet Care',
			date: 'Dec 25, 2024',
			time: '10:00 AM - 6:00 PM',
			status: 'pending',
			amount: '$150',
			avatar: '👩‍🦰',
			location: '789 Pine Rd, Uptown',
			duration: '8 hours',
			notes: 'Multiple cats, requires daily litter box cleaning and feeding.'
		},
		{
			id: '4',
			client: 'David Martinez',
			service: 'Pet Sitting',
			date: 'Dec 18, 2024',
			time: '8:00 AM - 6:00 PM',
			status: 'completed',
			amount: '$140',
			avatar: '👨‍🦱',
			location: '321 Elm St, Riverside',
			duration: '10 hours',
			notes: 'Completed successfully. Client left a 5-star review!'
		},
		{
			id: '5',
			client: 'Lisa Anderson',
			service: 'Dog Walking',
			date: 'Dec 19, 2024',
			time: '2:00 PM - 3:00 PM',
			status: 'completed',
			amount: '$30',
			avatar: '👩',
			location: '654 Maple Dr, Parkview',
			duration: '1 hour'
		},
		{
			id: '6',
			client: 'Robert Taylor',
			service: 'Pet Sitting',
			date: 'Dec 27, 2024',
			time: '9:00 AM - 5:00 PM',
			status: 'confirmed',
			amount: '$125',
			avatar: '👨',
			location: '987 Cedar Ln, Hilltop',
			duration: '8 hours'
		},
		{
			id: '7',
			client: 'Jennifer Lee',
			service: 'Dog Walking',
			date: 'Dec 21, 2024',
			time: '4:00 PM - 5:00 PM',
			status: 'confirmed',
			amount: '$40',
			avatar: '👩‍🦱',
			location: '147 Birch Way, Lakeside',
			duration: '1 hour',
			notes: 'Large dog, very energetic. Needs vigorous exercise.'
		},
		{
			id: '8',
			client: 'James Brown',
			service: 'Pet Care',
			date: 'Dec 15, 2024',
			time: '10:00 AM - 4:00 PM',
			status: 'completed',
			amount: '$100',
			avatar: '👨‍🦳',
			location: '258 Spruce St, Downtown',
			duration: '6 hours'
		}
	]);

	const [filterStatus, setFilterStatus] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const userStr = localStorage.getItem('user');
			if (!userStr) {
				router.push('/');
				return;
			}
			try {
				const userData = JSON.parse(userStr);
				setUser(userData);
			} catch (e) {
				console.error('Error parsing user:', e);
				router.push('/');
			}
		}
	}, [router]);

	if (!user) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
				<div>Loading...</div>
			</div>
		);
	}

	const filteredBookings = bookings.filter((booking) => {
		const matchesStatus = filterStatus === null || booking.status === filterStatus;
		const matchesSearch = searchTerm === '' || 
			booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
			booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
			booking.location.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesStatus && matchesSearch;
	});

	const statusCounts = bookings.reduce((acc, booking) => {
		acc[booking.status] = (acc[booking.status] || 0) + 1;
		return acc;
	}, {} as Record<string, number>);

	const totalEarnings = bookings
		.filter(b => b.status === 'completed' || b.status === 'confirmed')
		.reduce((sum, b) => sum + parseInt(b.amount.replace('$', '')), 0);

	return (
		<>
			<style jsx global>{`
				@keyframes gradientShift {
					0% { background-position: 0% 50%; }
					50% { background-position: 100% 50%; }
					100% { background-position: 0% 50%; }
				}
			`}</style>
			<div style={{ minHeight: '100vh', background: '#f8fafc' }}>
				{/* Header */}
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
								backgroundSize: '200% 200%',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								backgroundClip: 'text',
								textDecoration: 'none',
								display: 'flex',
								alignItems: 'center',
								gap: '8px'
							}}
						>
							<span style={{ 
								fontSize: '28px',
								display: 'inline-block',
								WebkitBackgroundClip: 'initial',
								WebkitTextFillColor: 'initial',
								backgroundClip: 'initial'
							}}>🏘️</span>
							<span>Neighborly</span>
						</Link>
						<Link
							href="/"
							style={{
								color: '#6366f1',
								textDecoration: 'none',
								fontWeight: 500,
								fontSize: '15px'
							}}
						>
							← Back to Home
						</Link>
					</div>
				</header>

				<div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 32px', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '32px' }}>
					{/* Sidebar */}
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
								{ href: '/dashboard', label: '📊 Dashboard', icon: '📊' },
								{ href: '/dashboard/profile', label: '👤 Profile', icon: '👤' },
								{ href: '/dashboard/bookings', label: '📅 Bookings', icon: '📅', active: true },
								{ href: '/dashboard/messages', label: '💬 Messages', icon: '💬' },
								{ href: '/dashboard/reviews', label: '⭐ Reviews', icon: '⭐' },
								{ href: '/dashboard/settings', label: '⚙️ Settings', icon: '⚙️' }
							].map((item) => (
								<Link
									key={item.href}
									href={item.href}
									style={{
										padding: '12px 16px',
										borderRadius: '12px',
										textDecoration: 'none',
										color: (item as any).active ? '#6366f1' : '#374151',
										background: (item as any).active ? '#6366f110' : 'transparent',
										fontWeight: (item as any).active ? 600 : 500,
										fontSize: '15px',
										transition: 'all 0.2s',
										display: 'flex',
										alignItems: 'center',
										gap: '12px'
									}}
									onMouseEnter={(e) => {
										if (!(item as any).active) {
											e.currentTarget.style.background = '#f3f4f6';
											e.currentTarget.style.color = '#6366f1';
										}
									}}
									onMouseLeave={(e) => {
										if (!(item as any).active) {
											e.currentTarget.style.background = 'transparent';
											e.currentTarget.style.color = '#374151';
										}
									}}
								>
									<span>{item.icon}</span>
									<span>{item.label.replace(/^[^\s]+\s/, '')}</span>
								</Link>
							))}
						</nav>
					</aside>

					{/* Main Content */}
					<main>
						<div
							style={{
								background: 'white',
								borderRadius: '16px',
								padding: '40px',
								boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
							}}
						>
							{/* Header Section */}
							<div style={{ marginBottom: '32px' }}>
								<h1
									style={{
										fontSize: '36px',
										fontWeight: 800,
										margin: '0 0 8px 0',
										color: '#111827'
									}}
								>
									My Bookings
								</h1>
								<p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
									Manage all your service bookings and appointments
								</p>
							</div>

							{/* Stats Overview */}
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
									gap: '20px',
									marginBottom: '40px'
								}}
							>
								<div
									style={{
										padding: '24px',
										background: 'linear-gradient(135deg, #6366f120 0%, #6366f110 100%)',
										borderRadius: '16px',
										border: '2px solid #6366f130',
										textAlign: 'center'
									}}
								>
									<div style={{ fontSize: '48px', fontWeight: 800, color: '#6366f1', marginBottom: '8px', lineHeight: '1' }}>
										{statusCounts['confirmed'] || 0}
									</div>
									<div style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600 }}>Confirmed</div>
								</div>
								<div
									style={{
										padding: '24px',
										background: 'linear-gradient(135deg, #f59e0b20 0%, #f59e0b10 100%)',
										borderRadius: '16px',
										border: '2px solid #f59e0b30',
										textAlign: 'center'
									}}
								>
									<div style={{ fontSize: '48px', fontWeight: 800, color: '#f59e0b', marginBottom: '8px', lineHeight: '1' }}>
										{statusCounts['pending'] || 0}
									</div>
									<div style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600 }}>Pending</div>
								</div>
								<div
									style={{
										padding: '24px',
										background: 'linear-gradient(135deg, #10b98120 0%, #10b98110 100%)',
										borderRadius: '16px',
										border: '2px solid #10b98130',
										textAlign: 'center'
									}}
								>
									<div style={{ fontSize: '48px', fontWeight: 800, color: '#10b981', marginBottom: '8px', lineHeight: '1' }}>
										{statusCounts['completed'] || 0}
									</div>
									<div style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600 }}>Completed</div>
								</div>
								<div
									style={{
										padding: '24px',
										background: 'linear-gradient(135deg, #8b5cf620 0%, #8b5cf610 100%)',
										borderRadius: '16px',
										border: '2px solid #8b5cf630',
										textAlign: 'center'
									}}
								>
									<div style={{ fontSize: '32px', fontWeight: 800, color: '#8b5cf6', marginBottom: '8px', lineHeight: '1' }}>
										${totalEarnings}
									</div>
									<div style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600 }}>Total Earnings</div>
								</div>
							</div>

							{/* Filters */}
							<div
								style={{
									display: 'flex',
									gap: '16px',
									marginBottom: '32px',
									flexWrap: 'wrap',
									alignItems: 'center'
								}}
							>
								<input
									type="text"
									placeholder="Search bookings..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									style={{
										flex: '1',
										minWidth: '200px',
										padding: '12px 16px',
										border: '2px solid #e5e7eb',
										borderRadius: '12px',
										fontSize: '15px',
										transition: 'border-color 0.2s'
									}}
									onFocus={(e) => {
										e.currentTarget.style.borderColor = '#6366f1';
										e.currentTarget.style.outline = 'none';
									}}
									onBlur={(e) => {
										e.currentTarget.style.borderColor = '#e5e7eb';
									}}
								/>
								<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
									<button
										onClick={() => setFilterStatus(null)}
										style={{
											padding: '10px 16px',
											border: `2px solid ${filterStatus === null ? '#6366f1' : '#e5e7eb'}`,
											borderRadius: '10px',
											background: filterStatus === null ? '#6366f1' : 'white',
											color: filterStatus === null ? 'white' : '#374151',
											fontWeight: 600,
											fontSize: '14px',
											cursor: 'pointer',
											transition: 'all 0.2s',
											fontFamily: 'inherit'
										}}
									>
										All
									</button>
									{['confirmed', 'pending', 'completed', 'cancelled'].map((status) => (
										<button
											key={status}
											onClick={() => setFilterStatus(filterStatus === status ? null : status)}
											style={{
												padding: '10px 16px',
												border: `2px solid ${filterStatus === status ? '#6366f1' : '#e5e7eb'}`,
												borderRadius: '10px',
												background: filterStatus === status ? '#6366f1' : 'white',
												color: filterStatus === status ? 'white' : '#374151',
												fontWeight: 600,
												fontSize: '14px',
												cursor: 'pointer',
												transition: 'all 0.2s',
												fontFamily: 'inherit',
												textTransform: 'capitalize'
											}}
										>
											{status}
										</button>
									))}
								</div>
							</div>

							{/* Bookings List */}
							<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
								{filteredBookings.length === 0 ? (
									<div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
										<div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
										<div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No bookings found</div>
										<div style={{ fontSize: '14px' }}>Try adjusting your filters</div>
									</div>
								) : (
									filteredBookings.map((booking) => {
										const statusColors = {
											confirmed: { bg: '#d1fae5', text: '#065f46', border: '#10b981' },
											pending: { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' },
											completed: { bg: '#e0e7ff', text: '#3730a3', border: '#6366f1' },
											cancelled: { bg: '#fee2e2', text: '#991b1b', border: '#ef4444' }
										};
										const statusStyle = statusColors[booking.status];

										return (
											<div
												key={booking.id}
												style={{
													padding: '24px',
													background: 'white',
													border: `2px solid ${statusStyle.border}30`,
													borderRadius: '16px',
													transition: 'all 0.3s'
												}}
												onMouseEnter={(e) => {
													e.currentTarget.style.borderColor = statusStyle.border;
													e.currentTarget.style.transform = 'translateY(-2px)';
													e.currentTarget.style.boxShadow = `0 8px 20px ${statusStyle.border}30`;
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.borderColor = `${statusStyle.border}30`;
													e.currentTarget.style.transform = 'translateY(0)';
													e.currentTarget.style.boxShadow = 'none';
												}}
											>
												<div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
													<div
														style={{
															width: '64px',
															height: '64px',
															borderRadius: '50%',
															background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
															fontSize: '32px',
															flexShrink: 0
														}}
													>
														{booking.avatar}
													</div>
													<div style={{ flex: 1, minWidth: '250px' }}>
														<div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
															<h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: 0 }}>
																{booking.client}
															</h3>
															<span
																style={{
																	padding: '6px 12px',
																	background: statusStyle.bg,
																	color: statusStyle.text,
																	borderRadius: '8px',
																	fontSize: '12px',
																	fontWeight: 600,
																	textTransform: 'capitalize'
																}}
															>
																{booking.status}
															</span>
														</div>
														<div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
															<div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
																<span
																	style={{
																		padding: '4px 12px',
																		background: '#f3f4f6',
																		color: '#6366f1',
																		borderRadius: '8px',
																		fontSize: '13px',
																		fontWeight: 600
																	}}
																>
																	{booking.service}
																</span>
																<span style={{ fontSize: '13px', color: '#9ca3af' }}>•</span>
																<span style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600 }}>{booking.duration}</span>
															</div>
															<div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280' }}>
																<span>📅</span>
																<span>{booking.date}</span>
																<span style={{ color: '#d1d5db' }}>•</span>
																<span>🕐</span>
																<span>{booking.time}</span>
															</div>
															<div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280' }}>
																<span>📍</span>
																<span>{booking.location}</span>
															</div>
															{booking.notes && (
																<div style={{ marginTop: '8px', padding: '12px', background: '#f9fafb', borderRadius: '8px', fontSize: '13px', color: '#6b7280', lineHeight: '1.6' }}>
																	<strong>Notes:</strong> {booking.notes}
																</div>
															)}
														</div>
													</div>
													<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', minWidth: '120px' }}>
														<div style={{ fontSize: '28px', fontWeight: 800, color: '#10b981' }}>
															{booking.amount}
														</div>
														<div style={{ display: 'flex', gap: '8px' }}>
															<Link
																href="/dashboard/messages"
																style={{
																	padding: '8px 16px',
																	background: '#f3f4f6',
																	color: '#6366f1',
																	textDecoration: 'none',
																	borderRadius: '8px',
																	fontSize: '13px',
																	fontWeight: 600,
																	transition: 'all 0.2s'
																}}
																onMouseEnter={(e) => {
																	e.currentTarget.style.background = '#6366f1';
																	e.currentTarget.style.color = 'white';
																}}
																onMouseLeave={(e) => {
																	e.currentTarget.style.background = '#f3f4f6';
																	e.currentTarget.style.color = '#6366f1';
																}}
															>
																💬 Message
															</Link>
														</div>
													</div>
												</div>
											</div>
										);
									})
								)}
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
