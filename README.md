# cs467_capstone

The objective of this project is to explore and identify AI's potential through the development of a web application designed to assist computer science students in managing their jobs, skills, and contacts. We interacted with AI tools such as ChatGPT, Gemini, and Bing Copilot to aid in the creation of this MERN application.

<p align="center">
    <img src="https://img.shields.io/github/repo-size/alesiram/cs467_capstone">
    <img src="https://img.shields.io/badge/MongoDB-orange">
    <img src="https://img.shields.io/badge/Express-orange">
    <img src="https://img.shields.io/badge/React-orange">
    <img src="https://img.shields.io/badge/Node-orange">
</p>

## Table of Contents

- [Description](#description)
- [Usage Instructions](#usage-instructions)
- [Installation](#installation)
- [Technologies](#technologies)

## Description

A user can sign up for an account and log in to manage their jobs, skills, and contacts. The application also provides metrics and search features to help users more efficiently manage their information. Authorization and authentication in in place to ensure that users can only access their own information, preventing unauthorized access to other users' data.

## Usage Instructions

1. Sign up for an account with a username and password.
2. Log in to an account with a valid username and password.
3. Use the navigation bar to navigate to the home, jobs, skills, and contacts pages to manage jobs, skills and contacts.

<b>On each respective page</b>:
-- View skills/jobs/contacts
-- Create a new skill/job/contact
-- Edit an existing skill/job/contact
-- Delete a skill/job/contact
-- Search skills/jobs/contacts
-- View metrics for skills/jobs/contacts

<b>NOTE:</b> users will first need to sign up and log in to an account in order to use the application. Use the log in button from the home page to create a new account and log in.

## Installation

<i>Instructions are shown using node package manager (npm). If you need to install node or npm, here are some useful guides:
- [npm Docs for downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Node.js](https://nodejs.org/en)
- [Node Version Manager](https://github.com/nvm-sh/nvm)
</i>

<b>1. Clone the repository to your local machine.</b>

```
git clone https://github.com/alesiram/cs467_capstone.git
```

<i>Useful Resources:</i> [Github docs for cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

<b>2. Navigate to the project's root directory</b>

```
cd cs467_capstone
```

<b>3. Install dependencies in both the `tracker-rest` and `tracker-ui` folders.</b> 

- For the backend (Node/Express), navigate from the project's root directory to the server directory `tracker-rest` and install the dependencies:

```
cd tracker-rest
npm install
```

- For the frontend (React), navigate from the project's root directory to the client directory `tracker-ui` and install the dependencies:

```
cd tracker-ui
npm install
```

<b>4. Update Environment Variables in both the `tracker-rest` and `tracker-ui` folders.</b>

- Create a `.env` file directly in the `tracker-rest` folder and add the following environment variables:
```
MONGO_URI='REPLACE_WITH_YOUR_MONGO_DB_URI_STRING'
JWT_SECRET='REPLACE_WITH_YOUR_SECRET'
PORT=3000
```

- Create a `.env` file directly in the `tracker-ui` folder and add the following environment variable:
```
PORT=8000
```

<i>Note:
- A MongoDB account/cluster is required (see resources below for getting started). The MongoDB connection string may look something like this (example from MongoDB site):

```
mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@cluster0.example.mongodb.net/?retryWrites=true&w=majority
```

- The JWT_SECRET can be any string, however be aware the secret is crucial for secure creation and verification of JWT (JSON Web Tokens).

- Ports can be changed, however, the proxy (i.e. `"proxy": "http://localhost:3000"`) in the frontend's 'tracker-ui' `package.json` file and the `PORT` environment variable in the backend 'tracker-rest' `.env` file should be set to the same value.

</i>


<i>Useful Resources:</i>
- [MongoDB Get Started with Atlas](https://www.mongodb.com/docs/atlas/getting-started/) (Note: recommend Atlas UI)
- [MongoDB Connection Strings](https://www.mongodb.com/docs/manual/reference/connection-string/)

<b>5. Start both the frontend and backend servers</b> 

- For the backend (Node/Express), navigate to the server directory `tracker-rest` and run:

```
npm start
```

- For the frontend (React), navigate to the client directory `tracker-ui` and run:

```
npm start
```

<b>6. Use the application!</b>

- Once both servers are running concurrently, you should see the web application running on `http://localhost:8000/` (or the port specified if changed) and you can go to signup/login at `http://localhost:8000/login`.

### Build

The instructions above detail running the application in the development environment. The application can also be built and run from a single server that looks for any build files and will use them if there is a `build` folder.

<i>(<b>NOTE:</b> manual page refreshes should be avoided when using the build version to prevent auth messages. If you manually refresh a page, simply return to the home page [i.e. `http://localhost:3000/` ] and navigate using the nav bar)</i>

Follow all of the installation steps above, but instead of running <b>Step 5</b>, replace with the following steps:

<b>1. Ensure all dependencies and env variables are added</b> 

- Ensure that all dependencies are installed in both the `tracker-ui` and `tracker-rest` folders (see above step 3)
- Ensure the `tracker-rest` `.env` file has the required `env variables`. (see above step 4)
- Note, the build will use the `PORT` identified from the `tracker-rest` `.env` file

<b>2. Run the build</b> 

- Navigate to the `tracker-ui` folder and run the below. A `build` folder will be created in the `tracker-ui` folder containing the static files:
```
npm run build
```
- Note, it may take a few minutes to complete and you can simply delete the `build` folder and run the command again to ensure you're working with the most current version.

<b>3. Start the server </b> 

- Then, navigate to the `tracker-rest` folder and run the below. This will start the server, and the application will use the build files: 
```
npm start
```

<b>4. Use the application! </b> 

- The application will be available via the `PORT` specified in the `tracker-rest` `.env` file. Following the example `.env` variables above, the `PORT` is set to `3000` so the application will run on `http://localhost:3000` instead of `http://localhost:8000`. When using the build there is no need to start the development server in the `tracker-ui`.


<b>Using Forever </b> 

Alternatively, the `forever` library can be used to run the server continuously (i.e. forever). See the [forever documentation](https://github.com/foreversd/forever#readme) for more information and usage, and use it cautiously. So, instead of starting the server with `npm start`, it can be started via the below:

```
npx forever start server.mjs
```

And it can be stopped via:

```
npx forever stop server.mjs
```

And to see if there are any forever processes running:

```
npx forever list
```

## Technologies

##### Artificial Intelligence Tools
-- [ChatGPT](https://chat.openai.com/)
-- [Gemini](https://gemini.google.com/app)
-- [Bing Copilot](https://copilot.microsoft.com/)

### Frontend

##### Styling and UI
- `@emotion/react` and `@emotion/styled`: CSS-in-JS libraries for styling components.
- `@mui/material` and `@mui/icons-material`: Material-UI components and icons for React.
- `@mui/x-data-grid`: Data grid component from Material-UI for displaying and manipulating large datasets.
- `react-modal`: Accessible modal dialog component for React.
- `react-select`: A flexible and beautiful Select Input control for ReactJS.

##### Testing
- `@testing-library/jest-dom`: Custom jest matchers to test the state of the DOM.
- `@testing-library/react`: React testing library to test React components.
- `@testing-library/user-event`: Simulate user events for testing.

##### Environment
- `dotenv`: Loads environment variables from a `.env` file.

##### Core Libraries
- `react` and `react-dom`: React library and its DOM bindings.
- `react-scripts`: Configuration and scripts for Create React App.

##### Routing
- `react-router-dom`: DOM bindings for React Router.

##### Performance Monitoring
- `web-vitals`: Library for measuring all the Web Vitals metrics.

### Backend

##### Database
- `mongoose`: MongoDB object modeling tool designed to work in an asynchronous environment.

##### Security
- `bcryptjs`: Library for hashing and salting user passwords.
- `jsonwebtoken`: Implementation of JSON Web Tokens for secure transmission of information.

##### Server
- `express`: Fast, unopinionated, minimalist web framework for Node.js.

##### Development Tools
- `nodemon`: Utility that monitors for any changes in your source and automatically restarts your server.
- `dotenv`: Loads environment variables from a `.env` file for Node.js projects.
- `forever`: CLI tool for ensuring a given script runs continuously, automatically restarting it if it stops or fails

[Back to Top](#table-of-contents)