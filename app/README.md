## Application setup

- cd to the root `aptitude-test` folder
- run `npm install`
- Run `npm run watch` to run the gulp compiler
  - Sometimes the first time you turn the watcher on it does not Browserify the TypeScript properly. Once you have run the above watch command, open a new terminal window (`cmd + t`) and run `gulp BrowserifyTS` to be certain it has run properly
