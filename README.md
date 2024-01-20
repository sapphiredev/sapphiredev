<div align="center">

![Sapphire Logo](https://raw.githubusercontent.com/sapphiredev/assets/main/banners/SapphireCommunity.png)

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
```

You will need to configure the Wrangler secrets for Cloudflare Workers environment. You will need the following secrets:

-   `APP_ID`

-   `WEBHOOK_SECRET`

-   `PRIVATE_KEY`

The private-key.pem file from GitHub needs to be transformed from the PKCS#1 format to PKCS#8, as the crypto APIs do not support PKCS#1:

```sh
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in private-key.pem -out private-key-pkcs8.pem
```

Then set the private key

```sh
cat private-key-pkcs8.pem | wrangler secret put PRIVATE_KEY
```

For information on what these values are and how to get them see [this guide](https://dev.to/opensauced/deploy-a-github-application-to-cloudflare-workers-2gpm)

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
