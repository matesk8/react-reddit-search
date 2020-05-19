## Starting the application on port 3000
**Note: if you can't run the app on port 3000, look below how to start on a different port**

In the project directory, you can run:
##### `npm i`

Then run:
##### `npm start`

This will start the app on: [http://localhost:3000](http://localhost:3000)
<br />

## Starting the application - on a different port
Because the RedditAPI requires clients to use OAuth, the redirect path on Reddit must match the localhost path.

To start the app on a different port:
Open the
##### `package.json`
and change the
##### `"start": "react-scripts start",`
to
##### `"start": "PORT=[YOUR_PORT] react-scripts start"`
<br />

Go to https://www.reddit.com/prefs/apps and click "are you a developer? create an app..."
<br />
Create an app, for the type select `installed` we're using the implicit flow, and for the redirect url enter: `http://localhost:[YOUR_PORT]/home`

Now open the
##### `src/config/reddit.config.json`
and change the
##### `"appId: 'khPBf6R-M0yLkw'`
##### `"redirectURI: 'http://localhost:3000/home'`
to
##### `"appId: '[YOUR_APP_ID]'`
##### `"redirectURI: 'http://localhost:[YOUR_PORT]/home'`

Then run:
##### `npm start`

## Run tests
##### `npm run test`
