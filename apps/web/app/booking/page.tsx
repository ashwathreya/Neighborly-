async function quote() {
	const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
	const res = await fetch(`${base}/bookings/quote?days=3&baseRate=40`, { cache: 'no-store' });
	if (!res.ok) return null;
	return res.json();
}

export default async function BookingPage() {
	const q = await quote();
	return (
		<main style={{ padding: 24 }}>
			<h2>Booking</h2>
			<p>Example quote (3 days @ $40/day):</p>
			<pre style={{ background: '#f9fafb', padding: 12, borderRadius: 8 }}>{JSON.stringify(q, null, 2)}</pre>
			{q?.policy ? <p>Policy: {q.policy.cancellation}</p> : null}
			<p>Checkout and policies to be added.</p>
		</main>
	);
}


