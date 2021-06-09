<div align="center">

![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire-banner.png)

# Sapphire Dev

**GitHub app for Sapphire**

[![GitHub](https://img.shields.io/github/license/sapphiredev/sapphiredev)](https://github.com/sapphiredev/sapphiredev/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/sapphiredev/branch/main/graph/badge.svg?token=IstewBQn9T)](https://codecov.io/gh/sapphiredev/sapphiredev)
[![Depfu](https://badges.depfu.com/badges/bb7d8a09d113e29e09feefdde7b9ed37/count.svg)](https://depfu.com/github/sapphiredev/sapphiredev?project_id=27856)

</div>

## Description

The GitHub app that we use in Sapphire for automating various tasks.

## Usage

### Setup

```sh
# Install dependencies
yarn install

# Compile
yarn build
```

Next duplicate the [`.env`](.env) file and rename it to [`.env.local`](.env.local). Fill in at least these required environment variables:

-   `APP_ID`
-   `PRIVATE_KEY`
-   `WEBHOOK_PROXY_URL`
-   `WEBHOOK_SECRET`

For information on each environment see [`env.d.ts`](src/lib/env.d.ts) or [probot configuration](https://probot.github.io/docs/configuration/)

### Running with debugging

You can read [Manually Configuring a GitHub App](https://probot.github.io/docs/development/#manually-configuring-a-github-app) on the Probot documentation to learn how to setup the variables above as well as the GitHub application to learn how to setup this project for debugging. Once configured, use `npm run-script debug` with your debugger of choice to start a debug session.

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
