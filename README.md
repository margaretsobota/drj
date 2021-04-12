# Citizen Journey Map Project Codebase Overview

## Definitions
**Team**: a group of users who have access to a shared repository of customer journey maps

**Phase**: A pre-researched and already provided stage in the given legal process. Cannot be altered by users. Each phase must include at least one step from each user. Called `PhaseForm` in database

**Step**: Specific action/event in the customer’s legal process. Falls under one of the given, pre-defined phases. Called `StepForm` in database

**Frontend Step**: User inputted step. Dynamic, can be added or deleted

**Backend Step**: Pre-provided list of steps taken by a court on a particular process

**Journey Map**: A visualization of a user's process through a given legal system. Referenced as “Map Visualization”

**X-Axis**: Component of Journey Map visualization depicting all of the phases to complete a specific legal process

**Y-Axis**: Component of Journey Map visualization depicting star rating from 1 (bottom) to 5 (top) of a particular step

**User Account**: User's login associated with a team. Given access to their team’s storage of maps

**Team Database**: set of all the user map data inputted by a particular team

**Category Database**: set of all data from a specific court across all categories or of all data from a specific procedure across all courts

**Category**: specific court/legal process that the map is associated with (must be defined at time of map creation)

## App Walkthrough

### `/`

- App dashboard
- `Login` and `Register` buttons both lead to `/surveyForm0` page, which begins the Citizen Journey Map process
- `Login` or `Register` button creates new `mapRef` data object and saves it to Firebase database

### `/surveyForm0`

- First (of 3) survey page and beginning of Citizen Journey Map process
- Asks demographic information about gender, age, and household income
- `Previous` button goes to `/`
- `Next` button goes to `/surveyForm1` and is only clickable once all questions have been answered 

### `/surveyForm1`

- Second (of 3) survey page and continuation of Citizen Journey Map process
- Asks demographic information about education level, city of residence, and distance (in kilometers) traveled to the court
- `Previous` button goes to `/surveyForm0`
- `Next` button goes to `/surveyForm2` only when all questions have been answered 

### `/surveyForm2`

- Final (of 3) survey page and continuation of Citizen Journey Map process
- Asks demographic information about legal representation, legal process type, and court distirct
- `Previous` button goes to `/surveyForm1`
- `Next` button goes to `/confirmationPage` only when all questions have been answered 

### `/confirmationPage`
- Lists user's answers to all survey questions by manually mapping key values to desired selected choices
- Allows user to verify survey responses before moving on to data entry phase of Citizen Journey Map process
- `No... go back` button goes back to `/surveyForm2`
- `Yes! Continue` button saves demographic information to `demographics` key of `mapRef` data object and saves to Firebase database
- `Yes! Continue` also goes to `/mapForm` data entry page

### `/mapForm`
- Data entry portion of Citizen Journey Map process
- Populates page with one `PhaseForm` for each of the pre-defined phases
- Phases defined in `MapForm.js` file
- Populates each `PhaseForm` with one `StepForm` by default. Users MUST input at least one step per phase
- Each `StepForm` asks users to enter title, description, sentiment rating, and stepTime information
- Each `PhaseForm` has an "AddStep" button that adds a new step to the current `PhaseForm`
- Each `StepForm` has a delete button that removes the current step from the `PhaseForm`
- Each `StepForm` has a change order that has no functionality
- At the bottom of the page, the "Save" button saves user-entered information to `phases` key of `mapRef` data object and saves to Firebase database
- The `Save` button updates database to reflected newly added or deleted steps 
- The `Close Process` button at the bottom of all `PhaseForm` directs user back to the `/` dashboard and terminates the Citizen Journey Map process
- The `Journey Map` button in the upper left corner performs the same functions as the `Save` button and redirects to the `/map' page

### `/map`
- Last step of Citizen Journey Map process
- Displays a visual Citizen Journey map based on the live user-entered information from the `/mapForm` page
- Horizontal axis (X-axis) displays the pre-defined phases
- Vertical axis (Y-axis) represents the user's sentiment rating of each step in the process
- Each step is given a symbol based on which phase it is associated with and the title of the step is displayed above it
- Upon hovering over each step, the description of the step appears in a white box below the step's symbol
- The `Download PDF` button saves a PDF version of the Citizen Journey Map to the user's local desktop

## Future Steps

### General Platform
- Decide on a project name
-	Click Lab ENJ Logo to return to home page (crash page)
-	Translate into Spanish
-	Design available at https://www.figma.com/file/Ama8y5nX0rTCff8W0SB8aC/Journey-Map---RD---Divorce?node-id=0%3A1
-	Mockups available at https://app.mural.co/t/tfdcabogados3277/m/tfdcabogados3277/1612975978631/98463ab07c6220f0ca831a3049492b60f5848139


## Firebase Overview

## React Overview

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
