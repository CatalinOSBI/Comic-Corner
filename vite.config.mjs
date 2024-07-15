import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/Comic-Corner/',
    plugins: [react()],
    server: {
        open: true,
        port: 3000,
    },
    envFile: '.env.local', 
});