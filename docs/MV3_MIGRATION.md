# Manifest V3 Migration

A-Traductor currently keeps Manifest V2 for Firefox compatibility. Chromium MV3 should be introduced as a separate build target instead of replacing the Firefox build in one step.

## Target Shape

- Keep `src/manifest.json` as the Firefox MV2 manifest.
- Keep `src/chrome_manifest.json` as the current Chromium MV2 manifest until the MV3 background migration is complete.
- Add a future `src/chrome_manifest_v3.json` when the background scripts can run as a service worker.

## Required Work

1. Replace persistent background pages with an MV3 service worker entry.
2. Audit all background state that currently assumes a long-lived page.
3. Replace blocking `webRequest` usage where needed.
4. Move any DOM-dependent background code out of the service worker path.
5. Validate message handlers return `true` for async responses.
6. Add a Chromium MV3 build task only after the service worker path is stable.

## Current Status

The build now preserves binary assets correctly, which is a prerequisite for an additional Chromium build target. The actual MV3 runtime conversion is intentionally tracked here because shipping a manifest-only MV3 file before the background code is service-worker-safe would create a broken extension.
