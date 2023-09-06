# Blaze crash game web srapping with Puppeteer

A simple functionality for getting crash values from [Blaze](https://blaze.com/pt/games/crash) until you close the server.

# Getting started

## Dependencies

```
Node 14.17.0
```

## Installing

Clone this repository and open its folder.

```
git clone https://github.com/caickdias/blaze-crash-scrap.git
cd blaze-crash-scrap
```
Then run npm install to install dependencies

```
npm install
```

# Usage

## Server

To start scrapping the values, go to `./scrap` folder and run the command below. It will run and check for values each 10 seconds and until you close the server. You can close with with the command "Ctrl + c" or similar. Make sure you removed "type": "module" from package.json for this.

```
cd scrap
node server
```

## Simulate

First, make sure you have "type": "module" in your package.json. Then navigate to `./simulate` folder for running some simple bet simulations. Then run the command below.

Inside 'data.js' should be an array of objects extracted from the server scrap data. 
'entries.js' will just get the values from each entry.

```
cd simulate
node index
```

## Built with

[Puppeteer](https://pptr.dev/): Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol.

## License

[MIT](https://choosealicense.com/licenses/mit/)
