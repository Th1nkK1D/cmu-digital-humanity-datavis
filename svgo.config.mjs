// removeViewBox is disabled: it strips the viewBox when it matches width/height, which
// breaks SVGs rendered in an <img> whose size comes from CSS — how this deck uses them.
export default {
  multipass: true,
  plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }],
}
