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

async function captureScreenshots() {
  console.log('🚀 Starting screenshot capture...');
  
  const browser = await puppeteer.launch({
    headless: 'new', // Use new headless mode for better performance
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const baseUrl = 'http://localhost:3000';
  
  try {
    // Wait for server to be ready with retries
    console.log('⏳ Waiting for server to be ready...');
    let serverReady = false;
    let retries = 0;
    const maxRetries = 10;
    
    while (!serverReady && retries < maxRetries) {
      try {
        const response = await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 5000 });
        if (response && response.status() < 400) {
          serverReady = true;
          console.log('✅ Server is ready!');
        } else {
          throw new Error('Server returned error status');
        }
      } catch (error) {
        retries++;
        if (retries < maxRetries) {
          console.log(`⏳ Retrying connection (${retries}/${maxRetries})...`);
          await wait(500);
        } else {
          console.error('❌ Could not connect to server. Please ensure:');
          console.error('   1. Development server is running: npm run dev');
          console.error('   2. Server is accessible at http://localhost:3000');
          throw error;
        }
      }
    }
    
    if (!serverReady) {
      throw new Error('Server is not responding. Please make sure the dev server is running on http://localhost:3000');
    }
    
    await wait(1000); // Wait for animations

    // 1. Homepage Hero Section (Logged Out)
    console.log('📸 Capturing homepage hero section...');
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await wait(2000);
    await page.screenshot({
      path: path.join(screenshotsDir, '01_homepage_hero_logged_out.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: false,
      clip: { x: 0, y: 0, width: 1920, height: 800 }
    });

    // 2. Homepage Service Categories Section
    console.log('📸 Capturing service categories section...');
    await page.evaluate(() => window.scrollTo(0, 600));
    await wait(1000);
    await page.screenshot({
      path: path.join(screenshotsDir, '02_homepage_service_categories.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: false
    });

    // 3. Homepage How It Works Section
    console.log('📸 Capturing how it works section...');
    await page.evaluate(() => window.scrollTo(0, 1200));
    await wait(1000);
    await page.screenshot({
      path: path.join(screenshotsDir, '03_homepage_how_it_works.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: false
    });

    // 4. Homepage Testimonials Section
    console.log('📸 Capturing testimonials section...');
    await page.evaluate(() => window.scrollTo(0, 1800));
    await wait(1000);
    await page.screenshot({
      path: path.join(screenshotsDir, '04_homepage_testimonials.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: false
    });

    // 5. Search Results Page - Full View
    console.log('📸 Capturing search results page...');
    await page.goto(`${baseUrl}/search?serviceType=pet%20care&location=90210`, { waitUntil: 'networkidle2' });
    await wait(2000); // Wait for results to load
    await page.screenshot({
      path: path.join(screenshotsDir, '05_search_results_full_page.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    // 6. Search Results - Filter Sidebar Expanded
    console.log('📸 Capturing filter sidebar...');
    await page.goto(`${baseUrl}/search?serviceType=pet%20care&location=90210`, { waitUntil: 'networkidle2' });
    await wait(3000);
    const filterSidebar = await page.$('aside');
    if (filterSidebar) {
      await filterSidebar.screenshot({
        path: path.join(screenshotsDir, '06_filter_sidebar_expanded.jpg'),
        type: 'jpeg',
        quality: 90
      });
    }

    // 7. Provider Card - Default State
    console.log('📸 Capturing provider card (default)...');
    await page.goto(`${baseUrl}/search?serviceType=pet%20care&location=90210`, { waitUntil: 'networkidle2' });
    await wait(3000);
    const providerCard = await page.$('[style*="background: white"][style*="borderRadius"]');
    if (providerCard) {
      await providerCard.screenshot({
        path: path.join(screenshotsDir, '07_provider_card_default.jpg'),
        type: 'jpeg',
        quality: 90
      });
    }

    // 8. Provider Card - Hover State (simulated)
    console.log('📸 Capturing provider card (hover)...');
    await page.goto(`${baseUrl}/search?serviceType=pet%20care&location=90210`, { waitUntil: 'networkidle2' });
    await wait(3000);
    const firstCard = await page.$('[style*="background: white"][style*="borderRadius"]');
    if (firstCard) {
      await firstCard.hover();
      await wait(500);
      await firstCard.screenshot({
        path: path.join(screenshotsDir, '08_provider_card_hover.jpg'),
        type: 'jpeg',
        quality: 90
      });
    }

    // 9. Platform Filter Tabs
    console.log('📸 Capturing platform filter tabs...');
    await page.goto(`${baseUrl}/search?serviceType=pet%20care&location=90210`, { waitUntil: 'networkidle2' });
    await wait(3000);
    const platformTabs = await page.$('[style*="display: flex"][style*="gap: 8px"]');
    if (platformTabs) {
      await platformTabs.screenshot({
        path: path.join(screenshotsDir, '09_platform_filter_tabs.jpg'),
        type: 'jpeg',
        quality: 90
      });
    }

    // 10. Provider Detail Modal - Overview Tab
    console.log('📸 Capturing provider modal (overview)...');
    await page.goto(`${baseUrl}/search?serviceType=pet%20care&location=90210`, { waitUntil: 'networkidle2' });
    await wait(3000);
    // Click on first provider card - try multiple selectors
    const firstProviderCard = await page.evaluateHandle(() => {
      const cards = Array.from(document.querySelectorAll('[style*="cursor: pointer"]'));
      return cards.find(card => 
        card.textContent && 
        (card.textContent.includes('⭐') || card.textContent.includes('$'))
      );
    });
    if (firstProviderCard && firstProviderCard.asElement()) {
      await firstProviderCard.asElement().click();
      await wait(500);
      const modal = await page.$('[style*="position: fixed"]');
      if (modal) {
        await modal.screenshot({
          path: path.join(screenshotsDir, '10_provider_modal_overview.jpg'),
          type: 'jpeg',
          quality: 90
        });
      }
    }

    // 11. Provider Detail Modal - Experience Tab
    console.log('📸 Capturing provider modal (experience)...');
    await page.goto(`${baseUrl}/search?serviceType=pet%20care&location=90210`, { waitUntil: 'networkidle2' });
    await wait(3000);
    const card = await page.evaluateHandle(() => {
      const cards = Array.from(document.querySelectorAll('[style*="cursor: pointer"]'));
      return cards.find(card => 
        card.textContent && 
        (card.textContent.includes('⭐') || card.textContent.includes('$'))
      );
    });
    if (card && card.asElement()) {
      await card.asElement().click();
      await wait(500);
      // Click Experience tab
      const experienceTab = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(b => 
          b.textContent?.toLowerCase().includes('experience') || 
          b.textContent?.includes('Experience')
        );
      });
      if (experienceTab && experienceTab.asElement()) {
        await experienceTab.asElement().click();
        await wait(500);
        const modal = await page.$('[style*="position: fixed"]');
        if (modal) {
          await modal.screenshot({
            path: path.join(screenshotsDir, '11_provider_modal_experience.jpg'),
            type: 'jpeg',
            quality: 90
          });
        }
      }
    }

    // 12. Provider Detail Modal - Portfolio Tab
    console.log('📸 Capturing provider modal (portfolio)...');
    await page.goto(`${baseUrl}/search?serviceType=pet%20care&location=90210`, { waitUntil: 'networkidle2' });
    await wait(3000);
    const providerCard2 = await page.evaluateHandle(() => {
      const cards = Array.from(document.querySelectorAll('[style*="cursor: pointer"]'));
      return cards.find(card => 
        card.textContent && 
        (card.textContent.includes('⭐') || card.textContent.includes('$'))
      );
    });
    if (providerCard2 && providerCard2.asElement()) {
      await providerCard2.asElement().click();
      await wait(500);
      // Click Portfolio tab
      const portfolioTab = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(b => 
          b.textContent?.toLowerCase().includes('portfolio') || 
          b.textContent?.includes('Portfolio')
        );
      });
      if (portfolioTab && portfolioTab.asElement()) {
        await portfolioTab.asElement().click();
        await wait(500);
        const modal = await page.$('[style*="position: fixed"]');
        if (modal) {
          await modal.screenshot({
            path: path.join(screenshotsDir, '12_provider_modal_portfolio.jpg'),
            type: 'jpeg',
            quality: 90
          });
        }
      }
    }

    // 13. Provider Detail Modal - Reviews Tab
    console.log('📸 Capturing provider modal (reviews)...');
    await page.goto(`${baseUrl}/search?serviceType=pet%20care&location=90210`, { waitUntil: 'networkidle2' });
    await wait(3000);
    const providerCard3 = await page.evaluateHandle(() => {
      const cards = Array.from(document.querySelectorAll('[style*="cursor: pointer"]'));
      return cards.find(card => 
        card.textContent && 
        (card.textContent.includes('⭐') || card.textContent.includes('$'))
      );
    });
    if (providerCard3 && providerCard3.asElement()) {
      await providerCard3.asElement().click();
      await wait(500);
      // Click Reviews tab
      const reviewsTab = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(b => 
          b.textContent?.toLowerCase().includes('reviews') || 
          b.textContent?.includes('Reviews')
        );
      });
      if (reviewsTab && reviewsTab.asElement()) {
        await reviewsTab.asElement().click();
        await wait(500);
        const modal = await page.$('[style*="position: fixed"]');
        if (modal) {
          await modal.screenshot({
            path: path.join(screenshotsDir, '13_provider_modal_reviews.jpg'),
            type: 'jpeg',
            quality: 90
          });
        }
      }
    }

    // 14. Login Modal
    console.log('📸 Capturing login modal...');
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await wait(2000);
    // Clear any existing login state
    await page.evaluate(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    });
    await page.reload({ waitUntil: 'networkidle2' });
    await wait(2000);
    // Click Sign In button
    const signInButton = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.find(b => 
        b.textContent?.includes('Sign In') || 
        b.textContent?.includes('Sign in') ||
        b.textContent?.trim() === 'Sign In'
      );
    });
    if (signInButton && signInButton.asElement()) {
      await signInButton.asElement().click();
      await wait(500);
      const loginModal = await page.$('[style*="position: fixed"]');
      if (loginModal) {
        await loginModal.screenshot({
          path: path.join(screenshotsDir, '14_login_modal.jpg'),
          type: 'jpeg',
          quality: 90
        });
      }
    }

    // 15. Mobile View - Homepage
    console.log('📸 Capturing mobile view (homepage)...');
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await wait(2000);
    await page.screenshot({
      path: path.join(screenshotsDir, '15_mobile_homepage.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    // 16. Mobile View - Search Results
    console.log('📸 Capturing mobile view (search results)...');
    await page.setViewport({ width: 375, height: 667 });
    await page.goto(`${baseUrl}/search?serviceType=pet%20care&location=90210`, { waitUntil: 'networkidle2' });
    await wait(3000);
    await page.screenshot({
      path: path.join(screenshotsDir, '16_mobile_search_results.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    // 17. Tablet View
    console.log('📸 Capturing tablet view...');
    await page.setViewport({ width: 768, height: 1024 });
    await page.goto(`${baseUrl}/search?serviceType=pet%20care&location=90210`, { waitUntil: 'networkidle2' });
    await wait(3000);
    await page.screenshot({
      path: path.join(screenshotsDir, '17_tablet_search_results.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    // 18. Empty State
    console.log('📸 Capturing empty state...');
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`${baseUrl}/search?serviceType=invalid&location=99999`, { waitUntil: 'networkidle2' });
    await wait(3000);
    await page.screenshot({
      path: path.join(screenshotsDir, '18_empty_state.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: false
    });

    // 19. Smart Keyword Search in Action
    console.log('📸 Capturing smart keyword search...');
    await page.goto(`${baseUrl}/search?serviceType=pet%20care&location=90210`, { waitUntil: 'networkidle2' });
    await wait(3000);
    // Type in keyword field
    const keywordInput = await page.$('input[placeholder*="Try:"]');
    if (keywordInput) {
      await keywordInput.type('math', { delay: 100 });
      await wait(500);
      await page.screenshot({
        path: path.join(screenshotsDir, '19_smart_keyword_search.jpg'),
        type: 'jpeg',
        quality: 90,
        fullPage: false
      });
    }

    // 20. Price Range Slider
    console.log('📸 Capturing price range slider...');
    await page.goto(`${baseUrl}/search?serviceType=pet%20care&location=90210`, { waitUntil: 'networkidle2' });
    await wait(3000);
    const sliderSection = await page.evaluateHandle(() => {
      const labels = Array.from(document.querySelectorAll('label'));
      const payRateLabel = labels.find(l => l.textContent?.includes('Pay Rate'));
      return payRateLabel?.closest('div');
    });
    if (sliderSection) {
      await sliderSection.screenshot({
        path: path.join(screenshotsDir, '20_price_range_slider.jpg'),
        type: 'jpeg',
        quality: 90
      });
    }

    // 21. Homepage Hero Section (Logged In)
    console.log('📸 Capturing homepage hero (logged in)...');
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await wait(2000);
    // Simulate login by setting localStorage
    await page.evaluate(() => {
      localStorage.setItem('user', JSON.stringify({ name: 'John Doe', email: 'john@example.com', role: 'user' }));
      localStorage.setItem('token', 'mock-token');
    });
    await page.reload({ waitUntil: 'networkidle2' });
    await wait(2000);
    await page.screenshot({
      path: path.join(screenshotsDir, '21_homepage_hero_logged_in.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: false,
      clip: { x: 0, y: 0, width: 1920, height: 800 }
    });

    // 22. Top Services Section
    console.log('📸 Capturing top services section...');
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await wait(2000);
    await page.evaluate(() => window.scrollTo(0, 900));
    await wait(1000);
    await page.screenshot({
      path: path.join(screenshotsDir, '22_top_services_section.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: false
    });

    // 23. Top-Rated by Platform Section
    console.log('📸 Capturing top-rated by platform section...');
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await wait(2000);
    await page.evaluate(() => window.scrollTo(0, 1500));
    await wait(1000);
    await page.screenshot({
      path: path.join(screenshotsDir, '23_top_rated_by_platform.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: false
    });

    // 24. Trending Right Now Section
    console.log('📸 Capturing trending section...');
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    await wait(2000);
    await page.evaluate(() => window.scrollTo(0, 2100));
    await wait(1000);
    await page.screenshot({
      path: path.join(screenshotsDir, '24_trending_right_now.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: false
    });

    // Dashboard Screenshots
    console.log('📸 Starting dashboard screenshots...');
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

    // Dashboard Main
    await page.goto(`${baseUrl}/dashboard`, { waitUntil: 'networkidle2' });
    await wait(1500);
    await page.screenshot({
      path: path.join(screenshotsDir, '25_dashboard_main.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    // Dashboard Profile
    await page.goto(`${baseUrl}/dashboard/profile`, { waitUntil: 'networkidle2' });
    await wait(1500);
    await page.screenshot({
      path: path.join(screenshotsDir, '26_dashboard_profile.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    // Dashboard Settings
    await page.goto(`${baseUrl}/dashboard/settings`, { waitUntil: 'networkidle2' });
    await wait(1500);
    await page.screenshot({
      path: path.join(screenshotsDir, '28_dashboard_settings.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    // Dashboard Bookings
    await page.goto(`${baseUrl}/dashboard/bookings`, { waitUntil: 'networkidle2' });
    await wait(1500);
    await page.screenshot({
      path: path.join(screenshotsDir, '31_dashboard_bookings.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    // Dashboard Messages
    await page.goto(`${baseUrl}/dashboard/messages`, { waitUntil: 'networkidle2' });
    await wait(1500);
    await page.screenshot({
      path: path.join(screenshotsDir, '32_dashboard_messages.jpg'),
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });

    console.log('✅ All screenshots captured successfully!');
    console.log(`📁 Screenshots saved to: ${screenshotsDir}`);

  } catch (error) {
    console.error('❌ Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

// Run the script
captureScreenshots().catch(console.error);

