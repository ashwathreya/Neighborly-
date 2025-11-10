export type UserRole = 'owner' | 'sitter';

export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
}

export interface SitterProfile {
	id: string;
	userId: string;
	name: string;
	bio: string;
	specialties: string[];
	baseRate: number;
	rating?: number;
	reviews?: Review[];
}

export interface Booking {
	id: string;
	ownerId: string;
	sitterId: string;
	startDate: string;
	endDate: string;
	total: number;
	status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export interface Review {
	id: string;
	bookingId: string;
	reviewerId: string;
	rating: number;
	comment: string;
}


