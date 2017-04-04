![Pepperoni - Empowered by Futurice](/docs/pepperoni.png?v=2)
React Native Sample App based on [Pepperoni Starter Kit](http://getpepperoni.com)
===

[![Build Status](https://travis-ci.org/futurice/pepperoni-app-kit.svg?branch=master)](https://travis-ci.org/futurice/pepperoni-app-kit)
[![React Native](https://img.shields.io/badge/react%20native-0.42.0-brightgreen.svg)](https://github.com/facebook/react-native)
[![Sponsored](https://img.shields.io/badge/chilicorn-sponsored-brightgreen.svg)](http://spiceprogram.org/oss-sponsorship/)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/futurice/pepperoni-app-kit/blob/master/LICENSE)

React Native Starter Kit is a part of [Pepperoni](http://getpepperoni.com), a framework for kickstarting digital product development.

## How to create your React Native using Pepperoni

### Step 1: Mirror Pepperoni starter kit repository

To build your own app on top of the Pepperoni Starter Kit, you will need to create a new repository and mirror the [Pepperoni repository](https://github.com/futurice/pepperoni-app-kit), you can  follow [these instructions](https://help.github.com/articles/duplicating-a-repository/) about how to mirror a repository.


### Other useful information

##### Start the application in iOS simulator
```
$ react-native run-ios
```

##### Start the application in Android simulator
(If using the stock emulator, the emulator must be running)
```
$ react-native run-android
```

##### Run unit tests
```
$ npm test
```

##### Run tests every time code changes
```
$ npm run test:watch
```

##### Generate code coverage report
```
$ npm run coverage
```

Read the **[Testing guide](docs/TESTING.md)** for more information about writing tests.

### Debugging

For standard debugging select *Debug JS Remotely* from the React Native Development context menu (To open the context menu, press *CMD+D* in iOS or *D+D* in Android). This will open a new Chrome tab under [http://localhost:8081/debugger-ui](http://localhost:8081/debugger-ui) and prints all actions to the console.

For advanced debugging under **macOS** we suggest using the standalone [React Native Debugger](https://github.com/jhen0409/react-native-debugger), which is based on the official debugger of React Native.
It includes the React Inspector and Redux DevTools so you can inspect React views and get a detailed history of the Redux state.

You can install it via [brew](https://brew.sh/) and run it as a standalone app:
```
$ brew update && brew cask install react-native-debugger
```
> Note: Make sure you close all active chrome debugger tabs and then restart the debugger from the React Native Development context menu.

## Deployment

Read the **[Deployment guide](docs/DEPLOYMENT.md)** to learn how to deploy the application to test devices, app stores, and how to use Code Push to push updates to your users immediately.

## License

[MIT License](LICENSE)

## Credits

The original project was initially motivated by [Snowflake](https://github.com/bartonhammond/snowflake), a React Native boilerplate by Barton Hammond. It shares some features and design principles for Pepperoni, but it wasn't the right fit for our needs. At this time Snowflake is more mature, so if you like Pepperoni but didn't agree with something we are doing, you should check it out to see if it's a good fit for your app.
