This is a dynamic single-page application that visualises data from COVID-19 Canada Open Data Working Group's API as a dashboard. 

Every time the user selects a new particular region of Canada from the dropdown in the header, created with the help of the imported library 'react-select', the application fetches COVID-19 data. Given the API's response, particular components within the application re-renders with relevant COVID-19 information including:
- The last time the information was updated by the maintainers of the API.
- Total cumulative cases, tests, deaths and vaccinations corresponding to the location selected.

Building this application helped me further familiarise myself with JSX and React hooks - useEffect and useState.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

