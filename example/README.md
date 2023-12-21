# Example React App

This is a simple example React application that showcases the integration Etherspot UI library component of the Etherspot Transaction Kit for sending transactions, sending ERC tokens, and other Ethereum-related functionalities.

## Table of Contents .

### Prerequisites

Before you begin, ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

Please ensure that you have the Editor Config plugin installed for VS Code:

Name: EditorConfig for VS Code
Id: EditorConfig.EditorConfig
Description: EditorConfig Support for Visual Studio Code
Version: 0.16.4
Publisher: EditorConfig
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig


# Developing locally

Clone the repository:
git clone https://github.com/your-username/etherspot-ui.git

Navigate to project Directory
cd etherspot-ui

Install dependencies:
npm install

Before running the app, you need to build the project using Rollup. Use the following command:
npm run rollup:build

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Install Etherspot UI library with latest version using npm or yarn

npm install @etherspot/etherspot-ui

Plug in your library

For example you need to send Native Token use component import with possible props

import {
  SendNativeToken,
} from "@etherspot/etherspot-ui";

Use imported component with possible props

You can now make code changes in this repository and changes will be reflected in the Example app.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
