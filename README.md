# Citizen Journey Map Project Codebase Overview

## App Walkthrough

### `/`

- App dashboard
- "Login" and "Register" buttons both lead to `/surveyForm0` page, which begins to Citizen Journey Map process
- includes original art by Daniela and ENJ logo
- "Login" or "Register" button creates new `mapRef` data object and saves it to Firebase database

### `/surveyForm0`

- First survey page and beginning of Citizen Journey Map process
- Asks demographic information about gender, age, and household income
- "Previous" button goes to `/`
- "Next" button goes to `/surveyForm1` only when all questions have been answered 

### `/surveyForm1`

- Second survey page and continuation of Citizen Journey Map process
- Asks demographic information about education level, residence city, and kilometers traveled
- "Previous" button goes to `/surveyForm0`
- "Next" button goes to `/surveyForm2` only when all questions have been answered 

### `/surveyForm2`

- Final survey page and continuation of Citizen Journey Map process
- Asks demographic information about legal representation, legal process type, and court distirct
- "Previous" button goes to `/surveyForm1`
- "Next" button goes to `/confirmationPage` only when all questions have been answered 

### `/confirmationPage`
- Lists user's answers to all survey questions 
- Allows user to verify survey responses before moving on to data entry phase of Citizen Journey Map process
- "No... go back button" goes back to `/surveyForm2`
- "Yes! Continue" button saves demographic information to `demographics` key of `mapRef` data object and saves to Firebase database
- "Yes! Continue" also goes to `/mapForm` data entry page

### `/mapForm`
- data entry portion of Citizen Journey Map process
- populates page with one `PhaseForm` for each of the seven pre-defined phases
- phases defined in `MapForm.js` file
- populates each `PhaseForm` with one `StepForm` by default
- Each `StepForm` allows users to enter title, description, rating, and stepTime information
- Each `PhaseForm` has an "AddStep" button that adds a new step to the current `PhaseForm`
- Each `StepForm` has a delete button that removes the current step from the `PhaseForm`
- At the bottom of the page, the "Save" button saves user-entered information to `phases` key of `mapRef` data object and saves to Firebase database
- The "Save" button updates database to reflected newly added or deleted steps 
- The "Close Process" button directs user back to the `/` dashboard and terminates the Citizen Journey Map process
- The "Journey Map" button performs the same functions as the "Save" button and redirects to the `/map' page

### `/map`
- 



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
