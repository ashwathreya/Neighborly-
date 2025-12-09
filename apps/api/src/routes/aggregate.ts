import { Router } from 'express';
import axios from 'axios';

export const aggregateRouter = Router();

// Platform configurations - Comprehensive one-stop solution
const PLATFORMS = {
	// Pet Care Platforms
	rover: {
		name: 'Rover',
		icon: '🐕',
		color: '#00B9B4',
		enabled: true,
		categories: ['pet', 'animal']
	},
	wag: {
		name: 'Wag!',
		icon: '🐾',
		color: '#FF6B6B',
		enabled: true,
		categories: ['pet', 'animal']
	},
	care: {
		name: 'Care.com',
		icon: '💙',
		color: '#4A90E2',
		enabled: true,
		categories: ['pet', 'tutoring', 'cleaning', 'home', 'childcare']
	},
	sittercity: {
		name: 'Sittercity',
		icon: '🏠',
		color: '#8B5CF6',
		enabled: true,
		categories: ['pet', 'childcare']
	},
	petbacker: {
		name: 'PetBacker',
		icon: '🐶',
		color: '#FF9800',
		enabled: true,
		categories: ['pet', 'animal']
	},
	holidog: {
		name: 'Holidog',
		icon: '🐱',
		color: '#9C27B0',
		enabled: true,
		categories: ['pet', 'animal']
	},
	trustedhousesitters: {
		name: 'TrustedHousesitters',
		icon: '🏡',
		color: '#4CAF50',
		enabled: true,
		categories: ['pet', 'animal', 'home']
	},
	
	// Home Services & Handyman
	thumbtack: {
		name: 'Thumbtack',
		icon: '👍',
		color: '#009688',
		enabled: true,
		categories: ['handyman', 'cleaning', 'home', 'tutoring', 'moving']
	},
	taskrabbit: {
		name: 'TaskRabbit',
		icon: '🐰',
		color: '#00C853',
		enabled: true,
		categories: ['handyman', 'cleaning', 'home', 'moving']
	},
	handy: {
		name: 'Handy',
		icon: '🔧',
		color: '#FF5722',
		enabled: true,
		categories: ['cleaning', 'handyman', 'home']
	},
	angi: {
		name: 'Angi',
		icon: '🏗️',
		color: '#E91E63',
		enabled: true,
		categories: ['handyman', 'home', 'repair']
	},
	homeadvisor: {
		name: 'HomeAdvisor',
		icon: '🛠️',
		color: '#FF6F00',
		enabled: true,
		categories: ['handyman', 'home', 'repair']
	},
	porch: {
		name: 'Porch',
		icon: '🚪',
		color: '#00BCD4',
		enabled: true,
		categories: ['handyman', 'home', 'repair']
	},
	takl: {
		name: 'Takl',
		icon: '⚡',
		color: '#3F51B5',
		enabled: true,
		categories: ['handyman', 'cleaning', 'home']
	},
	
	// Tutoring & Education Platforms
	wyzant: {
		name: 'Wyzant',
		icon: '📚',
		color: '#2196F3',
		enabled: true,
		categories: ['tutoring', 'education']
	},
	tutorcom: {
		name: 'Tutor.com',
		icon: '🎓',
		color: '#1976D2',
		enabled: true,
		categories: ['tutoring', 'education']
	},
	preply: {
		name: 'Preply',
		icon: '🌍',
		color: '#4CAF50',
		enabled: true,
		categories: ['tutoring', 'education', 'language']
	},
	varsitytutors: {
		name: 'Varsity Tutors',
		icon: '⭐',
		color: '#FFC107',
		enabled: true,
		categories: ['tutoring', 'education', 'test-prep']
	},
	skooli: {
		name: 'Skooli',
		icon: '✏️',
		color: '#9C27B0',
		enabled: true,
		categories: ['tutoring', 'education']
	},
	tutorme: {
		name: 'TutorMe',
		icon: '💡',
		color: '#00BCD4',
		enabled: true,
		categories: ['tutoring', 'education']
	},
	chegg: {
		name: 'Chegg Tutors',
		icon: '📖',
		color: '#FF5722',
		enabled: true,
		categories: ['tutoring', 'education']
	},
	superprof: {
		name: 'Superprof',
		icon: '👨‍🏫',
		color: '#E91E63',
		enabled: true,
		categories: ['tutoring', 'education']
	},
	italki: {
		name: 'iTalki',
		icon: '🗣️',
		color: '#FF9800',
		enabled: true,
		categories: ['tutoring', 'education', 'language']
	},
	khanacademy: {
		name: 'Khan Academy',
		icon: '🎯',
		color: '#14A085',
		enabled: true,
		categories: ['tutoring', 'education']
	},
	brighterly: {
		name: 'Brighterly',
		icon: '✨',
		color: '#FFD700',
		enabled: true,
		categories: ['tutoring', 'education', 'math']
	},
	booknook: {
		name: 'BookNook',
		icon: '📖',
		color: '#8E24AA',
		enabled: true,
		categories: ['tutoring', 'education']
	},
	princetonreview: {
		name: 'Princeton Review',
		icon: '🎓',
		color: '#F44336',
		enabled: true,
		categories: ['tutoring', 'education', 'test-prep']
	},
	kaplan: {
		name: 'Kaplan',
		icon: '📊',
		color: '#2196F3',
		enabled: true,
		categories: ['tutoring', 'education', 'test-prep']
	},
	sylvan: {
		name: 'Sylvan Learning',
		icon: '🌟',
		color: '#FF6B35',
		enabled: true,
		categories: ['tutoring', 'education']
	},
	huntington: {
		name: 'Huntington Learning',
		icon: '🔬',
		color: '#4CAF50',
		enabled: true,
		categories: ['tutoring', 'education', 'test-prep']
	},
	revolutionprep: {
		name: 'Revolution Prep',
		icon: '🚀',
		color: '#9C27B0',
		enabled: true,
		categories: ['tutoring', 'education', 'test-prep']
	},
	etutorworld: {
		name: 'eTutorWorld',
		icon: '🌐',
		color: '#00BCD4',
		enabled: true,
		categories: ['tutoring', 'education']
	},
	
	// Moving & Relocation
	uhaul: {
		name: 'U-Haul Helpers',
		icon: '🚚',
		color: '#FF6B00',
		enabled: true,
		categories: ['moving']
	},
	dolly: {
		name: 'Dolly',
		icon: '📦',
		color: '#00A8E8',
		enabled: true,
		categories: ['moving']
	},
	
	// Cleaning Services
	merrymaids: {
		name: 'Merry Maids',
		icon: '🧹',
		color: '#4CAF50',
		enabled: true,
		categories: ['cleaning']
	},
	mollymaid: {
		name: 'Molly Maid',
		icon: '✨',
		color: '#FFC107',
		enabled: true,
		categories: ['cleaning']
	}
};

// Real API integration functions (to be implemented with actual API keys)
async function fetchRoverResults(serviceType: string, location: string) {
	try {
		// NOTE: Rover requires partner API access. To use this:
		// 1. Apply for Rover Partner API: https://www.rover.com/api/
		// 2. Get API credentials
		// 3. Uncomment and configure below
		
		/*
		const ROVER_API_KEY = process.env.ROVER_API_KEY;
		if (!ROVER_API_KEY) {
			console.warn('Rover API key not configured');
			return [];
		}
		
		const response = await axios.get('https://api.rover.com/v1/sitters/search', {
			headers: { 'Authorization': `Bearer ${ROVER_API_KEY}` },
			params: {
				service_type: serviceType,
				location: location
			}
		});
		
		return response.data.sitters.map((sitter: any) => ({
			id: `rover-${sitter.id}`,
			name: sitter.name,
			platform: 'rover',
			platformName: 'Rover',
			platformIcon: '🐕',
			platformColor: '#00B9B4',
			rating: sitter.rating?.toString() || '4.5',
			reviews: sitter.review_count || 0,
			price: sitter.price_per_night || 0,
			priceUnit: 'night',
			location: sitter.location || location,
			specialties: sitter.services || [],
			verified: sitter.verified || false,
			responseTime: sitter.response_time || '2 hours',
			image: sitter.profile_picture || '',
			externalUrl: `https://www.rover.com/sitters/${sitter.id}`
		}));
		*/
		
		return [];
	} catch (error) {
		console.error('Rover API error:', error);
		return [];
	}
}

async function fetchWagResults(serviceType: string, location: string) {
	try {
		// NOTE: Wag! does not have a public API
		// Contact Wag! for partnership opportunities
		return [];
	} catch (error) {
		console.error('Wag API error:', error);
		return [];
	}
}

// Web search-based approach (using Google Custom Search API - legal alternative)
async function searchPlatformListings(platform: string, serviceType: string, location: string) {
	try {
		const GOOGLE_API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
		const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;
		
		if (!GOOGLE_API_KEY || !GOOGLE_SEARCH_ENGINE_ID) {
			console.warn('Google Search API not configured. Using fallback.');
			return [];
		}
		
		const platformUrls: Record<string, string> = {
			rover: 'site:rover.com',
			wag: 'site:wagwalking.com',
			care: 'site:care.com',
			sittercity: 'site:sittercity.com',
			thumbtack: 'site:thumbtack.com',
			taskrabbit: 'site:taskrabbit.com',
			handy: 'site:handy.com',
			angi: 'site:angi.com',
			homeadvisor: 'site:homeadvisor.com',
			porch: 'site:porch.com',
			takl: 'site:takl.com',
			wyzant: 'site:wyzant.com',
			tutorcom: 'site:tutor.com',
			preply: 'site:preply.com',
			varsitytutors: 'site:varsitytutors.com',
			skooli: 'site:skooli.com',
			tutorme: 'site:tutorme.com',
			chegg: 'site:chegg.com',
			superprof: 'site:superprof.com',
			italki: 'site:italki.com',
			khanacademy: 'site:khanacademy.org',
			petbacker: 'site:petbacker.com',
			holidog: 'site:holidog.com',
			trustedhousesitters: 'site:trustedhousesitters.com',
			dolly: 'site:dolly.com',
			uhaul: 'site:uhaul.com'
		};
		
		const query = `${platformUrls[platform]} ${serviceType} ${location}`;
		
		const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
			params: {
				key: GOOGLE_API_KEY,
				cx: GOOGLE_SEARCH_ENGINE_ID,
				q: query,
				num: 10
			}
		});
		
		// Parse search results to extract provider information
		// This is a simplified example - real implementation would need more parsing
		return (response.data.items || []).map((item: any, index: number) => ({
			id: `${platform}-search-${index}`,
			name: item.title?.split(' - ')[0] || item.title || 'Provider',
			platform,
			platformName: PLATFORMS[platform as keyof typeof PLATFORMS]?.name || platform,
			platformIcon: PLATFORMS[platform as keyof typeof PLATFORMS]?.icon || '🔍',
			platformColor: PLATFORMS[platform as keyof typeof PLATFORMS]?.color || '#6366f1',
			rating: '4.5', // Would need to parse from search result
			reviews: 0,
			price: 0,
			priceUnit: 'hour',
			location: location || 'Your area',
			specialties: [serviceType],
			verified: false,
			responseTime: 'N/A',
			image: '',
			externalUrl: item.link || ''
		}));
	} catch (error) {
		console.error(`Search error for ${platform}:`, error);
		return [];
	}
}

// Get all possible specialties for a service type
function getAllSpecialtiesForService(serviceType: string): string[] {
	const serviceTypeLower = serviceType.toLowerCase();
	
	if (serviceTypeLower.includes('pet') || serviceTypeLower.includes('dog') || serviceTypeLower.includes('cat')) {
		return ['Dog Walking', 'Pet Sitting', 'Overnight Care', 'Pet Grooming', 'Cat Care', 'Puppy Training', 'Senior Pet Care', 'Medication Administration'];
	} else if (serviceTypeLower.includes('handyman') || serviceTypeLower.includes('repair') || serviceTypeLower.includes('painting') || serviceTypeLower.includes('paint')) {
		return ['Home Repairs', 'Furniture Assembly', 'TV Mounting', 'General Handyman', 'Plumbing', 'Electrical Work', 'Carpentry', 'Painting', 'Wall Painting', 'Interior Painting', 'Exterior Painting', 'Drywall Repair', 'Door Installation', 'Home Improvement'];
	} else if (serviceTypeLower.includes('cleaning')) {
		return ['House Cleaning', 'Deep Cleaning', 'Move-in/Move-out Cleaning', 'Window Cleaning', 'Carpet Cleaning', 'Office Cleaning', 'Kitchen Deep Clean', 'Bathroom Cleaning'];
	} else if (serviceTypeLower.includes('moving')) {
		return ['Moving Help', 'Heavy Lifting', 'Furniture Moving', 'Packing Services', 'Loading/Unloading', 'Local Moving', 'Long Distance Moving'];
	} else if (serviceTypeLower.includes('tutor') || serviceTypeLower.includes('education')) {
		return [
			'Math Tutoring', 'Algebra', 'Geometry', 'Calculus', 'Statistics',
			'Science Tutoring', 'Chemistry', 'Physics', 'Biology', 'Earth Science',
			'English Tutoring', 'Reading', 'Writing', 'Literature', 'Grammar',
			'Language Learning', 'Spanish', 'French', 'German', 'Mandarin', 'ESL',
			'Test Prep', 'SAT Prep', 'ACT Prep', 'GRE Prep', 'GMAT Prep', 'AP Exam Prep',
			'History', 'Social Studies', 'Geography', 'Economics',
			'Computer Science', 'Programming', 'Coding',
			'Music', 'Art', 'Homework Help', 'Study Skills', 'Elementary Tutoring', 'High School Tutoring', 'College Tutoring'
		];
	} else {
		return ['General Services', 'Home Services', 'Professional Help', 'Consultation', 'Expert Advice'];
	}
}

// Get varied specialties for a specific provider (randomly selects 2-4 specialties)
function getSpecialtiesForService(serviceType: string, seed?: number): string[] {
	const allSpecialties = getAllSpecialtiesForService(serviceType);
	
	// Use seed for consistent randomness per provider
	let seedValue = seed !== undefined ? seed : Math.floor(Math.random() * 1000000);
	const random = () => {
		seedValue = (seedValue * 9301 + 49297) % 233280;
		return seedValue / 233280;
	};
	
	// Select 2-4 random specialties
	const count = Math.floor(random() * 3) + 2; // 2, 3, or 4 specialties
	const selected: string[] = [];
	const available = [...allSpecialties];
	
	for (let i = 0; i < count && available.length > 0; i++) {
		const index = Math.floor(random() * available.length);
		selected.push(available[index]);
		available.splice(index, 1);
	}
	
	return selected;
}

// Get appropriate price unit based on service type
function getPriceUnitForService(serviceType: string): string {
	const serviceTypeLower = serviceType.toLowerCase();
	
	if (serviceTypeLower.includes('sitting') || serviceTypeLower.includes('overnight')) {
		return 'night';
	} else if (serviceTypeLower.includes('walking') || serviceTypeLower.includes('visit')) {
		return 'visit';
	} else {
		return 'hour';
	}
}

// Fallback: Generate realistic mock data when APIs aren't available
function generateMockResults(platform: string, serviceType: string, location: string, count: number = 5) {
	const results = [];
	const names = [
		['Sarah', 'Michael', 'Emma', 'James', 'Olivia', 'David', 'Sophia', 'Daniel'],
		['Johnson', 'Smith', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis']
	];

	for (let i = 0; i < count; i++) {
		const firstName = names[0][Math.floor(Math.random() * names[0].length)];
		const lastName = names[1][Math.floor(Math.random() * names[1].length)];
		const name = `${firstName} ${lastName}`;
		
		// Use name + platform + index as seed for consistent but varied specialties
		const seed = (name.charCodeAt(0) + platform.charCodeAt(0) + i) * 1000;
		
		results.push({
			id: `${platform}-${i + 1}`,
			name,
			platform,
			platformName: PLATFORMS[platform as keyof typeof PLATFORMS]?.name || platform,
			platformIcon: PLATFORMS[platform as keyof typeof PLATFORMS]?.icon || '🔍',
			platformColor: PLATFORMS[platform as keyof typeof PLATFORMS]?.color || '#6366f1',
			rating: (Math.random() * 1.5 + 3.5).toFixed(1),
			reviews: Math.floor(Math.random() * 200 + 10),
			price: Math.floor(Math.random() * 50 + 20),
			priceUnit: getPriceUnitForService(serviceType === 'general' || serviceType === 'all' ? 'handyman' : serviceType),
			location: location || 'Your area',
			specialties: (serviceType === 'general' || serviceType === 'all') 
				? getSpecialtiesForService('handyman', seed).concat(getSpecialtiesForService('pet care', seed)).slice(0, 3)
				: getSpecialtiesForService(serviceType, seed),
			verified: Math.random() > 0.3,
			responseTime: `${Math.floor(Math.random() * 2 + 1)} hours`,
			image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
			externalUrl: `https://${platform}.com/profile/${name.toLowerCase().replace(' ', '-')}`
		});
	}

	return results;
}

// Aggregate search endpoint
aggregateRouter.get('/search', async (req, res) => {
	try {
		const { serviceType, location, startDate, endDate } = req.query;

		const serviceTypeStr = String(serviceType || 'all').toLowerCase();
		const locationStr = String(location || '');

		// Determine which platforms to search based on service type
		let platformsToSearch: string[] = [];

		// Pet-related services - Comprehensive pet care platforms
		if (
			serviceTypeStr.includes('pet') ||
			serviceTypeStr.includes('dog') ||
			serviceTypeStr.includes('cat') ||
			serviceTypeStr.includes('animal') ||
			serviceTypeStr === 'pet sitting' ||
			serviceTypeStr === 'dog walking'
		) {
			platformsToSearch = ['rover', 'wag', 'care', 'sittercity', 'petbacker', 'holidog', 'trustedhousesitters'];
		}
		// Home services (cleaning, repairs, handyman) - Comprehensive home service platforms
		else if (
			serviceTypeStr.includes('handyman') ||
			serviceTypeStr.includes('repair') ||
			serviceTypeStr.includes('home repair') ||
			serviceTypeStr.includes('plumbing') ||
			serviceTypeStr.includes('electrical') ||
			serviceTypeStr.includes('carpentry') ||
			serviceTypeStr.includes('fix') ||
			serviceTypeStr.includes('installation') ||
			serviceTypeStr.includes('painting') ||
			serviceTypeStr.includes('paint') ||
			serviceTypeStr.includes('wall painting')
		) {
			platformsToSearch = ['thumbtack', 'taskrabbit', 'care', 'handy', 'angi', 'homeadvisor', 'porch', 'takl'];
		}
		// Cleaning services - All cleaning platforms
		else if (
			serviceTypeStr.includes('cleaning') ||
			serviceTypeStr.includes('house cleaning') ||
			serviceTypeStr.includes('home cleaning')
		) {
			platformsToSearch = ['care', 'thumbtack', 'taskrabbit', 'handy', 'takl', 'merrymaids', 'mollymaid'];
		}
		// Moving services - All moving platforms
		else if (
			serviceTypeStr.includes('moving') ||
			serviceTypeStr.includes('mover') ||
			serviceTypeStr.includes('relocation')
		) {
			platformsToSearch = ['taskrabbit', 'thumbtack', 'dolly', 'uhaul'];
		}
		// Tutoring/Education - Comprehensive tutoring platforms
		else if (
			serviceTypeStr.includes('tutor') ||
			serviceTypeStr.includes('education') ||
			serviceTypeStr.includes('teaching') ||
			serviceTypeStr.includes('test prep') ||
			serviceTypeStr.includes('test preparation') ||
			serviceTypeStr.includes('sat') ||
			serviceTypeStr.includes('act') ||
			serviceTypeStr.includes('language') ||
			serviceTypeStr.includes('math tutor') ||
			serviceTypeStr.includes('science tutor')
		) {
			platformsToSearch = [
				'care', 'thumbtack', 'wyzant', 'tutorcom', 'preply', 'varsitytutors', 
				'skooli', 'tutorme', 'chegg', 'superprof', 'italki', 'khanacademy',
				'brighterly', 'booknook', 'princetonreview', 'kaplan', 'sylvan',
				'huntington', 'revolutionprep', 'etutorworld'
			];
		}
		// General/home services - Broad search
		else if (
			serviceTypeStr.includes('home') ||
			serviceTypeStr.includes('house')
		) {
			platformsToSearch = ['care', 'thumbtack', 'taskrabbit', 'handy', 'angi', 'homeadvisor', 'porch'];
		}
		// 'all' service type - search all platforms
		else if (serviceTypeStr === 'all') {
			platformsToSearch = Object.keys(PLATFORMS).filter(key => PLATFORMS[key as keyof typeof PLATFORMS]?.enabled);
		}
		// Default: search all platforms for maximum coverage
		else {
			platformsToSearch = Object.keys(PLATFORMS).filter(key => PLATFORMS[key as keyof typeof PLATFORMS]?.enabled);
		}

		// Aggregate results from all platforms
		const allResults: any[] = [];
		
		// Try to fetch real data from each platform
		for (const platform of platformsToSearch) {
			if (PLATFORMS[platform as keyof typeof PLATFORMS]?.enabled) {
				let platformResults: any[] = [];
				
				try {
					// Try real API first (if configured)
					if (platform === 'rover') {
						platformResults = await fetchRoverResults(serviceTypeStr, locationStr);
					} else if (platform === 'wag') {
						platformResults = await fetchWagResults(serviceTypeStr, locationStr);
					}
					
					// If no API results, try web search (if Google Search API is configured)
					if (platformResults.length === 0 && process.env.GOOGLE_SEARCH_API_KEY) {
						platformResults = await searchPlatformListings(platform, serviceTypeStr, locationStr);
					}
					
					// Fallback to mock data if no real data available
					// Generate more results for tutoring searches (more platforms available)
					// For 'all' service type, generate fewer results per platform
					const resultCount = serviceTypeStr === 'all' ? 2 : 
						(serviceTypeStr.includes('tutor') || serviceTypeStr.includes('education') ? 3 : 4);
					if (platformResults.length === 0) {
						const mockServiceType = serviceTypeStr === 'all' ? 'general' : serviceTypeStr;
						platformResults = generateMockResults(platform, mockServiceType, locationStr, resultCount);
					}
					
					allResults.push(...platformResults);
				} catch (error) {
					console.error(`Error fetching ${platform} results:`, error);
					// Fallback to mock data on error
					const fallbackResults = generateMockResults(platform, serviceTypeStr, locationStr, 4);
					allResults.push(...fallbackResults);
				}
			}
		}

		// Sort by rating (highest first)
		allResults.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

		// Group by platform for easier display
		const groupedByPlatform: Record<string, any[]> = {};
		allResults.forEach(result => {
			if (!groupedByPlatform[result.platform]) {
				groupedByPlatform[result.platform] = [];
			}
			groupedByPlatform[result.platform].push(result);
		});

		res.json({
			results: allResults,
			groupedByPlatform,
			platforms: platformsToSearch.map(p => ({
				name: PLATFORMS[p as keyof typeof PLATFORMS]?.name,
				icon: PLATFORMS[p as keyof typeof PLATFORMS]?.icon,
				color: PLATFORMS[p as keyof typeof PLATFORMS]?.color,
				count: groupedByPlatform[p]?.length || 0
			})),
			total: allResults.length,
			query: {
				serviceType,
				location: locationStr,
				startDate,
				endDate
			}
		});
	} catch (error: any) {
		console.error('Aggregate search error:', error);
		res.status(500).json({ error: 'Failed to aggregate search results' });
	}
});

// Get available platforms
aggregateRouter.get('/platforms', (req, res) => {
	res.json({
		platforms: Object.entries(PLATFORMS).map(([key, value]) => ({
			id: key,
			...value
		}))
	});
});

