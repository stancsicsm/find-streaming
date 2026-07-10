import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const allowedHosts = loadEnv(mode, process.cwd(), 'DEV_').DEV_ALLOWED_HOSTS?.split(',');

  return {
    plugins: [react()],
    build: { outDir: 'build' },
    server: { port: 3000, host: !!allowedHosts, allowedHosts },
  };
});
