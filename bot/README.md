# Aozora Discord Bot

## Table of Contents
* [About Aozora](#about-aozora)
* [Slash Commands](#slash-commands)
* [Technologies](#technologies)
* [Setup](#setup)
* [Environment Variables](#environment-variables)
* [Docker](#docker)
* [License](#license)

## About Aozora
Aozora is currently a primarily Japanese language learning utility bot.<br>
Planned features include falling back to Google Translate if DeepL does not support a target language, raw Japanese text to text with furigana, pronunciation results for searched words, saving searched words to an exportable Anki deck, character recognition from images, etc. etc.

## Slash Commands
- <code>/ping</code> - pong!
- <code>/deepl/:word/:?target=JA/:?source=auto/:?furigana=boolean</code> - utilizes the DeepL.com API to translate your word into a target language, target is Japanese by default. Adding furigana to the returned translation is a work in progress.

## Technologies
Languages and packages used:
* Discord.js
* Kuroshiro
* TypeScript
* Wanakana

## Setup
- follow the typical workflow of setting up a Discord bot application with `https://discord.com/developers/applications`.
- clone or fork this repo.
- `cd` into the newly made directory.
- `yarn add` i prefer yarn, but it's up to you. change the start script in the package.json accordingly.
- add the environment variables listed below with your own values.
- invite the bot into a test server of your choosing and run `yarn start`.
- if everything went well the bot should come online, and slash commands will shortly thereafter become available.
## Environment Variables
<ul>
  <li>
    create a .env file in the root directory of the cloned repo.
  </li>
  <li>
    AOZORA_API_ENDPOINT - the base url of the backend API (currently not in use, but you may still need to set it).
  </li>
  <li>
    AOZORA_SECRET_NAME - a secret name used for graphql query caching on the backend API (currently not in use, but you may still need to set it).
  </li>
  <li>
    BUCKET - the CloudFront base URL, used to fetch images for certain embeds, e.g., `https://CLOUDFRONTID.cloudfront.net`.
  </li>
  <li>
    DATABASE - your Mongo DB URI connection string, with password and user replaced in angle brackets, e.g., `mongodb+srv://YOUR-MONGO-USER:<PASSWORD>@YOUR-MONGO-ORG.mongodb.net/<NAME>?retryWrites=true&w=majority`.
  </li>
  <li>
    DATABASE_NAME - your Mongo DB's name, e.g., `dev` or `test`.
  </li>
  <li>
    DATABASE_PASSWORD - your Mongo DB's password.
  </li>
  <li>
    DEEPL_API_KEY - an API key with DeepL on their free plan.
  </li>
  <li>
    PRIVATE_KEY - your bot's private key, can be found on the Discord Developer portal for the application you made.
  </li>
</ul>

## Docker
See DOCKER.md

## License

ISC License

Copyright (c) 2022 jesse goodburne / juiceboxh3ro

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.