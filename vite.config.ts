import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export const aliasConfig = {
  "@": "/src",
  components: "/src/components",
  utils: "/src/utils",
  types: "/src/types",
  hooks: "/src/hooks",
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: aliasConfig,
  },
});
