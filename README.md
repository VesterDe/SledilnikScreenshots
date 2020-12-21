## Developing a new chart

Run `yarn` to install everything. You are now ready.

Add your new screenshot settings into an appropriate key inside `screenshots.js`.

There's a test.js file, that hopefully is in sync with index.js regarding functionality. Setting the variable at the top to control which screenshot to make.

Running `node test.js` should make a screenshot on your local machine the same way it will happen once you call the URL. Use this to develop a new screenshot and get the pixels/offsets just right.

## Deploying

Just push to master, the code will be live about 60 seconds after that.