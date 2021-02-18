# Crust wallet

Crust wallet is for project Crust

Crust wallet is currently a work in progress, so changes will occur.


## Prerequisites

- NodeJS >= v11
- Yarn latest

### Installation with zip

Download extension zip file from https://github.com/securityin/crust-wallet/suites/1946798529/artifacts/38506638
- Unzip the zip file downloaded
- Open chrome browser and Go to chrome://extensions
- Enable developer mode
- Click "Load Unpacked Extension"
- Navigate to the unzipped folder and click Ok to install the extension

### Installation

Execute the following to clone, install dependencies, and run a development server:

    git clone https://github.com/securityin/crust-wallet.git
    cd crust-wallet
    yarn install
    yarn run dev

Once running Chrome:

- Go to chrome://extensions
- Enable 'Developer Mode' (top right corner of window)
- Click "Load Unpacked" and select the crust-wallet/dev/chrome directory
- Navigate to : https://localhost:3000 and accept the https connection

The crust wallet icon should show up in your Chrome toolbar.

Once running Firefox:

- Go to about:debugging#/runtime/this-firefox
- Click 'Load Temporary Addon' 
- select the crust-wallet/dev/firefox directory
- Navigate to : https://localhost:3000 and accept the https connection

The crust wallet icon should show up in your Firefox toolbar.

License: [AGPL v3](https://github.com/securityin/crust-wallet/blob/main/LICENSE.md)
