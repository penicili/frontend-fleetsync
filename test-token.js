// Test script to verify JWT token handling
const jwt = require('jsonwebtoken');

// Replace with your actual backend token for testing
const testToken = process.env.TEST_TOKEN || process.argv[2];

if (!testToken) {
  console.error("Please provide a token either as an environment variable TEST_TOKEN or as a command-line argument");
  process.exit(1);
}

try {
  // First try to decode it without verification (to see its structure)
  const decodedWithoutVerify = jwt.decode(testToken, { complete: true });
  console.log("Token header:", JSON.stringify(decodedWithoutVerify.header, null, 2));
  console.log("Token payload:", JSON.stringify(decodedWithoutVerify.payload, null, 2));
  
  // Get secret from .env.local
  const fs = require('fs');
  const path = require('path');
  
  // Read the .env.local file to get the NEXTAUTH_SECRET
  const envContent = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
  const secretMatch = envContent.match(/NEXTAUTH_SECRET=([^\r\n]+)/);
  const secret = secretMatch ? secretMatch[1] : null;
  
  if (!secret) {
    console.error("Could not find NEXTAUTH_SECRET in .env.local file");
    process.exit(1);
  }
  
  console.log("Using secret:", secret.substring(0, 10) + '...');
  
  // Try to verify the token with your secret
  try {
    const verified = jwt.verify(testToken, secret);
    console.log("✅ TOKEN VERIFIED SUCCESSFULLY with your NEXTAUTH_SECRET");
    console.log("Verified payload:", JSON.stringify(verified, null, 2));
  } catch (verifyError) {
    console.error("❌ TOKEN VERIFICATION FAILED with your NEXTAUTH_SECRET");
    console.error("Error:", verifyError.message);
    
    // If verification fails, it may be because the token is from another system
    // and doesn't need to be verified with NEXTAUTH_SECRET
    console.log("\n🔍 This token might be from an external system (like your backend)");
    console.log("NextAuth can be configured to just store and pass along external tokens.");
  }
  
} catch (error) {
  console.error("Error processing token:", error);
}
