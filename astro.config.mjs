// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  server: {
    host: true
  },
  vite: {
    server: {
      allowedHosts: [
  	    "crestfallenly-phenylene-kaci.ngrok-free.dev",
  	    "blog.harshitlabs.xyz",
        "harrys-site"
      ]
    },

    plugins: [tailwindcss()]
  }

});
