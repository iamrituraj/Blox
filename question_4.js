const maxRequests = 15; // Maximum calls allowed in 1 minute
const windowDuration = 60000; // 1 minute in milliseconds
const penaltyDuration = 60000; // 1 minute in milliseconds
let requestTimestamps = []; // Stores timestamps of recent API calls
let penalizedUntil = 0; // Tracks the penalty timeout

// Simulated API call
const call_me = (request) => {
  console.log(`API called with request: ${request}`);
  return `Response for ${request}`;
};

// Sliding window rate limiter with penalty
const slidingWindowCall = async (request) => {
  const now = Date.now();

  // Checking if we are under penalty
  if (now < penalizedUntil) {
    const waitTime = penalizedUntil - now;
    console.log(
      `Penalty active. Waiting for ${Math.ceil(waitTime / 1000)} seconds...`
    );
    return new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await slidingWindowCall(request));
      }, waitTime);
    });
  }

  // Before processing current request, remove requests older than the current window duration
  requestTimestamps = requestTimestamps.filter(
    (timestamp) => now - timestamp < windowDuration
  );

  if (requestTimestamps.length < maxRequests) {
    requestTimestamps.push(now);
    return call_me(request);
  } else {
    // Applying penalty: blocking all calls for 1 minute
    console.log("Rate limit exceeded! Applying 1-minute penalty.");
    penalizedUntil = now + penaltyDuration; // Set penalty timeout
    return new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await slidingWindowCall(request));
      }, penaltyDuration);
    });
  }
};

// function to simulate multiple api calls 
(async () => {
  const apiRequests = Array.from({ length: 20 }, (_, i) => `Request ${i + 1}`);
  console.log("Starting API calls...");
  for (const request of apiRequests) {
    try {
      const response = await slidingWindowCall(request);
      console.log(response);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
})();
