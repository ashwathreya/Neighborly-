'use client';

import Link from 'next/link';
import { SearchForm } from './components/SearchForm';
import { LoginModal } from './components/LoginModal';
import { useState, useEffect, useRef } from 'react';

export default function HomePage() {
	const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
	const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
	const [counters, setCounters] = useState({ providers: 0, rating: 0, cities: 0 });
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const heroRef = useRef<HTMLElement>(null);
	const statsRef = useRef<HTMLDivElement>(null);

	// Scroll animation observer
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
		);

		const elements = document.querySelectorAll('[data-animate]');
		elements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, []);

	// Animated counters
	useEffect(() => {
		if (isVisible.stats) {
			const duration = 2000;
			const steps = 60;
			const interval = duration / steps;

			let providersCurrent = 0;
			let ratingCurrent = 0;
			let citiesCurrent = 0;

			const providersEnd = 50;
			const ratingEnd = 4.8;
			const citiesEnd = 500;

			const providersIncrement = providersEnd / steps;
			const ratingIncrement = ratingEnd / steps;
			const citiesIncrement = citiesEnd / steps;

			const timer = setInterval(() => {
				providersCurrent += providersIncrement;
				ratingCurrent += ratingIncrement;
				citiesCurrent += citiesIncrement;

				if (providersCurrent >= providersEnd && ratingCurrent >= ratingEnd && citiesCurrent >= citiesEnd) {
					setCounters({ providers: providersEnd, rating: ratingEnd, cities: citiesEnd });
					clearInterval(timer);
				} else {
					setCounters({
						providers: Math.min(Math.floor(providersCurrent), providersEnd),
						rating: Math.min(Number(ratingCurrent.toFixed(1)), ratingEnd),
						cities: Math.min(Math.floor(citiesCurrent), citiesEnd)
					});
				}
			}, interval);

			return () => clearInterval(timer);
		}
	}, [isVisible.stats]);

	return (
		<>
			<style jsx global>{`
				@keyframes float {
					0%, 100% { transform: translateY(0px) rotate(0deg); }
					50% { transform: translateY(-20px) rotate(5deg); }
				}
				@keyframes pulse {
					0%, 100% { opacity: 1; transform: scale(1); }
					50% { opacity: 0.8; transform: scale(1.05); }
				}
				@keyframes slideUp {
					from { opacity: 0; transform: translateY(40px); }
					to { opacity: 1; transform: translateY(0); }
				}
				@keyframes fadeIn {
					from { opacity: 0; }
					to { opacity: 1; }
				}
				@keyframes gradientShift {
					0% { background-position: 0% 50%; }
					50% { background-position: 100% 50%; }
					100% { background-position: 0% 50%; }
				}
				@keyframes blob {
					0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
					50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
				}
				@keyframes shimmer {
					0% { background-position: -1000px 0; }
					100% { background-position: 1000px 0; }
				}
				.animate-float { animation: float 6s ease-in-out infinite; }
				.animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
				.animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
				.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
				.animate-gradient {
					background-size: 200% 200%;
					animation: gradientShift 8s ease infinite;
				}
				.animate-blob { animation: blob 20s ease-in-out infinite; }
			`}</style>

			{/* Animated Background Blobs */}
			<div
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					zIndex: 0,
					pointerEvents: 'none',
					overflow: 'hidden'
				}}
			>
				<div
					className="animate-blob"
					style={{
						position: 'absolute',
						top: '-10%',
						right: '-5%',
						width: '600px',
						height: '600px',
						background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
						filter: 'blur(80px)',
						animation: 'blob 25s ease-in-out infinite'
					}}
				/>
				<div
					className="animate-blob"
					style={{
						position: 'absolute',
						bottom: '-10%',
						left: '-5%',
						width: '500px',
						height: '500px',
						background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
						filter: 'blur(80px)',
						animation: 'blob 30s ease-in-out infinite',
						animationDelay: '2s'
					}}
				/>
			</div>

			{/* Navigation Header */}
			<header
				style={{
					position: 'sticky',
					top: 0,
					zIndex: 100,
					background: 'rgba(255, 255, 255, 0.95)',
					backdropFilter: 'blur(10px)',
					borderBottom: '1px solid rgba(0,0,0,0.08)',
					boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
					animation: 'slideUp 0.5s ease-out'
				}}
			>
				<nav
					style={{
						maxWidth: '1400px',
						margin: '0 auto',
						padding: '18px 32px',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						position: 'relative',
						zIndex: 1
					}}
				>
					<Link
						href="/"
						style={{
							fontSize: '26px',
							fontWeight: 800,
							background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
							backgroundSize: '200% 200%',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							textDecoration: 'none',
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
							animation: 'gradientShift 5s ease infinite',
							transition: 'transform 0.3s'
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = 'scale(1.05)';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = 'scale(1)';
						}}
					>
						<span style={{ fontSize: '28px', display: 'inline-block', animation: 'float 4s ease-in-out infinite' }}>
							🏘️
						</span>
						<span>Neighborly</span>
					</Link>
					<div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
						<Link
							href="/search"
							style={{
								color: '#4b5563',
								textDecoration: 'none',
								fontWeight: 500,
								fontSize: '15px',
								transition: 'all 0.3s',
								position: 'relative'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.color = '#6366f1';
								e.currentTarget.style.transform = 'translateY(-2px)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.color = '#4b5563';
								e.currentTarget.style.transform = 'translateY(0)';
							}}
						>
							Explore
						</Link>
						<button
							onClick={() => setIsLoginModalOpen(true)}
							style={{
								background: 'none',
								border: 'none',
								color: '#4b5563',
								textDecoration: 'none',
								fontWeight: 500,
								fontSize: '15px',
								cursor: 'pointer',
								transition: 'all 0.3s',
								padding: 0,
								fontFamily: 'inherit'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.color = '#6366f1';
								e.currentTarget.style.transform = 'translateY(-2px)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.color = '#4b5563';
								e.currentTarget.style.transform = 'translateY(0)';
							}}
						>
							Sign In
						</button>
						<Link
							href="/search"
							style={{
								background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
								backgroundSize: '200% 200%',
								color: 'white',
								padding: '12px 24px',
								borderRadius: '12px',
								textDecoration: 'none',
								fontWeight: 600,
								fontSize: '15px',
								transition: 'all 0.3s',
								boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
								position: 'relative',
								overflow: 'hidden'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
								e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
								e.currentTarget.style.backgroundPosition = '100% 50%';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0) scale(1)';
								e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
								e.currentTarget.style.backgroundPosition = '0% 50%';
							}}
						>
							Get Started
						</Link>
					</div>
				</nav>
			</header>

			<main style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)', position: 'relative', zIndex: 1 }}>
				{/* Hero Section */}
				<section
					ref={heroRef}
					style={{
						position: 'relative',
						background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
						backgroundSize: '200% 200%',
						color: 'white',
						padding: '100px 32px',
						textAlign: 'center',
						overflow: 'hidden',
						animation: 'gradientShift 10s ease infinite'
					}}
				>
					{/* Floating particles */}
					{[...Array(20)].map((_, i) => (
						<div
							key={i}
							style={{
								position: 'absolute',
								width: `${Math.random() * 6 + 4}px`,
								height: `${Math.random() * 6 + 4}px`,
								background: 'rgba(255,255,255,0.3)',
								borderRadius: '50%',
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								animation: `float ${Math.random() * 4 + 3}s ease-in-out infinite`,
								animationDelay: `${Math.random() * 2}s`
							}}
						/>
					))}

					<div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
						<h1
							style={{
								fontSize: 'clamp(42px, 6vw, 64px)',
								fontWeight: 900,
								margin: '0 0 24px 0',
								lineHeight: '1.1',
								letterSpacing: '-0.02em',
								animation: 'slideUp 0.8s ease-out',
								textShadow: '0 4px 20px rgba(0,0,0,0.2)'
							}}
						>
							Your Neighborhood,<br />
							<span
								style={{
									background: 'rgba(255,255,255,0.2)',
									padding: '0 12px',
									borderRadius: '8px',
									display: 'inline-block',
									animation: 'pulse 2s ease-in-out infinite',
									backdropFilter: 'blur(10px)'
								}}
							>
								Everything You Need
							</span>
						</h1>
						<p
							style={{
								fontSize: 'clamp(18px, 2.5vw, 22px)',
								margin: '0 0 48px 0',
								opacity: 0.95,
								fontWeight: 400,
								lineHeight: '1.6',
								animation: 'slideUp 1s ease-out 0.2s both'
							}}
						>
							Find pet sitters, handymen, tutors, local services, and connect with your community—all in one place
						</p>
						<div
							style={{
								background: 'rgba(255, 255, 255, 0.15)',
								backdropFilter: 'blur(20px)',
								borderRadius: '24px',
								padding: '40px',
								boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
								border: '1px solid rgba(255,255,255,0.2)',
								animation: 'slideUp 1.2s ease-out 0.4s both'
							}}
						>
							<SearchForm />
						</div>
						<div
							ref={statsRef}
							id="stats"
							data-animate
							style={{
								display: 'flex',
								justifyContent: 'center',
								gap: '48px',
								marginTop: '60px',
								flexWrap: 'wrap',
								opacity: isVisible.stats ? 1 : 0,
								transform: isVisible.stats ? 'translateY(0)' : 'translateY(30px)',
								transition: 'all 0.8s ease-out'
							}}
						>
							{[
								{ number: `${counters.providers}K+`, label: 'Active Providers', icon: '👥' },
								{ number: `${counters.rating.toFixed(1)}★`, label: 'Average Rating', icon: '⭐' },
								{ number: `${counters.cities}+`, label: 'Cities', icon: '🌆' }
							].map((stat, idx) => (
								<div
									key={idx}
									style={{
										textAlign: 'center',
										animation: `slideUp 0.6s ease-out ${idx * 0.2}s both`
									}}
								>
									<div
										style={{
											fontSize: '36px',
											fontWeight: 800,
											marginBottom: '8px',
											textShadow: '0 2px 10px rgba(0,0,0,0.2)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											gap: '8px'
										}}
									>
										<span style={{ fontSize: '28px', animation: 'pulse 2s ease-in-out infinite' }}>
											{stat.icon}
										</span>
										<span>{stat.number}</span>
									</div>
									<div style={{ fontSize: '15px', opacity: 0.9, fontWeight: 500 }}>{stat.label}</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Categories Grid */}
				<section
					id="categories"
					data-animate
					style={{
						maxWidth: '1400px',
						margin: '0 auto',
						padding: '100px 32px',
						textAlign: 'center',
						opacity: isVisible.categories ? 1 : 0,
						transform: isVisible.categories ? 'translateY(0)' : 'translateY(50px)',
						transition: 'all 0.8s ease-out'
					}}
				>
					<h2
						style={{
							fontSize: 'clamp(32px, 4vw, 48px)',
							fontWeight: 800,
							margin: '0 0 16px 0',
							color: '#111827',
							letterSpacing: '-0.02em',
							animation: isVisible.categories ? 'slideUp 0.6s ease-out' : 'none'
						}}
					>
						Discover Everything Your Neighborhood Offers
					</h2>
					<p
						style={{
							fontSize: '18px',
							color: '#6b7280',
							marginBottom: '64px',
							maxWidth: '600px',
							margin: '0 auto 64px auto',
							animation: isVisible.categories ? 'slideUp 0.6s ease-out 0.2s both' : 'none'
						}}
					>
						From pet care to home services, find trusted local providers for anything you need
					</p>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
							gap: '24px',
							marginTop: '40px'
						}}
					>
						{[
							{
								name: 'Pet Care',
								icon: '🐕',
								desc: 'Dog walking, pet sitting, grooming',
								color: '#10b981',
								bgGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
							},
							{
								name: 'Home Services',
								icon: '🔧',
								desc: 'Plumbing, electrical, cleaning',
								color: '#3b82f6',
								bgGradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
							},
							{
								name: 'Tutoring',
								icon: '📚',
								desc: 'Academic help, music lessons',
								color: '#8b5cf6',
								bgGradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
							},
							{
								name: 'Childcare',
								icon: '👶',
								desc: 'Babysitting, nannies, after-school care',
								color: '#ec4899',
								bgGradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
							},
							{
								name: 'Fitness',
								icon: '💪',
								desc: 'Personal trainers, yoga instructors',
								color: '#f59e0b',
								bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
							},
							{
								name: 'Events',
								icon: '🎉',
								desc: 'Party planning, photography',
								color: '#6366f1',
								bgGradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
							}
						].map((category, idx) => (
							<Link
								href="/search"
								key={category.name}
								style={{
									textDecoration: 'none',
									color: 'inherit',
									animation: isVisible.categories ? `slideUp 0.6s ease-out ${idx * 0.1 + 0.4}s both` : 'none'
								}}
							>
								<div
									style={{
										background: hoveredCategory === category.name ? category.bgGradient : 'white',
										color: hoveredCategory === category.name ? 'white' : '#111827',
										padding: '40px 32px',
										borderRadius: '20px',
										border: `2px solid ${hoveredCategory === category.name ? 'transparent' : '#e5e7eb'}`,
										transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
										cursor: 'pointer',
										boxShadow:
											hoveredCategory === category.name
												? `0 20px 40px ${category.color}40`
												: '0 4px 6px rgba(0,0,0,0.05)',
										transform:
											hoveredCategory === category.name
												? 'translateY(-12px) scale(1.03) rotate(1deg)'
												: 'translateY(0) scale(1) rotate(0deg)',
										position: 'relative',
										overflow: 'hidden'
									}}
									onMouseEnter={() => setHoveredCategory(category.name)}
									onMouseLeave={() => setHoveredCategory(null)}
								>
									<div
										style={{
											fontSize: '56px',
											marginBottom: '20px',
											transform:
												hoveredCategory === category.name
													? 'scale(1.2) rotate(10deg)'
													: 'scale(1) rotate(0deg)',
											transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
											display: 'inline-block',
											animation:
												hoveredCategory === category.name ? 'none' : 'float 4s ease-in-out infinite',
											animationDelay: `${idx * 0.3}s`
										}}
									>
										{category.icon}
									</div>
									<h3
										style={{
											fontSize: '22px',
											fontWeight: 700,
											margin: '0 0 12px 0',
											letterSpacing: '-0.01em',
											transform: hoveredCategory === category.name ? 'scale(1.05)' : 'scale(1)',
											transition: 'transform 0.3s'
										}}
									>
										{category.name}
									</h3>
									<p
										style={{
											fontSize: '15px',
											margin: 0,
											opacity: hoveredCategory === category.name ? 0.95 : 0.7,
											lineHeight: '1.5',
											transform: hoveredCategory === category.name ? 'translateY(-2px)' : 'translateY(0)',
											transition: 'all 0.3s'
										}}
									>
										{category.desc}
									</p>
									{hoveredCategory === category.name && (
										<div
											style={{
												position: 'absolute',
												top: '50%',
												left: '50%',
												width: '200px',
												height: '200px',
												background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
												borderRadius: '50%',
												transform: 'translate(-50%, -50%) scale(0)',
												animation: 'pulse 1s ease-out',
												pointerEvents: 'none'
											}}
										/>
									)}
								</div>
							</Link>
						))}
					</div>
				</section>

				{/* How It Works - Interactive */}
				<section
					id="how-it-works"
					data-animate
					style={{
						background: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)',
						padding: '100px 32px',
						opacity: isVisible['how-it-works'] ? 1 : 0,
						transform: isVisible['how-it-works'] ? 'translateY(0)' : 'translateY(50px)',
						transition: 'all 0.8s ease-out'
					}}
				>
					<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
						<h2
							style={{
								fontSize: 'clamp(32px, 4vw, 48px)',
								fontWeight: 800,
								textAlign: 'center',
								margin: '0 0 16px 0',
								color: '#111827',
								letterSpacing: '-0.02em',
								animation: isVisible['how-it-works'] ? 'slideUp 0.6s ease-out' : 'none'
							}}
						>
							How Neighborly Works
						</h2>
						<p
							style={{
								fontSize: '18px',
								color: '#6b7280',
								textAlign: 'center',
								marginBottom: '80px',
								maxWidth: '600px',
								margin: '0 auto 80px auto',
								animation: isVisible['how-it-works'] ? 'slideUp 0.6s ease-out 0.2s both' : 'none'
							}}
						>
							Connect with your community and find trusted local services in minutes
						</p>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
								gap: '32px',
								position: 'relative'
							}}
						>
							{[
								{
									step: '1',
									title: 'Search Your Area',
									desc: 'Enter your location and browse verified providers in your neighborhood',
									icon: '🔍',
									color: '#6366f1'
								},
								{
									step: '2',
									title: 'Compare & Connect',
									desc: 'Read reviews, check availability, and message providers directly',
									icon: '💬',
									color: '#8b5cf6'
								},
								{
									step: '3',
									title: 'Book with Confidence',
									desc: 'Secure booking with transparent pricing and cancellation policies',
									icon: '✅',
									color: '#ec4899'
								},
								{
									step: '4',
									title: 'Stay Connected',
									desc: 'Get real-time updates, photos, and build lasting neighborhood connections',
									icon: '🤝',
									color: '#10b981'
								}
							].map((item, idx) => (
								<div
									key={item.step}
									style={{
										background: 'white',
										padding: '40px 32px',
										borderRadius: '24px',
										boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
										border: `3px solid ${item.color}20`,
										position: 'relative',
										transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
										transform: 'translateY(0)',
										animation: isVisible['how-it-works'] ? `slideUp 0.6s ease-out ${idx * 0.15 + 0.4}s both` : 'none'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = 'translateY(-16px) scale(1.02)';
										e.currentTarget.style.boxShadow = `0 16px 48px ${item.color}40`;
										e.currentTarget.style.borderColor = item.color;
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = 'translateY(0) scale(1)';
										e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
										e.currentTarget.style.borderColor = `${item.color}20`;
									}}
								>
									<div
										style={{
											width: '64px',
											height: '64px',
											borderRadius: '16px',
											background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
											color: 'white',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: '28px',
											fontWeight: 700,
											marginBottom: '24px',
											boxShadow: `0 8px 20px ${item.color}40`,
											animation: 'pulse 2s ease-in-out infinite',
											animationDelay: `${idx * 0.3}s`
										}}
									>
										{item.icon}
									</div>
									<div
										style={{
											position: 'absolute',
											top: '32px',
											right: '32px',
											width: '40px',
											height: '40px',
											borderRadius: '50%',
											background: item.color,
											color: 'white',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: '18px',
											fontWeight: 800,
											animation: 'pulse 2s ease-in-out infinite',
											animationDelay: `${idx * 0.2}s`
										}}
									>
										{item.step}
									</div>
									<h3
										style={{
											fontSize: '22px',
											fontWeight: 700,
											margin: '0 0 12px 0',
											color: '#111827',
											letterSpacing: '-0.01em'
										}}
									>
										{item.title}
									</h3>
									<p
										style={{
											fontSize: '15px',
											color: '#6b7280',
											margin: 0,
											lineHeight: '1.6'
										}}
									>
										{item.desc}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Community Testimonials */}
				<section
					id="testimonials"
					data-animate
					style={{
						maxWidth: '1400px',
						margin: '0 auto',
						padding: '100px 32px',
						background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
						opacity: isVisible.testimonials ? 1 : 0,
						transform: isVisible.testimonials ? 'translateY(0)' : 'translateY(50px)',
						transition: 'all 0.8s ease-out'
					}}
				>
					<h2
						style={{
							fontSize: 'clamp(32px, 4vw, 48px)',
							fontWeight: 800,
							textAlign: 'center',
							margin: '0 0 16px 0',
							color: '#111827',
							letterSpacing: '-0.02em',
							animation: isVisible.testimonials ? 'slideUp 0.6s ease-out' : 'none'
						}}
					>
						Loved by Your Neighbors
					</h2>
					<p
						style={{
							fontSize: '18px',
							color: '#6b7280',
							textAlign: 'center',
							marginBottom: '64px',
							animation: isVisible.testimonials ? 'slideUp 0.6s ease-out 0.2s both' : 'none'
						}}
					>
						4.8/5 from thousands of community reviews
					</p>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
							gap: '28px'
						}}
					>
						{[
							{
								name: 'Sarah M.',
								location: 'Oak Park, CA',
								service: 'Pet Sitting',
								text: 'Found the perfect dog sitter for my weekend trip! The platform made it so easy to compare options and read real reviews from neighbors.',
								rating: 5,
								avatar: '👩'
							},
							{
								name: 'Mike T.',
								location: 'Brooklyn, NY',
								service: 'Home Repair',
								text: 'Needed a plumber urgently and found one in my area within minutes. The handyman was professional and the pricing was transparent.',
								rating: 5,
								avatar: '👨'
							},
							{
								name: 'Jennifer L.',
								location: 'Austin, TX',
								service: 'Tutoring',
								text: 'My daughter\'s math tutor from Neighborly has been amazing. It\'s great to support local educators in our community!',
								rating: 5,
								avatar: '👩‍🏫'
							}
						].map((review, idx) => (
							<div
								key={idx}
								style={{
									background: 'white',
									padding: '32px',
									borderRadius: '20px',
									boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
									border: '1px solid #e5e7eb',
									transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
									animation: isVisible.testimonials ? `slideUp 0.6s ease-out ${idx * 0.2 + 0.4}s both` : 'none'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
									e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.15)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'translateY(0) scale(1)';
									e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
									<div
										style={{
											width: '56px',
											height: '56px',
											borderRadius: '50%',
											background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: '28px',
											animation: 'pulse 3s ease-in-out infinite',
											animationDelay: `${idx * 0.3}s`
										}}
									>
										{review.avatar}
									</div>
									<div>
										<div style={{ fontWeight: 700, color: '#111827', fontSize: '16px' }}>{review.name}</div>
										<div style={{ fontSize: '13px', color: '#6b7280' }}>{review.location}</div>
									</div>
								</div>
								<div style={{ display: 'flex', gap: '4px', marginBottom: '16px', fontSize: '18px' }}>
									{'⭐'.repeat(review.rating)}
								</div>
								<p
									style={{
										fontSize: '15px',
										color: '#374151',
										lineHeight: '1.7',
										margin: '0 0 16px 0'
									}}
								>
									"{review.text}"
								</p>
								<div
									style={{
										display: 'inline-block',
										background: '#f3f4f6',
										padding: '6px 12px',
										borderRadius: '8px',
										fontSize: '13px',
										color: '#6366f1',
										fontWeight: 600
									}}
								>
									{review.service}
								</div>
							</div>
						))}
					</div>
				</section>

				{/* CTA Section */}
				<section
					style={{
						background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
						backgroundSize: '200% 200%',
						color: 'white',
						padding: '100px 32px',
						textAlign: 'center',
						position: 'relative',
						overflow: 'hidden',
						animation: 'gradientShift 10s ease infinite'
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: '-50%',
							right: '-10%',
							width: '500px',
							height: '500px',
							background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
							borderRadius: '50%',
							animation: 'blob 20s ease-in-out infinite'
						}}
					/>
					<div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
						<h2
							style={{
								fontSize: 'clamp(36px, 5vw, 56px)',
								fontWeight: 900,
								margin: '0 0 24px 0',
								letterSpacing: '-0.02em',
								animation: 'slideUp 0.8s ease-out',
								textShadow: '0 4px 20px rgba(0,0,0,0.2)'
							}}
						>
							Ready to Connect with Your Neighborhood?
						</h2>
						<p
							style={{
								fontSize: '20px',
								margin: '0 0 40px 0',
								opacity: 0.95,
								lineHeight: '1.6',
								animation: 'slideUp 1s ease-out 0.2s both'
							}}
						>
							Join thousands of neighbors finding trusted services and building stronger communities
						</p>
						<div
							style={{
								display: 'flex',
								gap: '16px',
								justifyContent: 'center',
								flexWrap: 'wrap',
								animation: 'slideUp 1.2s ease-out 0.4s both'
							}}
						>
							<Link
								href="/search"
								style={{
									display: 'inline-block',
									background: 'white',
									color: '#6366f1',
									padding: '18px 36px',
									borderRadius: '14px',
									textDecoration: 'none',
									fontWeight: 700,
									fontSize: '18px',
									boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
									transition: 'all 0.3s',
									position: 'relative',
									overflow: 'hidden'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
									e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'translateY(0) scale(1)';
									e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
								}}
							>
								Start Exploring
							</Link>
							<button
								onClick={() => setIsLoginModalOpen(true)}
								style={{
									display: 'inline-block',
									background: 'rgba(255,255,255,0.2)',
									color: 'white',
									padding: '18px 36px',
									borderRadius: '14px',
									textDecoration: 'none',
									fontWeight: 700,
									fontSize: '18px',
									border: '2px solid rgba(255,255,255,0.3)',
									backdropFilter: 'blur(10px)',
									transition: 'all 0.3s',
									cursor: 'pointer',
									fontFamily: 'inherit'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
									e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
									e.currentTarget.style.transform = 'translateY(0) scale(1)';
								}}
							>
								Become a Provider
							</button>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer
				style={{
					background: '#111827',
					color: 'white',
					padding: '64px 32px 32px',
					textAlign: 'center',
					position: 'relative',
					zIndex: 1
				}}
			>
				<div style={{ maxWidth: '1400px', margin: '0 auto' }}>
					<div
						style={{
							fontSize: '28px',
							fontWeight: 800,
							marginBottom: '20px',
							background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
							backgroundSize: '200% 200%',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							animation: 'gradientShift 5s ease infinite'
						}}
					>
						🏘️ Neighborly
					</div>
					<p style={{ color: '#9ca3af', marginBottom: '40px', fontSize: '16px' }}>
						Your all-in-one neighborhood marketplace for services, connections, and community
					</p>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							gap: '32px',
							marginBottom: '40px',
							flexWrap: 'wrap'
						}}
					>
						{['About', 'Services', 'Safety', 'Help', 'Contact'].map((item) => (
							<Link
								key={item}
								href="#"
								style={{
									color: '#9ca3af',
									textDecoration: 'none',
									fontSize: '15px',
									transition: 'all 0.3s'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.color = 'white';
									e.currentTarget.style.transform = 'translateY(-2px)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.color = '#9ca3af';
									e.currentTarget.style.transform = 'translateY(0)';
								}}
							>
								{item}
							</Link>
						))}
					</div>
					<div
						style={{
							borderTop: '1px solid #374151',
							paddingTop: '32px',
							color: '#6b7280',
							fontSize: '14px'
						}}
					>
						© 2025 Neighborly. All rights reserved. Building stronger communities, one connection at a time.
					</div>
				</div>
			</footer>

			{/* Login Modal */}
			<LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
		</>
	);
}
