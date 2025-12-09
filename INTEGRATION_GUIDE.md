# Real Platform Integration Guide

This guide explains how to integrate real user data from platforms like Rover, Wag!, Care.com, etc.

## Current Status

**Most platforms do NOT have public APIs.** Here are the options:

### 1. **Rover** - Partner API Available
- **Status**: Has a partner API program
- **How to get access**: Apply at https://www.rover.com/api/
- **Requirements**: Business partnership, API key
- **Implementation**: See `apps/api/src/routes/aggregate.ts` - `fetchRoverResults()` function

### 2. **Wag!** - No Public API
- **Status**: No public API available
- **Options**: Contact Wag! for partnership opportunities
- **Alternative**: Use web search API (see below)

### 3. **Care.com** - No Public API
- **Status**: No public API available
- **Options**: Contact for business partnerships

### 4. **Other Platforms** - Similar situation

## Legal Alternatives

### Option 1: Google Custom Search API (Recommended)
This is a **legal** way to find public listings:

1. **Get Google Custom Search API Key**:
   - Go to https://console.cloud.google.com/
   - Create a project
   - Enable "Custom Search API"
   - Create API key
   - Create a Custom Search Engine at https://cse.google.com/

2. **Configure Environment Variables**:
   ```bash
   GOOGLE_SEARCH_API_KEY=your_api_key_here
   GOOGLE_SEARCH_ENGINE_ID=your_engine_id_here
   ```

3. **The code is already set up** - it will automatically use Google Search API if configured!

### Option 2: SerpAPI or Similar Services
- Services like SerpAPI can legally scrape search results
- Requires paid subscription
- More reliable than custom scraping

### Option 3: Official Partnerships
- Contact each platform for partnership opportunities
- May require business verification
- Best long-term solution

## How to Add Real API Integration

### Step 1: Get API Credentials
Apply for API access from the platform you want to integrate.

### Step 2: Add Environment Variables
Add to `.env` file in `apps/api/`:
```
ROVER_API_KEY=your_rover_api_key
WAG_API_KEY=your_wag_api_key
# etc.
```

### Step 3: Implement API Function
Update the corresponding function in `apps/api/src/routes/aggregate.ts`:

```typescript
async function fetchRoverResults(serviceType: string, location: string) {
  const ROVER_API_KEY = process.env.ROVER_API_KEY;
  const response = await axios.get('https://api.rover.com/v1/sitters/search', {
    headers: { 'Authorization': `Bearer ${ROVER_API_KEY}` },
    params: { service_type: serviceType, location: location }
  });
  // Transform response data to our format
  return response.data.sitters.map(/* transform */);
}
```

### Step 4: Test
The system will automatically use real APIs when configured, and fall back to mock data otherwise.

## Current Implementation

The system currently:
1. ✅ Tries to use real APIs if configured
2. ✅ Falls back to Google Custom Search API if available
3. ✅ Uses mock data as final fallback
4. ✅ All results are clearly labeled with their source platform

## Important Notes

⚠️ **DO NOT** scrape websites directly - this violates terms of service and may be illegal.

✅ **DO** use official APIs or legal search APIs like Google Custom Search.

✅ **DO** contact platforms for partnership opportunities.

## Testing with Google Custom Search

1. Get free tier: 100 searches/day
2. Set up environment variables
3. Restart API server
4. Search will automatically use real Google Search results!




