import { defineConfig, type Plugin, type ResolvedConfig } from "vite";

const ASSET_RE = /(["'`(=])\/([\w./-]+\.(?:png|jpe?g|gif|svg|webp|avif))/g;
const PRELOAD_LIST_RE = /["']?images["']?\s*:\s*\[[^\]]*\]/g;

/**
 * Prefix root-absolute `public/` references with the Vite base.
 *
 * Slidev only does this for its own layouts (`resolveAssetUrl`); the tahta theme
 * passes `image:` / `src` straight into `url()` and `:src`, so on GitHub Pages —
 * served from `/<repo>/` — every one of them 404s. A no-op when base is `/`.
 *
 * The `images: [...]` preload lists Slidev generates are left alone: their
 * consumer (`usePreloadImages`) already applies the base itself.
 */
function baseAwareAssets(): Plugin {
  let base = "/";
  return {
    name: "deck:base-aware-assets",
    enforce: "post",
    configResolved(config: ResolvedConfig) {
      base = config.base;
    },
    transform(code, id) {
      if (base === "/" || id.includes("node_modules")) return;

      const preloadLists: string[] = [];
      const masked = code.replace(PRELOAD_LIST_RE, (list) => {
        preloadLists.push(list);
        return `"__deckPreload${preloadLists.length - 1}__":0`;
      });

      const prefixed = masked.replace(ASSET_RE, (match, quote, path) =>
        path.startsWith(base.slice(1)) ? match : `${quote}${base}${path}`,
      );

      return prefixed.replace(
        /"__deckPreload(\d+)__":0/g,
        (_, i) => preloadLists[Number(i)],
      );
    },
  };
}

export default defineConfig({
  plugins: [baseAwareAssets()],
});
