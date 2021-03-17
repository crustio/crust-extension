# Crust wallet

Crust wallet is for project Crust

Crust wallet is currently a work in progress, so changes will occur.


## Prerequisites

- NodeJS >= v11
- Yarn latest

### Installation with zip

Download extension zip file from https://github.com/crustio/crust-extension/releases
- Unzip the zip file downloaded
- Open chrome browser and Go to chrome://extensions
- Enable developer mode
- Click "Load Unpacked Extension"
- Navigate to the unzipped folder and click Ok to install the extension

### Installation

Execute the following to clone, install dependencies, and run a development server:

    git clone https://github.com/crustio/crust-extension.git
    cd crust-wallet
    yarn install
    yarn run dev

Once running Chrome:

- Go to chrome://extensions
- Enable 'Developer Mode' (top right corner of window)
- Click "Load Unpacked" and select the crust-wallet/dev/chrome directory
- Navigate to : https://localhost:3000 and accept the https connection

The crust wallet icon should show up in your Chrome toolbar.

License: [AGPL v3](https://github.com/crustio/crust-extension/blob/main/LICENSE.md)
