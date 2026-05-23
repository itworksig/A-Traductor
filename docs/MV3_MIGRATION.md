# Manifest V3 Notes

A-Traductor now uses Manifest V3 manifests for both build targets.

## Build Shape

- `src/manifest.json` is the Firefox MV3 manifest.
- `src/chrome_manifest.json` is the Chromium MV3 manifest.
- Chromium uses `/background/service-worker.js` as the MV3 background service worker.
- Firefox keeps the explicit background script list because Firefox and Chromium handle MV3 background execution differently.

## Runtime Compatibility

The Chromium service worker imports the existing background modules from `/background/service-worker.js`.

Because service workers do not expose all page-style APIs used by the old persistent background page, `/background/mv3-shims.js` provides the small compatibility layer currently needed by the existing translation and text-to-speech modules:

- `XMLHttpRequest` backed by `fetch`
- `FileReader.readAsDataURL` backed by `Blob.arrayBuffer`

DOM-dependent background parsing was removed from the service worker path.

## Validation

`npm test` checks that:

- both manifests use Manifest V3,
- host access is declared through `host_permissions`,
- `browser_action` and `page_action` are not used,
- web-accessible resources use the MV3 object format,
- the Chromium manifest points to the service worker,
- the Firefox manifest keeps explicit background scripts.
