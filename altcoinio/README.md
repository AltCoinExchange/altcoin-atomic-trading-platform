# Altcoin.io

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Linking btcatomicswap to altcoinio

* $ cd btcatomicswap//
* $ yarn link
* $ cd altcoinio/
* $ yarn link btc-atomic-swap

## Allow crypto in angular
/node_modules/@angular/cli/models/webpack-configs/common.js
add crypto: true to node object

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
