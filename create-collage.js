const https = require('https');
const fs = require('fs');
const path = require('path');

// Image URLs from the homepage collage
const imageUrls = [
	// Pet Care - Top Left
	'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop&q=80',
	// Home Improvement - Top Center
	'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&q=80',
	// Tutoring - Top Right
	'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop&q=80',
	// Event Planning - Bottom Left
	'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop&q=80',
	// Child Care - Bottom Center
	'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop&q=80',
	// Cleaning Services - Bottom Right
	'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80'
];

// Download an image from URL
function downloadImage(url, filepath) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(filepath);
		https.get(url, (response) => {
			if (response.statusCode === 301 || response.statusCode === 302) {
				// Handle redirects
				return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
			}
			response.pipe(file);
			file.on('finish', () => {
				file.close();
				resolve(filepath);
			});
		}).on('error', (err) => {
			fs.unlink(filepath, () => {});
			reject(err);
		});
	});
}

// Main function to create collage
async function createCollage() {
	console.log('🎨 Creating service collage image...\n');
	
	// Create temp directory
	const tempDir = path.join(__dirname, 'temp-images');
	if (!fs.existsSync(tempDir)) {
		fs.mkdirSync(tempDir);
	}
	
	try {
		// Download all images
		console.log('📥 Downloading images...');
		const downloadedImages = [];
		for (let i = 0; i < imageUrls.length; i++) {
			const url = imageUrls[i];
			const filepath = path.join(tempDir, `image-${i}.jpg`);
			console.log(`  Downloading image ${i + 1}/${imageUrls.length}...`);
			await downloadImage(url, filepath);
			downloadedImages.push(filepath);
		}
		
		console.log('\n✅ All images downloaded!\n');
		console.log('📦 Combining images into collage...');
		
		// Use sharp library to combine images
		// First, check if sharp is installed
		let sharp;
		try {
			sharp = require('sharp');
		} catch (e) {
			console.log('\n⚠️  Sharp library not found. Installing...\n');
			const { execSync } = require('child_process');
			execSync('npm install sharp', { stdio: 'inherit' });
			sharp = require('sharp');
		}
		
		// Load all images
		const images = await Promise.all(
			downloadedImages.map(filepath => sharp(filepath).resize(800, 600).toBuffer())
		);
		
		// Create a 3x2 grid collage
		// Final dimensions: 2400x1200 (3 columns x 800, 2 rows x 600)
		const collageWidth = 2400;
		const collageHeight = 1200;
		
		// Create canvas
		const canvas = sharp({
			create: {
				width: collageWidth,
				height: collageHeight,
				channels: 3,
				background: { r: 255, g: 255, b: 255 }
			}
		});
		
		// Composite images in grid layout
		const composites = [];
		
		// Row 1: Top row (y = 0)
		composites.push({ input: images[0], left: 0, top: 0 });      // Pet Care - Top Left
		composites.push({ input: images[1], left: 800, top: 0 });   // Home Improvement - Top Center
		composites.push({ input: images[2], left: 1600, top: 0 });  // Tutoring - Top Right
		
		// Row 2: Bottom row (y = 600)
		composites.push({ input: images[3], left: 0, top: 600 });   // Event Planning - Bottom Left
		composites.push({ input: images[4], left: 800, top: 600 }); // Child Care - Bottom Center
		composites.push({ input: images[5], left: 1600, top: 600 }); // Cleaning - Bottom Right
		
		// Combine all images
		const outputPath = path.join(__dirname, 'homepage-collage.jpg');
		await canvas.composite(composites).jpeg({ quality: 90 }).toFile(outputPath);
		
		console.log(`\n✅ Collage created successfully!`);
		console.log(`📁 Saved to: ${outputPath}\n`);
		console.log(`📐 Dimensions: ${collageWidth}x${collageHeight}px\n`);
		
		// Clean up temp files
		console.log('🧹 Cleaning up temporary files...');
		downloadedImages.forEach(filepath => {
			if (fs.existsSync(filepath)) {
				fs.unlinkSync(filepath);
			}
		});
		if (fs.existsSync(tempDir)) {
			fs.rmdirSync(tempDir);
		}
		console.log('✅ Done!\n');
		
	} catch (error) {
		console.error('\n❌ Error creating collage:', error);
		process.exit(1);
	}
}

// Run the script
createCollage();

