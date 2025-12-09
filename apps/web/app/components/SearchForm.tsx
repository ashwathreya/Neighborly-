'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SearchForm() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');

	// Map keywords to service types (same logic as search page)
	const getServiceTypeFromKeyword = (keyword: string): string => {
		const keywordLower = keyword.toLowerCase().trim();
		
		if (['pet', 'dog', 'cat', 'animal', 'puppy', 'kitten', 'pet sitting', 'dog walking', 'pet care', 'pet boarding', 'dog sitter', 'cat sitter'].some(k => keywordLower.includes(k))) {
			return 'pet care';
		}
		if (['math', 'algebra', 'geometry', 'calculus', 'tutor', 'tutoring', 'teaching', 'education', 'learn', 'study', 'homework', 'test prep', 'sat', 'act', 'gre', 'gmat', 'science', 'chemistry', 'physics', 'biology', 'english', 'reading', 'writing', 'language', 'spanish', 'french', 'german', 'coding', 'programming', 'computer'].some(k => keywordLower.includes(k))) {
			return 'tutoring';
		}
		if (['handyman', 'repair', 'fix', 'install', 'mount', 'assembly', 'furniture', 'plumbing', 'electrical', 'carpentry', 'painting', 'drywall', 'flooring', 'tile', 'roofing', 'hvac', 'appliance', 'tv mounting', 'shelving', 'cabinet'].some(k => keywordLower.includes(k))) {
			return 'handyman';
		}
		if (['cleaning', 'clean', 'house cleaning', 'deep clean', 'maid', 'organizing', 'organize', 'declutter', 'vacuum', 'mop', 'dust', 'window cleaning'].some(k => keywordLower.includes(k))) {
			return 'house cleaning';
		}
		if (['moving', 'mover', 'relocation', 'packing', 'unpacking', 'loading', 'unloading', 'heavy lifting', 'furniture moving'].some(k => keywordLower.includes(k))) {
			return 'moving';
		}
		if (['babysitter', 'babysitting', 'nanny', 'childcare', 'child care', 'kids', 'children'].some(k => keywordLower.includes(k))) {
			return 'childcare';
		}
		if (['event', 'party', 'planning', 'wedding', 'birthday', 'celebration'].some(k => keywordLower.includes(k))) {
			return 'event planning';
		}
		
		return 'all'; // Default to all services
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!searchQuery.trim()) return;
		
		const serviceType = getServiceTypeFromKeyword(searchQuery);
		const params = new URLSearchParams({
			serviceType,
			location: '', // Location can be added later or made optional
			startDate: '',
			endDate: ''
		}).toString();
		router.push(`/search?${params}`);
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{
				display: 'flex',
				gap: '12px',
				alignItems: 'center',
				maxWidth: '800px',
				width: '100%',
				margin: '0 auto'
			}}
		>
			<div
				style={{
					flex: 1,
					position: 'relative',
					display: 'flex',
					alignItems: 'center'
				}}
			>
				{/* Search Icon */}
				<div
					style={{
						position: 'absolute',
						left: '18px',
						zIndex: 1,
						pointerEvents: 'none',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style={{ color: '#9ca3af' }}
					>
						<path
							d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M19 19L14.65 14.65"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<input
					type="text"
					placeholder="What service do you need?"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					style={{
						width: '100%',
						padding: '16px 18px 16px 50px',
						border: '2px solid rgba(255,255,255,0.3)',
						borderRadius: '12px',
						fontSize: '16px',
						transition: 'all 0.3s',
						boxSizing: 'border-box',
						background: 'rgba(255,255,255,0.98)',
						color: '#111827',
						backdropFilter: 'blur(10px)',
						boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
					}}
					onFocus={(e) => {
						e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
						e.currentTarget.style.outline = 'none';
						e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.2)';
					}}
					onBlur={(e) => {
						e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
						e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
					}}
				/>
			</div>
			<button
				type="submit"
				style={{
					padding: '16px 32px',
					background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
					color: 'white',
					border: 'none',
					borderRadius: '12px',
					fontSize: '16px',
					fontWeight: 600,
					cursor: 'pointer',
					transition: 'all 0.3s',
					boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
					whiteSpace: 'nowrap',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					minWidth: '120px'
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
				Search
			</button>
		</form>
	);
}
