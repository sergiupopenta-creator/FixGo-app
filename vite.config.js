import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative base: works both on GitHub Pages (served under /FixGo-app/)
  // and when the built dist/ folder is opened locally (e.g. via Live Server).
  base: './',
});
