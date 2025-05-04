// @ts-ignore
import { config } from 'dotenv';
import fetch from 'node-fetch';
import { Buffer } from 'buffer';

config();

export default async function handler(req, res) {
  const code = req.query.code;
  const SPOTIFY_CLIENT_ID = process.env.VITE_SPOTIFY_CLIENT_ID;
  const SPOTIFY_CLIENT_SECRET = process.env.VITE_SPOTIFY_CLIENT_SECRET;
  const SPOTIFY_REDIRECT_URI = process.env.VITE_SPOTIFY_REDIRECT_URI;

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();
    
    // Redirect to the frontend with the access token
    res.redirect(`/?access_token=${data.access_token}`);
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    res.redirect('/?error=spotify_auth_failed');
  }
} 