import type { Booking, Review, SitterProfile, User } from './types';

let idCounter = 1;
function genId() {
	return String(idCounter++);
}

export const users: User[] = [
	{ id: genId(), name: 'Alice Owner', email: 'alice@example.com', role: 'owner' },
	{ id: genId(), name: 'Sam Sitter', email: 'sam@example.com', role: 'sitter' }
];

export const sitters: SitterProfile[] = [
	{
		id: genId(),
		userId: users[1].id,
		name: 'Sam Sitter',
		bio: 'Experienced dog walker and overnight sitter. First aid trained.',
		specialties: ['dog', 'senior care', 'medication'],
		baseRate: 40,
		rating: 4.9,
		reviews: []
	}
];

export const bookings: Booking[] = [];
export const reviews: Review[] = [];

export const db = {
	genId,
	users,
	sitters,
	bookings,
	reviews
};


