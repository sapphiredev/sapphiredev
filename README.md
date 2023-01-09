<div align="center">

![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire-banner.png)

# Sapphire Dev

**GitHub app for Sapphire**

[![GitHub](https://img.shields.io/github/license/sapphiredev/sapphiredev)](https://github.com/sapphiredev/sapphiredev/blob/main/LICENSE.md)

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

For information on each environment see [probot configuration](https://probot.github.io/docs/configuration/)

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

## Contributors

Please make sure to read the [Contributing Guide][contributing] before making a pull request.

Thank you to all the people who already contributed to Sapphire!

<a href="https://github.com/sapphiredev/sapphiredev/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sapphiredev/sapphiredev" />
</a>

[contributing]: https://github.com/sapphiredev/.github/blob/main/.github/CONTRIBUTING.md
