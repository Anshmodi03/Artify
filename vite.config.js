import { defineConfig } from "vite";
import { join } from "path";

export default defineConfig({
  root: join(process.cwd(), "src"),
  server: {
    port: 3000,
    open: "/index.html",
  },
  preview: {
    port: 8080,
  },
  build: {
    outDir: join(process.cwd(), "dist"),
    rollupOptions: {
      input: {
        main: join(process.cwd(), "src/index.html"),
        favourite: join(process.cwd(), "src/favourite.html"),
      },
    },
  },
});
