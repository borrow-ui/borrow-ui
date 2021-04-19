# Demo Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is a minimal demo application used to see if the build of the UI package works.
The compiled CSS must be included as well (see `App.js`):

```jsx
import "@borrow-ui/ui/lib/ui.full.css";
```

`package.json` dependency needs to updated when a new version is released.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
