import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // ponytail: DEV_ALLOWED_HOSTS in gitignored .env keeps machine-specific hosts out of git
  const allowedHosts = loadEnv(mode, process.cwd(), 'DEV_').DEV_ALLOWED_HOSTS?.split(',');

  return {
    plugins: [react(), tailwindcss()],
    build: { outDir: 'build' },
    server: { port: 3000, host: !!allowedHosts, allowedHosts },
  };
});
