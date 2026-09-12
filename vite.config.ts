import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }

        const url = new URL(req.url, 'http://localhost');
        const pathname = url.pathname;

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-user-id');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          return res.end();
        }

        if (pathname === '/api/ads/feed' || pathname === '/api/ads/feeds' || pathname === '/api/ads/my') {
          res.statusCode = 200;
          return res.end(JSON.stringify({ ads: [] }));
        }

        if (pathname === '/api/songs') {
          res.statusCode = 200;
          return res.end(
            JSON.stringify({
              songs: [
                {
                  id: 1,
                  uploader_id: 0,
                  title: 'Sample Track',
                  artist_name: 'Artist',
                  cover_image_url:
                    'https://images.unsplash.com/photo-1514525253440-b393452e8d26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                  audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                  duration_seconds: 245,
                  genre: 'Music',
                  created_at: new Date().toISOString(),
                  stats: { plays: 0, downloads: 0, shares: 0, likes: 0, reels_use: 0 },
                },
              ],
            })
          );
        }

        if (pathname === '/api/reels') {
          res.statusCode = 200;
          return res.end(JSON.stringify({ reels: [] }));
        }

        if (pathname === '/api/stories') {
          res.statusCode = 200;
          return res.end(JSON.stringify({ stories: [] }));
        }

        if (pathname === '/api/events') {
          res.statusCode = 200;
          return res.end(JSON.stringify({ events: [] }));
        }

        if (pathname === '/api/posts') {
          res.statusCode = 200;
          return res.end(JSON.stringify([]));
        }

        if (pathname === '/api/feeds') {
          res.statusCode = 200;
          return res.end(JSON.stringify({ feed: [] }));
        }

        if (pathname === '/api/products') {
          res.statusCode = 200;
          return res.end(JSON.stringify([]));
        }

        if (pathname === '/api/brands') {
          res.statusCode = 200;
          return res.end(JSON.stringify([]));
        }

        if (pathname === '/api/chats') {
          res.statusCode = 200;
          return res.end(JSON.stringify([]));
        }

        if (pathname === '/api/notifications') {
          res.statusCode = 200;
          return res.end(JSON.stringify([]));
        }

        if (pathname === '/api/users') {
          res.statusCode = 200;
          return res.end(JSON.stringify([]));
        }

        if (pathname === '/api/groups') {
          res.statusCode = 200;
          return res.end(JSON.stringify([]));
        }

        if (pathname.startsWith('/api/user-follows')) {
          res.statusCode = 200;
          return res.end(JSON.stringify({ followers: [], following: [] }));
        }

        res.statusCode = 200;
        return res.end(JSON.stringify({ success: true, data: [] }));
      });
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), apiDevPlugin()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
