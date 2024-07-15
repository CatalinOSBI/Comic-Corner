import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/Comic-Corner/',
    plugins: [react()],
    server: {
        open: true,
        port: 3000,
    },
});


const loadViteEnv = ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()))
}

loadViteEnv({ mode: process.env.NODE_ENV });