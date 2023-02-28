import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    // Enable using .js instead of .jsx
    // https://github.com/vitejs/vite/discussions/3448#discussioncomment-749919
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.jsx?$/,
        // loader: "tsx",
        // include: /src\/.*\.[tj]sx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                {
                    name: 'load-js-files-as-jsx',
                    setup(build) {
                        build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
                            loader: 'jsx',
                            contents: await fs.readFile(args.path, 'utf8'),
                        }));
                    },
                },
            ],
        },
    },
});
