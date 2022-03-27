# Aozora Discord Bot

## Table of Contents
* [About Aozora](#about-aozora)
* [Slash Commands](#slash-commands)
* [Message Context Menu Commands](#message-context-menu-commands)
* [Technologies](#technologies)
* [Setup](#setup)
* [License](#license)

## About Aozora
Aozora is a primarily Japanese language learning utility bot, with currently planned features including:
<ul>
  <li>word and sentence translation using DeepL</li>
  <li>the ability to un-kanji a Japanese sentence</li>
  <li>dictionary searching using Jisho (WIP)</li>
  <li>Hangeul to Romaji (WIP)</li>
  <li>saving searched/translated words to a user dictionary (WIP)</li>
  <li>links to native speaker sound files from Forvo (WIP)</li>
  <li>Korean dictionary searching (WIP)</li>
</ul>

Plans for the client app (all WIP) currently include:
<ul>
  <li>Google/Apple OAuth, link Discord account after sign-in<sup>1</sup></li>
  <li>export user dictionary as CSV for use in Anki, Memrise(?), From Zero</li>
  <li>study saved words via normal flash cards or SRS flash cards</li>
  <li>grapheme/kanji writing practice</li>
  <li>skribbl.io but as the above</li>
  <li>study streaks</li>
</ul>
<sup>1</sup>afaik Discord will send unverified emails through their OAuth, so to prevent hijacking of Aozora accounts a secure sign-in will first be required to then link Discord accounts.

## Discord bot
### Slash Commands
<ul>
  <li><code>/deepl/:word/:?target/?:source</code>: utilizes the DeepL.com API to translate your word into a target language. Target is Japanese by default, source can be determined by DeepL.</li>
  <li><code>/furigana/:token</code>: parses a Japanese word or phrase (in message or embed) and injects furigana after kanji.</li>
  <li><code>/dpl_supported</code>: returns an embed with the languages that DeepL supports for translation.</li>
  <li>DEV: <code>/invite</code>: send an invite link to have Aozora bot join your server.</li>
</ul>

### Message Context Menu Commands
Message context menu refers to the menu displayed when right-clicking a message in the Discord app. These commands are nested under the `apps` sub-menu in Discord's desktop client.
<ul>
  <li><code>Add furigana to message</code>: Attempts to add furigana to the selected message or embed.</li>
  <li><code>Translate to/from JP</code>: Translates the selected message to JP or EN based on the content.</li>
</ul>

## Technologies
Created with:
* Discord.js
* Kuroshiro
* TypeScript
* Wanakana

To be added:
* API<sup>2</sup>: Elixir 1.13.3 / Phoenix 1.6.6 / Postgres
* Client<sup>3</sup>: Nextjs ?? React Native ?? Flutter
## Setup
Refer to the individual service folders (named after legendary bird Pokémon) within this repo for steps on how to set them up.
* Articuno: Discord bot
* <sup>2</sup>Moltres: Phoenix API
* <sup>3</sup>Zapdos: user-facing client

## License

<strong>ISC License</strong>

Copyright (c) 2022 <em>jesse goodburne / juiceboxh3ro / Aozora</em>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

<em>THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.</em>
