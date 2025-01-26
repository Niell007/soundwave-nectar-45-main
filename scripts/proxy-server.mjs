import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

// Enable CORS with specific options
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

const KICK_BASE_URL = 'https://kick.com';
const BROWSER_HEADERS = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Cache-Control': 'no-cache',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Helper function to extract JSON data from HTML
function extractStreamData(html) {
  try {
    // Look for the data-stream-info attribute
    const match = html.match(/data-stream-info="([^"]*)"/);
    if (match && match[1]) {
      // Decode HTML entities and parse JSON
      const decoded = decodeURIComponent(match[1].replace(/&quot;/g, '"'));
      return JSON.parse(decoded);
    }

    // Alternative: Look for window.__KICK_PRELOAD_STATE__
    const stateMatch = html.match(/window\.__KICK_PRELOAD_STATE__\s*=\s*({[^<]*})/);
    if (stateMatch && stateMatch[1]) {
      return JSON.parse(stateMatch[1]);
    }

    // Alternative: Look for <script id="__NEXT_DATA__"
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]*)<\/script>/);
    if (nextDataMatch && nextDataMatch[1]) {
      return JSON.parse(nextDataMatch[1]);
    }

    return null;
  } catch (error) {
    console.error('Error extracting stream data:', error);
    return null;
  }
}

// Custom endpoint for stream info
app.get('/api/kick/stream/:username', async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({
        playbackUrl: null,
        username: '',
        status: 'error',
        isLive: false,
        title: '',
        viewerCount: 0,
        error: 'Username is required'
      });
    }

    console.log('Proxying request for username:', username);

    // Fetch the channel page
    const response = await fetch(`${KICK_BASE_URL}/${username}`, {
      headers: BROWSER_HEADERS
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch channel page: ${response.status}`);
    }

    const html = await response.text();
    const streamData = extractStreamData(html);

    if (!streamData) {
      return res.json({
        playbackUrl: null,
        username,
        status: 'offline',
        isLive: false,
        title: '',
        viewerCount: 0
      });
    }

    // Extract livestream data
    const channel = streamData.channel || streamData.props?.pageProps?.channel || {};
    const livestream = channel.livestream || streamData.livestream;

    if (!livestream || !livestream.playback_url) {
      return res.json({
        playbackUrl: null,
        username,
        status: 'offline',
        isLive: false,
        title: channel.previous_livestream?.session_title || '',
        viewerCount: 0
      });
    }

    return res.json({
      playbackUrl: livestream.playback_url,
      username,
      status: 'live',
      isLive: true,
      title: livestream.session_title || channel.user?.username || '',
      viewerCount: livestream.viewer_count || 0
    });

  } catch (error) {
    console.error('Proxy error:', error);
    
    return res.status(200).json({
      playbackUrl: null,
      username: req.params.username,
      status: 'error',
      isLive: false,
      title: '',
      viewerCount: 0,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
