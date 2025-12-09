export const metadata = {
	title: 'Neighborly - Your All-in-One Neighborhood Marketplace',
	description: 'Find pet sitters, handymen, tutors, local services, and connect with your community—all in one place. Trusted, verified, and transparent.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body
				style={{
					margin: 0,
					fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
					WebkitFontSmoothing: 'antialiased',
					MozOsxFontSmoothing: 'grayscale',
					background: '#ffffff',
					color: '#111827',
					lineHeight: 1.6
				}}
			>
				<style>{`
					@keyframes float0 {
						0%, 100% { transform: translate(0, 0) rotate(0deg); }
						25% { transform: translate(20px, -30px) rotate(90deg); }
						50% { transform: translate(-15px, -60px) rotate(180deg); }
						75% { transform: translate(-30px, -30px) rotate(270deg); }
					}
					@keyframes float1 {
						0%, 100% { transform: translate(0, 0) rotate(0deg); }
						33% { transform: translate(-25px, 25px) rotate(120deg); }
						66% { transform: translate(25px, -25px) rotate(240deg); }
					}
					@keyframes float2 {
						0%, 100% { transform: translate(0, 0) rotate(0deg); }
						20% { transform: translate(30px, 20px) rotate(72deg); }
						40% { transform: translate(-20px, 40px) rotate(144deg); }
						60% { transform: translate(-40px, 20px) rotate(216deg); }
						80% { transform: translate(20px, -20px) rotate(288deg); }
					}
				`}</style>
				{children}
			</body>
		</html>
	);
}
