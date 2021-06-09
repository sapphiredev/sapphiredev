<div align="center">

![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire-banner.png)

# Sapphire Bot

**GitHub bot for Sapphire**

[![GitHub](https://img.shields.io/github/license/sapphiredev/template)](https://github.com/sapphiredev/template/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/sapphire-bot/branch/main/graph/badge.svg?token=?????)](https://codecov.io/gh/sapphiredev/sapphire-bot)
[![Depfu](https://badges.depfu.com/badges/template/count.svg)](https://depfu.com/github/sapphiredev/e?project_id=template)

</div>

## Description

The GitHub bot that we use in Sapphire for automating various tasks.

## Usage

### Setup

```sh
# Install dependencies
yarn install

# Compile
yarn build

# Run the bot
yarn start
```

### Docker

First create a [`.env.local`](src/.env.local) in [`src`](src/) and add the following. Fill the values appropriately.

```env
APP_ID=""
PRIVATE_KEY=""
```

Then use [`docker-compose`](https://docs.docker.com/compose/) to build and run the Docker container:

```sh
# 1. Build container
docker-compose build

# 2. Start container
docker-compose up
```

## Buy us some doughnuts

Sapphire Community is and always will be open source, even if we don't get donations. That being said, we know there are amazing people who may still want to donate just to show their appreciation. Thank you very much in advance!

We accept donations through Open Collective, Ko-fi, Paypal, Patreon and GitHub Sponsorships. You can use the buttons below to donate through your method of choice.

|   Donate With   |                       Address                       |
| :-------------: | :-------------------------------------------------: |
| Open Collective | [Click Here](https://sapphirejs.dev/opencollective) |
|      Ko-fi      |      [Click Here](https://sapphirejs.dev/kofi)      |
|     Patreon     |    [Click Here](https://sapphirejs.dev/patreon)     |
|     PayPal      |     [Click Here](https://sapphirejs.dev/paypal)     |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
