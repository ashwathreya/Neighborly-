'use client';

import { useState } from 'react';
import { ChatModal } from './ChatModal';
import { BookingModal } from './BookingModal';

type ProviderDetails = {
	name: string;
	avatar: string;
	rating: string;
	reviews: string;
	badge: string | null;
	tasks: string;
	bio: string;
	services: string[];
	prices: { service: string; price: string }[];
	portfolio: string[];
	location: string;
	responseTime: string;
	languages: string[];
	verified: boolean;
};

interface ProviderDetailsModalProps {
	isOpen: boolean;
	onClose: () => void;
	provider: ProviderDetails | null;
}

export function ProviderDetailsModal({ isOpen, onClose, provider }: ProviderDetailsModalProps) {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [isChatOpen, setIsChatOpen] = useState(false);
	const [isBookingOpen, setIsBookingOpen] = useState(false);

	if (!isOpen || !provider) return null;

	return (
		<div
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				background: 'rgba(0, 0, 0, 0.6)',
				backdropFilter: 'blur(4px)',
				zIndex: 1000,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '20px',
				animation: 'fadeIn 0.2s ease-out',
				overflow: 'auto'
			}}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				style={{
					background: 'white',
					borderRadius: '24px',
					maxWidth: '900px',
					width: '100%',
					maxHeight: '90vh',
					overflow: 'auto',
					position: 'relative',
					animation: 'slideUp 0.3s ease-out',
					boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
				}}
			>
				{/* Close button */}
				<button
					onClick={onClose}
					style={{
						position: 'absolute',
						top: '20px',
						right: '20px',
						width: '40px',
						height: '40px',
						borderRadius: '50%',
						border: 'none',
						background: '#f3f4f6',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: '24px',
						color: '#6b7280',
						transition: 'all 0.2s',
						zIndex: 10
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.background = '#e5e7eb';
						e.currentTarget.style.color = '#111827';
						e.currentTarget.style.transform = 'rotate(90deg)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.background = '#f3f4f6';
						e.currentTarget.style.color = '#6b7280';
						e.currentTarget.style.transform = 'rotate(0deg)';
					}}
				>
					×
				</button>

				{/* Content */}
				<div style={{ padding: '40px' }}>
					{/* Header Section */}
					<div style={{ display: 'flex', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
						<div
							style={{
								width: '120px',
								height: '120px',
								borderRadius: '50%',
								background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: '60px',
								boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
								flexShrink: 0
							}}
						>
							{provider.avatar}
						</div>
						<div style={{ flex: 1, minWidth: '250px' }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
								<h2 style={{ fontSize: '32px', fontWeight: 800, color: '#111827', margin: 0 }}>
									{provider.name}
								</h2>
								{provider.badge && (
									<span
										style={{
											padding: '6px 12px',
											background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
											color: 'white',
											borderRadius: '8px',
											fontSize: '12px',
											fontWeight: 700,
											textTransform: 'uppercase',
											letterSpacing: '0.5px'
										}}
									>
										{provider.badge}
									</span>
								)}
								{provider.verified && (
									<span
										style={{
											padding: '6px 12px',
											background: '#d1fae5',
											color: '#065f46',
											borderRadius: '8px',
											fontSize: '12px',
											fontWeight: 700
										}}
									>
										✓ Verified
									</span>
								)}
							</div>
							<div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
								<div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
									<span style={{ fontSize: '20px' }}>⭐</span>
									<span style={{ fontSize: '20px', fontWeight: 700, color: '#111827' }}>{provider.rating}</span>
									<span style={{ fontSize: '14px', color: '#6b7280' }}>({provider.reviews})</span>
								</div>
								<span style={{ color: '#d1d5db' }}>•</span>
								<span style={{ fontSize: '14px', color: '#6b7280' }}>{provider.tasks}</span>
								<span style={{ color: '#d1d5db' }}>•</span>
								<span style={{ fontSize: '14px', color: '#6b7280' }}>📍 {provider.location}</span>
							</div>
							<div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
								⚡ Responds in {provider.responseTime}
							</div>
							<p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.7', margin: 0 }}>
								{provider.bio}
							</p>
						</div>
					</div>

					{/* Services & Pricing */}
					<div style={{ marginBottom: '32px' }}>
						<h3 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
							Services & Pricing
						</h3>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
								gap: '16px'
							}}
						>
							{provider.prices.map((priceItem, idx) => (
								<div
									key={idx}
									style={{
										padding: '20px',
										background: '#f9fafb',
										border: '2px solid #e5e7eb',
										borderRadius: '12px',
										transition: 'all 0.2s'
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.borderColor = '#6366f1';
										e.currentTarget.style.background = '#f3f4f6';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.borderColor = '#e5e7eb';
										e.currentTarget.style.background = '#f9fafb';
									}}
								>
									<div style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>
										{priceItem.service}
									</div>
									<div style={{ fontSize: '24px', fontWeight: 800, color: '#6366f1' }}>{priceItem.price}</div>
								</div>
							))}
						</div>
					</div>

					{/* Portfolio */}
					{provider.portfolio.length > 0 && (
						<div style={{ marginBottom: '32px' }}>
							<h3 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
								Portfolio
							</h3>
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
									gap: '12px'
								}}
							>
								{provider.portfolio.map((image, idx) => (
									<div
										key={idx}
										onClick={() => setSelectedImage(image)}
										style={{
											aspectRatio: '1',
											borderRadius: '12px',
											overflow: 'hidden',
											cursor: 'pointer',
											border: '2px solid #e5e7eb',
											transition: 'all 0.2s'
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.borderColor = '#6366f1';
											e.currentTarget.style.transform = 'scale(1.05)';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.borderColor = '#e5e7eb';
											e.currentTarget.style.transform = 'scale(1)';
										}}
									>
										<img
											src={image}
											alt={`Portfolio ${idx + 1}`}
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'cover'
											}}
										/>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Languages */}
					{provider.languages.length > 0 && (
						<div style={{ marginBottom: '32px' }}>
							<h3 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
								Languages
							</h3>
							<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
								{provider.languages.map((lang, idx) => (
									<span
										key={idx}
										style={{
											padding: '8px 16px',
											background: '#f3f4f6',
											color: '#6366f1',
											borderRadius: '8px',
											fontSize: '14px',
											fontWeight: 600
										}}
									>
										{lang}
									</span>
								))}
							</div>
						</div>
					)}

					{/* Action Buttons */}
					<div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
						<button
							onClick={() => {
								setIsBookingOpen(true);
							}}
							style={{
								flex: 1,
								minWidth: '200px',
								padding: '16px 24px',
								background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
								color: 'white',
								border: 'none',
								borderRadius: '12px',
								fontWeight: 600,
								fontSize: '16px',
								cursor: 'pointer',
								transition: 'all 0.3s',
								fontFamily: 'inherit'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.transform = 'translateY(-2px)';
								e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.4)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transform = 'translateY(0)';
								e.currentTarget.style.boxShadow = 'none';
							}}
						>
							Book Now
						</button>
						<button
							onClick={() => {
								setIsChatOpen(true);
							}}
							style={{
								padding: '16px 24px',
								background: 'white',
								color: '#6366f1',
								border: '2px solid #6366f1',
								borderRadius: '12px',
								fontWeight: 600,
								fontSize: '16px',
								cursor: 'pointer',
								transition: 'all 0.3s',
								fontFamily: 'inherit'
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = '#f3f4f6';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = 'white';
							}}
						>
							💬 Message
						</button>
					</div>
				</div>
			</div>

			{/* Image Modal */}
			{selectedImage && (
				<div
					onClick={() => setSelectedImage(null)}
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background: 'rgba(0, 0, 0, 0.9)',
						zIndex: 2000,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '40px'
					}}
				>
					<img
						src={selectedImage}
						alt="Portfolio"
						style={{
							maxWidth: '90vw',
							maxHeight: '90vh',
							borderRadius: '12px',
							objectFit: 'contain'
						}}
					/>
				</div>
			)}

			{/* Chat Modal */}
			<ChatModal
				isOpen={isChatOpen}
				onClose={() => setIsChatOpen(false)}
				providerName={provider.name}
				providerAvatar={provider.avatar}
			/>

			{/* Booking Modal */}
			<BookingModal
				isOpen={isBookingOpen}
				onClose={() => setIsBookingOpen(false)}
				provider={{
					name: provider.name,
					avatar: provider.avatar,
					services: provider.services,
					prices: provider.prices
				}}
			/>

			<style jsx global>{`
				@keyframes fadeIn {
					from { opacity: 0; }
					to { opacity: 1; }
				}
				@keyframes slideUp {
					from { 
						opacity: 0;
						transform: translateY(20px);
					}
					to { 
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
}

