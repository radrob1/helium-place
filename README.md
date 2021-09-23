# Getting Started with Helium Place

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). In order to run on your own infrastructure, you will need the following:
1) A method to generate the most recent list of hotspots and a URL to host that json file. An example json file can be found at hotspots.json. The URL needs to be provided on line 986 of src/components/Map/Map.js.
2) A Mapbox API key provided on line 99 of src/constants/MapConstants.js
3) Rename src/App-real.js to App.js

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

Deployment is handled through AWS Amplify Github integration.