import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const allowedHosts = loadEnv(mode, process.cwd(), 'DEV_').DEV_ALLOWED_HOSTS?.split(',');

  return {
    plugins: [react()],
    build: { outDir: 'build' },
    server: { port: 3000, host: !!allowedHosts, allowedHosts },
  };
});
