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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://favware.tech/"><img src="https://avatars.githubusercontent.com/u/4019718?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeroen Claassens</b></sub></a><br /><a href="https://github.com/sapphiredev/sapphiredev/commits?author=favna" title="Code">💻</a> <a href="#design-favna" title="Design">🎨</a> <a href="https://github.com/sapphiredev/sapphiredev/commits?author=favna" title="Documentation">📖</a> <a href="#infra-favna" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-favna" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/apps/renovate"><img src="https://avatars.githubusercontent.com/in/2740?v=4?s=100" width="100px;" alt=""/><br /><sub><b>renovate[bot]</b></sub></a><br /><a href="#maintenance-renovate[bot]" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/apps/depfu"><img src="https://avatars.githubusercontent.com/in/715?v=4?s=100" width="100px;" alt=""/><br /><sub><b>depfu[bot]</b></sub></a><br /><a href="#maintenance-depfu[bot]" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/apps/dependabot"><img src="https://avatars.githubusercontent.com/in/29110?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dependabot[bot]</b></sub></a><br /><a href="#maintenance-dependabot[bot]" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
