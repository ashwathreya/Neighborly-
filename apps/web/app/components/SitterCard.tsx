import Link from 'next/link';

export function SitterCard({ sitter }: { sitter: any }) {
	return (
		<div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16, background: 'white' }}>
			<h4 style={{ marginTop: 0 }}>{sitter.name}</h4>
			<p style={{ margin: '8px 0' }}>
				{Array.isArray(sitter.specialties) ? sitter.specialties.join(', ') : sitter.specialties}
			</p>
			<p style={{ margin: '8px 0' }}>Rating: {sitter.rating ?? 'N/A'}</p>
			<p style={{ margin: '8px 0' }}>From ${sitter.baseRate}/day</p>
			<Link href={`/profile/${sitter.id}`}>View profile</Link>
		</div>
	);
}


