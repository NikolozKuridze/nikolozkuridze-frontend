import express from 'express';
import geoip from 'geoip-lite';

const router = express.Router();

// @route   GET /api/language/detect
// @desc    Detect language based on IP address
// @access  Public
router.get('/detect', (req, res) => {
  try {
    // Get IP from request
    const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() ||
               req.headers['x-real-ip'] ||
               req.connection.remoteAddress ||
               req.socket.remoteAddress;

    // Clean IP (remove IPv6 prefix if present)
    const cleanIp = ip.replace(/^::ffff:/, '');

    // Get geo data
    const geo = geoip.lookup(cleanIp);

    // Default to English
    let language = 'en';

    // If user is from Georgia, use Georgian
    if (geo && geo.country === 'GE') {
      language = 'ka';
    }

    res.json({
      success: true,
      language,
      country: geo?.country || null,
      ip: cleanIp
    });
  } catch (error) {
    console.error('Language detection error:', error);
    // Return English as fallback
    res.json({
      success: true,
      language: 'en',
      country: null
    });
  }
});

export default router;
