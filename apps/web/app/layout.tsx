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
				{children}
			</body>
		</html>
	);
}
