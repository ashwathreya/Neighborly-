const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Helper function to wait
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Create screenshots directory
const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function captureDashboardScreenshots() {
  console.log('🚀 Starting dashboard screenshot capture...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const baseUrl = 'http://localhost:3000';
  
  try {
    // Wait for server
    console.log('⏳ Connecting to server...');
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
    await wait(1000);

    // Set up user session (login)
    console.log('🔐 Setting up user session...');
    await page.evaluate(() => {
      localStorage.setItem('user', JSON.stringify({ 
        name: 'John Doe', 
        email: 'john.doe@example.com', 
        role: 'user',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, Los Angeles, CA 90210',
        bio: 'Experienced pet owner and service provider'
      }));
      localStorage.setItem('token', 'mock-auth-token-12345');
    });

    // 25. Dashboard Main Page
    console.log('📸 Capturing dashboard main page...');
    await page.goto(`${baseUrl}/dashboard`, { waitUntil: 'networkidle2' });
    await wait(1500);
    await page.screenshot({
      path: path.join(screenshotsDir, '25_dashboard_main.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    // 26. Dashboard Profile Page
    console.log('📸 Capturing dashboard profile page...');
    await page.goto(`${baseUrl}/dashboard/profile`, { waitUntil: 'networkidle2' });
    await wait(1500);
    await page.screenshot({
      path: path.join(screenshotsDir, '26_dashboard_profile.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    // 27. Dashboard Profile Page - Form Fields (close-up)
    console.log('📸 Capturing profile form fields...');
    await page.goto(`${baseUrl}/dashboard/profile`, { waitUntil: 'networkidle2' });
    await wait(1500);
    // Scroll to form section
    await page.evaluate(() => window.scrollTo(0, 200));
    await wait(500);
    await page.screenshot({
      path: path.join(screenshotsDir, '27_dashboard_profile_form.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: false
    });

    // 28. Dashboard Settings Page
    console.log('📸 Capturing dashboard settings page...');
    await page.goto(`${baseUrl}/dashboard/settings`, { waitUntil: 'networkidle2' });
    await wait(1500);
    await page.screenshot({
      path: path.join(screenshotsDir, '28_dashboard_settings.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    // 29. Dashboard Settings - Notifications Section
    console.log('📸 Capturing settings notifications section...');
    await page.goto(`${baseUrl}/dashboard/settings`, { waitUntil: 'networkidle2' });
    await wait(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await wait(500);
    await page.screenshot({
      path: path.join(screenshotsDir, '29_dashboard_settings_notifications.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: false
    });

    // 30. Dashboard Settings - Privacy Section
    console.log('📸 Capturing settings privacy section...');
    await page.goto(`${baseUrl}/dashboard/settings`, { waitUntil: 'networkidle2' });
    await wait(1500);
    await page.evaluate(() => window.scrollTo(0, 400));
    await wait(500);
    await page.screenshot({
      path: path.join(screenshotsDir, '30_dashboard_settings_privacy.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: false
    });

    // 31. Dashboard Bookings Page
    console.log('📸 Capturing dashboard bookings page...');
    await page.goto(`${baseUrl}/dashboard/bookings`, { waitUntil: 'networkidle2' });
    await wait(1500);
    await page.screenshot({
      path: path.join(screenshotsDir, '31_dashboard_bookings.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    // 32. Dashboard Messages Page
    console.log('📸 Capturing dashboard messages page...');
    await page.goto(`${baseUrl}/dashboard/messages`, { waitUntil: 'networkidle2' });
    await wait(1500);
    await page.screenshot({
      path: path.join(screenshotsDir, '32_dashboard_messages.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    // 33. Dashboard Navigation Menu
    console.log('📸 Capturing dashboard navigation menu...');
    await page.goto(`${baseUrl}/dashboard`, { waitUntil: 'networkidle2' });
    await wait(1500);
    // Capture the sidebar/navigation
    const navElement = await page.evaluateHandle(() => {
      const navs = Array.from(document.querySelectorAll('nav, [style*="sidebar"], [style*="navigation"]'));
      return navs[0] || document.querySelector('header');
    });
    if (navElement && navElement.asElement()) {
      await navElement.asElement().screenshot({
        path: path.join(screenshotsDir, '33_dashboard_navigation.jpg'),
        type: 'jpeg',
        quality: 90
      });
    } else {
      // Fallback: capture header area
      await page.screenshot({
        path: path.join(screenshotsDir, '33_dashboard_navigation.jpg'),
        type: 'jpeg',
        quality: 90,
        clip: { x: 0, y: 0, width: 1920, height: 150 }
      });
    }

    // 34. Dashboard Mobile View
    console.log('📸 Capturing dashboard mobile view...');
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(`${baseUrl}/dashboard`, { waitUntil: 'networkidle2' });
    await wait(1500);
    await page.screenshot({
      path: path.join(screenshotsDir, '34_dashboard_mobile.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    // 35. Dashboard Profile Mobile View
    console.log('📸 Capturing dashboard profile mobile view...');
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(`${baseUrl}/dashboard/profile`, { waitUntil: 'networkidle2' });
    await wait(1500);
    await page.screenshot({
      path: path.join(screenshotsDir, '35_dashboard_profile_mobile.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    // Reset viewport
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('✅ Dashboard screenshots captured!');
    const finalCount = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.jpg')).length;
    console.log(`📁 Total screenshots: ${finalCount}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

captureDashboardScreenshots().catch(console.error);

