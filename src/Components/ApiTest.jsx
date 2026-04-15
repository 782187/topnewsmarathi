import React, { useState, useEffect } from 'react';

const ApiTest = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testApiEndpoints();
  }, []);

  const testApiEndpoints = async () => {
    const results = {};
    
    try {
      // Test health endpoint
      const healthResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/health`);
      results.health = {
        success: healthResponse.ok,
        data: await healthResponse.json()
      };

      // Test breaking news endpoint
      const breakingResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/articles/breaking?limit=3`);
      results.breaking = {
        success: breakingResponse.ok,
        data: await breakingResponse.json()
      };

      // Test latest articles endpoint
      const latestResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/articles?category=ताज्या&limit=6`);
      results.latest = {
        success: latestResponse.ok,
        data: await latestResponse.json()
      };

      // Test live TV articles endpoint
      const liveResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/articles?category=लाईव्ह टीव्ही&limit=1`);
      results.live = {
        success: liveResponse.ok,
        data: await liveResponse.json()
      };

    } catch (error) {
      results.error = error.message;
    } finally {
      setTestResults(results);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-white">Testing API endpoints...</div>;
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-white font-bold mb-4">API Test Results</h3>
      <div className="space-y-3">
        {Object.entries(testResults).map(([endpoint, result]) => (
          <div key={endpoint} className="p-3 bg-gray-700 rounded">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">{endpoint.toUpperCase()}</span>
              <span className={`px-2 py-1 rounded text-xs ${
                result.success ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {result.success ? 'SUCCESS' : 'FAILED'}
              </span>
            </div>
            {result.data && (
              <div className="mt-2 text-gray-300 text-sm">
                <pre className="bg-gray-900 p-2 rounded overflow-x-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </div>
            )}
            {result.error && (
              <div className="mt-2 text-red-400 text-sm">
                Error: {result.error}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiTest;
