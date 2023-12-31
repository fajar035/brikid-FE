import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";

// const manifestForPlugIn = {
//   registerType: "prompt",
//   includeAssests: ["favicon.ico", "apple-touch-icon.png", "maskable-icon.svg"],
//   manifest: {
//     name: "Kelontong Shop",
//     short_name: "Kelontong Shop",
//     description:
//       "A grocery store wants to enter the 21st century, they want to sell their goods online.",
//     icons: [
//       {
//         src: "/android-chrome-192x192.png",
//         sizes: "192x192",
//         type: "image/png",
//         purpose: "favicon",
//       },
//       {
//         src: "/android-chrome-512x512.png",
//         sizes: "512x512",
//         type: "image/png",
//         purpose: "favicon",
//       },
//       {
//         src: "/apple-touch-icon.png",
//         sizes: "180x180",
//         type: "image/png",
//         purpose: "apple touch icon",
//       },
//       {
//         src: "/maskable_icon.svg",
//         sizes: "512x512",
//         type: "image/svg",
//         purpose: "any maskable",
//       },
//     ],
//     theme_color: "#171717",
//     background_color: "#E8EBF2",
//     display: "standalone",
//     scope: "/",
//     start_url: "/",
//     orientation: "portrait",
//   },
// };
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
});
