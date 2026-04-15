/**
 * Test component for video utilities in user frontend
 */

import { extractYouTubeInfo, convertToEmbedUrl, isYouTubeUrl } from './videoUtils.js';

// Test the specific URL from user
export function testSpecificUrl() {
  const userUrl = 'https://www.youtube.com/watch?v=OtuIpclDZCA&t=1592s';
  
  console.log('Testing specific user URL:');
  console.log(`URL: ${userUrl}`);
  
  const info = extractYouTubeInfo(userUrl);
  const embedUrl = convertToEmbedUrl(userUrl);
  const isYouTube = isYouTubeUrl(userUrl);
  
  console.log('Extracted Info:', info);
  console.log('Embed URL:', embedUrl);
  console.log('Is YouTube URL:', isYouTube);
  
  // Expected output should be:
  // https://www.youtube.com/embed/OtuIpclDZCA?start=1592
  
  return { info, embedUrl, isYouTube };
}

// Test multiple URL formats
export function runVideoUtilsTests() {
  console.log('Running Video Utils Tests...\n');
  
  const testUrls = [
    {
      url: 'https://www.youtube.com/watch?v=OtuIpclDZCA&t=1592s',
      expectedVideoId: 'OtuIpclDZCA',
      expectedStartTime: 1592,
      description: 'YouTube watch URL with timestamp in seconds'
    },
    {
      url: 'https://youtu.be/OtuIpclDZCA?t=1592',
      expectedVideoId: 'OtuIpclDZCA',
      expectedStartTime: 1592,
      description: 'YouTube short URL with timestamp'
    },
    {
      url: 'https://www.youtube.com/watch?v=OtuIpclDZCA',
      expectedVideoId: 'OtuIpclDZCA',
      expectedStartTime: 0,
      description: 'YouTube watch URL without timestamp'
    }
  ];
  
  let passedTests = 0;
  let totalTests = testUrls.length;
  
  testUrls.forEach((testCase, index) => {
    console.log(`Test ${index + 1}: ${testCase.description}`);
    console.log(`URL: ${testCase.url}`);
    
    const info = extractYouTubeInfo(testCase.url);
    const embedUrl = convertToEmbedUrl(testCase.url);
    const isYouTube = isYouTubeUrl(testCase.url);
    
    console.log(`Extracted Info:`, info);
    console.log(`Embed URL: ${embedUrl}`);
    console.log(`Is YouTube URL: ${isYouTube}`);
    
    // Validate results
    const videoIdMatch = info && info.videoId === testCase.expectedVideoId;
    const startTimeMatch = info && info.startTime === testCase.expectedStartTime;
    const embedUrlValid = embedUrl && embedUrl.includes(testCase.expectedVideoId);
    
    if (videoIdMatch && startTimeMatch && embedUrlValid) {
      console.log('Status: PASSED\n');
      passedTests++;
    } else {
      console.log('Status: FAILED');
      console.log(`Expected Video ID: ${testCase.expectedVideoId}, Got: ${info?.videoId}`);
      console.log(`Expected Start Time: ${testCase.expectedStartTime}, Got: ${info?.startTime}`);
      console.log(`Embed URL Valid: ${embedUrlValid}\n`);
    }
  });
  
  console.log(`Test Results: ${passedTests}/${totalTests} tests passed`);
  return passedTests === totalTests;
}

// Export for use in components
export { extractYouTubeInfo, convertToEmbedUrl, isYouTubeUrl };
