const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const screenshotsDir = path.join(__dirname, 'screenshots');
const explorationsDir = path.join(__dirname, 'explorations');

if (!fs.existsSync(screenshotsDir)) {
	fs.mkdirSync(screenshotsDir, { recursive: true });
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const explorations = [
	{
		file: 'card-layout-variation-1-list.html',
		name: '01_exploration_card_layout_list',
		description: 'List Layout - Simple list view'
	},
	{
		file: 'card-layout-variation-2-cards.html',
		name: '02_exploration_card_layout_cards',
		description: 'Card Layout - Grid-based cards'
	},
	{
		file: 'filter-placement-top.html',
		name: '03_exploration_filters_top',
		description: 'Filters at Top - Horizontal filter bar'
	},
	{
		file: 'filter-placement-sidebar.html',
		name: '04_exploration_filters_sidebar',
		description: 'Filters in Sidebar - Vertical sidebar'
	},
	{
		file: 'modal-vs-fullpage-modal.html',
		name: '05_exploration_modal_view',
		description: 'Modal Detail View - Overlay modal'
	},
	{
		file: 'modal-vs-fullpage-fullpage.html',
		name: '06_exploration_fullpage_view',
		description: 'Full Page Detail View - Dedicated page'
	},
	{
		file: 'hierarchy-before.html',
		name: '07_exploration_hierarchy_before',
		description: 'Hierarchy Before - Visual noise'
	},
	{
		file: 'hierarchy-after.html',
		name: '08_exploration_hierarchy_after',
		description: 'Hierarchy After - Refined'
	},
	{
		file: 'mobile-before.html',
		name: '09_exploration_mobile_before',
		description: 'Mobile Before - Not responsive',
		viewport: { width: 375, height: 812 } // iPhone size
	},
	{
		file: 'mobile-after.html',
		name: '10_exploration_mobile_after',
		description: 'Mobile After - Responsive',
		viewport: { width: 375, height: 812 } // iPhone size
	}
];

async function captureExplorations() {
	console.log('🚀 Starting design exploration screenshot capture...\n');

	const browser = await puppeteer.launch({
		headless: true, // Headless for faster execution
		defaultViewport: { width: 1920, height: 1080 }
	});

	try {
		for (const exploration of explorations) {
			console.log(`📸 Capturing: ${exploration.description}...`);
			
			const page = await browser.newPage();
			
			// Set viewport for mobile explorations
			if (exploration.viewport) {
				await page.setViewport(exploration.viewport);
			}
			
			const filePath = path.join(explorationsDir, exploration.file);
			if (!fs.existsSync(filePath)) {
				console.log(`⚠️  File not found: ${filePath}, skipping...\n`);
				await page.close();
				continue;
			}
			await page.goto(`file://${filePath}`, { waitUntil: 'networkidle2', timeout: 10000 });
			await wait(1500);
			
			await page.screenshot({
				path: path.join(screenshotsDir, `${exploration.name}.jpg`),
				type: 'jpeg',
				quality: 90,
				fullPage: true
			});
			
			console.log(`✅ Captured: ${exploration.name}.jpg\n`);
			await page.close();
		}

		console.log('✨ All exploration screenshots captured successfully!');
		console.log(`📁 Screenshots saved to: ${screenshotsDir}`);
		console.log(`\n📊 Summary:`);
		console.log(`   - Card Layout Variations: 2`);
		console.log(`   - Filter Placement: 2`);
		console.log(`   - Modal vs Full Page: 2`);
		console.log(`   - Hierarchy Adjustments: 2`);
		console.log(`   - Mobile Adjustments: 2`);
		console.log(`   - Total: 10 exploration screenshots`);

	} catch (error) {
		console.error('❌ Error capturing screenshots:', error);
	} finally {
		await browser.close();
	}
}

captureExplorations().catch(console.error);

