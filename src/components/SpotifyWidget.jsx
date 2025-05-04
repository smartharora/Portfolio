import React, { useState } from 'react';

const SpotifyWidget = () => {
  const [isCompact, setIsCompact] = useState(true);

  const playlists = [
    {
      id: "1bKeMwqOmvHX1yKpNG9Gwa",
      name: "Playlist 1"
    },
    {
      id: "41s23NNC6rJmfg0Livb7ZO",
      name: "Playlist 2"
    },
    {
      id: "37i9dQZF1E8PpbaegesTVI",
      name: "Playlist 3"
    },
    {
      id: "37i9dQZF1DX5n5gZBZb0AT",
      name: "Playlist 4"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={() => setIsCompact(!isCompact)}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          {isCompact ? 'Expand View' : 'Compact View'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-gray-800 rounded-lg overflow-hidden hover:scale-102 transition-transform duration-200"
          >
            <iframe
              style={{ borderRadius: '12px' }}
              src={`https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator`}
              width="100%"
              height={isCompact ? "152" : "352"}
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotifyWidget; 