'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SearchForm() {
	const router = useRouter();
	const [location, setLocation] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [petType, setPetType] = useState('dog');

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const params = new URLSearchParams({
					location,
					startDate,
					endDate,
					petType
				}).toString();
				router.push(`/search?${params}`);
			}}
			style={{
				display: 'grid',
				gap: '20px',
				gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
				alignItems: 'end'
			}}
		>
			<div>
				<label
					style={{
						display: 'block',
						fontSize: '14px',
						fontWeight: 600,
						color: 'white',
						marginBottom: '10px',
						opacity: 0.95
					}}
				>
					📍 Location
				</label>
				<input
					placeholder="City or ZIP code"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					style={{
						width: '100%',
						padding: '14px 18px',
						border: '2px solid rgba(255,255,255,0.2)',
						borderRadius: '12px',
						fontSize: '16px',
						transition: 'all 0.2s',
						boxSizing: 'border-box',
						background: 'rgba(255,255,255,0.95)',
						color: '#111827',
						backdropFilter: 'blur(10px)'
					}}
					onFocus={(e) => {
						e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
						e.currentTarget.style.outline = 'none';
						e.currentTarget.style.boxShadow = '0 0 0 4px rgba(255,255,255,0.2)';
					}}
					onBlur={(e) => {
						e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
						e.currentTarget.style.boxShadow = 'none';
					}}
				/>
			</div>
			<div>
				<label
					style={{
						display: 'block',
						fontSize: '14px',
						fontWeight: 600,
						color: 'white',
						marginBottom: '10px',
						opacity: 0.95
					}}
				>
					📅 Start Date
				</label>
				<input
					type="date"
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
					style={{
						width: '100%',
						padding: '14px 18px',
						border: '2px solid rgba(255,255,255,0.2)',
						borderRadius: '12px',
						fontSize: '16px',
						transition: 'all 0.2s',
						boxSizing: 'border-box',
						background: 'rgba(255,255,255,0.95)',
						color: '#111827',
						backdropFilter: 'blur(10px)'
					}}
					onFocus={(e) => {
						e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
						e.currentTarget.style.outline = 'none';
						e.currentTarget.style.boxShadow = '0 0 0 4px rgba(255,255,255,0.2)';
					}}
					onBlur={(e) => {
						e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
						e.currentTarget.style.boxShadow = 'none';
					}}
				/>
			</div>
			<div>
				<label
					style={{
						display: 'block',
						fontSize: '14px',
						fontWeight: 600,
						color: 'white',
						marginBottom: '10px',
						opacity: 0.95
					}}
				>
					📅 End Date
				</label>
				<input
					type="date"
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
					style={{
						width: '100%',
						padding: '14px 18px',
						border: '2px solid rgba(255,255,255,0.2)',
						borderRadius: '12px',
						fontSize: '16px',
						transition: 'all 0.2s',
						boxSizing: 'border-box',
						background: 'rgba(255,255,255,0.95)',
						color: '#111827',
						backdropFilter: 'blur(10px)'
					}}
					onFocus={(e) => {
						e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
						e.currentTarget.style.outline = 'none';
						e.currentTarget.style.boxShadow = '0 0 0 4px rgba(255,255,255,0.2)';
					}}
					onBlur={(e) => {
						e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
						e.currentTarget.style.boxShadow = 'none';
					}}
				/>
			</div>
			<div>
				<label
					style={{
						display: 'block',
						fontSize: '14px',
						fontWeight: 600,
						color: 'white',
						marginBottom: '10px',
						opacity: 0.95
					}}
				>
					🐾 Service Type
				</label>
				<select
					value={petType}
					onChange={(e) => setPetType(e.target.value)}
					style={{
						width: '100%',
						padding: '14px 18px',
						border: '2px solid rgba(255,255,255,0.2)',
						borderRadius: '12px',
						fontSize: '16px',
						background: 'rgba(255,255,255,0.95)',
						color: '#111827',
						transition: 'all 0.2s',
						boxSizing: 'border-box',
						cursor: 'pointer',
						backdropFilter: 'blur(10px)'
					}}
					onFocus={(e) => {
						e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
						e.currentTarget.style.outline = 'none';
						e.currentTarget.style.boxShadow = '0 0 0 4px rgba(255,255,255,0.2)';
					}}
					onBlur={(e) => {
						e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
						e.currentTarget.style.boxShadow = 'none';
					}}
				>
					<option value="dog">Pet Care</option>
					<option value="cat">Home Services</option>
					<option value="other">All Services</option>
				</select>
			</div>
			<button
				type="submit"
				style={{
					gridColumn: '1 / -1',
					padding: '16px 32px',
					background: 'white',
					color: '#6366f1',
					border: 'none',
					borderRadius: '12px',
					fontSize: '18px',
					fontWeight: 700,
					cursor: 'pointer',
					transition: 'all 0.3s',
					boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
					letterSpacing: '-0.01em'
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.background = '#f8fafc';
					e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
					e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)';
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.background = 'white';
					e.currentTarget.style.transform = 'translateY(0) scale(1)';
					e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
				}}
			>
				🔍 Search Neighborhood Services
			</button>
		</form>
	);
}
