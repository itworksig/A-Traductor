# <img src="src/icons/icon-128.png" height="44" alt="A-Traductor icon"> A-Traductor

A-Traductor is a browser extension for translating web pages and selected text directly in the browser.

It supports classic translation providers such as Google, Bing, Yandex, and DeepL, plus OpenAI-compatible AI translation through OpenRouter, AiHubMix, or a custom endpoint.

## Features

- Translate full web pages without opening a new tab.
- Translate selected text from the popup.
- Choose page translation and text translation providers independently.
- Use OpenRouter, AiHubMix, or a custom OpenAI-compatible service.
- Configure the AI service URL, API key, and model in Settings.
- Test AI provider connectivity before using it.
- Display the active translation provider in the popup.
- Automatically translate selected languages or websites.
- Modern Chrome-like popup interface.
- Firefox and Chromium builds.

## AI Translation

AI translation providers are configured from the extension settings page:

1. Open the extension options.
2. Go to the translation service settings.
3. Enable OpenRouter AI, AiHubMix AI, or Custom AI.
4. Enter the service URL, API key, and model.
5. Choose a prompt template or write a custom translation prompt.
6. Click **Test** to verify the connection.
7. Select the provider for page translation or text translation.

Default compatible endpoints:

- OpenRouter: `https://openrouter.ai/api/v1/chat/completions`
- AiHubMix: `https://aihubmix.com/v1/chat/completions`
- Custom AI: any OpenAI-compatible `/chat/completions` endpoint

Prompt templates included by default:

- Accurate translation
- Natural and fluent
- Literal and consistent
- Technical document

## Privacy

A-Traductor does not collect analytics or send usage data to this repository.

Translation requires sending page text or selected text to the translation provider you choose. If you configure an AI provider, translated content is sent to that provider using your configured API endpoint and API key.

API keys saved in the extension settings are stored in the browser extension's local storage through `chrome.storage.local`. They are not written to the source code, build files, or git history by the extension.

Do not commit exported extension settings if they contain API keys.

See [PRIVACY](PRIVACY) for more details.

## Install

### Firefox

For local testing:

1. Run `npm run build`.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on**.
4. Select `build/A-Traductor_9.9.0.2_Firefox/manifest.json`.

For release builds, use the generated Firefox package:

```sh
npm run build
```

The package is created at:

```text
build/A-Traductor_9.9.0.2_Firefox.zip
```

### Chromium, Chrome, Edge, Brave, Opera

For local testing:

1. Run `npm run build`.
2. Open `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select `build/A-Traductor_9.9.0.2_Chromium`.

The Chromium package is created at:

```text
build/A-Traductor_9.9.0.2_Chromium.zip
```

## Development

Install dependencies:

```sh
npm install
```

Run checks:

```sh
npm test
```

Build Firefox and Chromium packages:

```sh
npm run build
```

## Repository

Maintained at [itworksig/A-Traductor](https://github.com/itworksig/A-Traductor).

## Notes

- Firefox and Chromium builds both use Manifest V3.
- Chromium uses a background service worker.
- Firefox keeps explicit MV3 background scripts for cross-browser compatibility.
- See [docs/MV3_MIGRATION.md](docs/MV3_MIGRATION.md) for implementation notes.
