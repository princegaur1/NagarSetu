const crypto = require('crypto');

/**
 * Generates a unique ticket ID in the format NAGARSETU-XXXXXX
 * Uses a combination of timestamp and random string for uniqueness
 */
function generateTicketId() {
  // Get current timestamp (last 6 digits)
  const timestamp = Date.now().toString().slice(-6);
  
  // Generate random 4-character string
  const randomString = crypto.randomBytes(2).toString('hex').toUpperCase();
  
  // Combine to create NAGARSETU-XXXXXX format
  return `NAGARSETU-${timestamp}${randomString}`;
}

/**
 * Generates a ticket ID with a specific format for better readability
 * Format: NAGARSETU-YYMMDD-XXXX (Year-Month-Day + 4 random chars)
 */
function generateFormattedTicketId() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  
  // Generate random 4-character string with timestamp for extra uniqueness
  const timestamp = Date.now().toString().slice(-4);
  const randomString = crypto.randomBytes(2).toString('hex').toUpperCase();
  
  return `NAGARSETU-${year}${month}${day}-${timestamp}${randomString}`;
}

module.exports = {
  generateTicketId,
  generateFormattedTicketId
};
