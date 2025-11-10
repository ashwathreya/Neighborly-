import { SitterCard } from '../components/SitterCard';

async function fetchSitters(searchParams: Record<string, string | string[] | undefined>) {
	// Placeholder client to API
	const query = new URLSearchParams(
		Object.fromEntries(Object.entries(searchParams).map(([k, v]) => [k, String(v ?? '')]))
	).toString();
	const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
	const res = await fetch(`${base}/sitters?${query}`, { cache: 'no-store' });
	if (!res.ok) return [];
	return res.json();
}

export default async function SearchPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
	const sitters = await fetchSitters(searchParams);
	return (
		<main style={{ padding: 24 }}>
			<h2>Search Results</h2>
			<div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
				{sitters.map((s: any) => (
					<SitterCard key={s.id} sitter={s} />
				))}
				{sitters.length === 0 ? <p>No sitters found for your filters.</p> : null}
			</div>
		</main>
	);
}


