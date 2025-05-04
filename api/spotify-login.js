// @ts-ignore
import { config } from 'dotenv';
config();

export default function handler(req, res) {
  const SPOTIFY_CLIENT_ID = process.env.VITE_SPOTIFY_CLIENT_ID;
  const SPOTIFY_REDIRECT_URI = process.env.VITE_SPOTIFY_REDIRECT_URI;
  const scope = 'user-read-currently-playing user-read-recently-played';

  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: SPOTIFY_REDIRECT_URI,
    scope: scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
} 