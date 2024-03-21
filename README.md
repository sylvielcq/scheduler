# Interview Scheduler

Interview Scheduler is a React application that allows users to book, modify and cancel appointments.

It is built using React, Node, Express, PostgreSQL, Webpack, Axios, StoryBook, CSS, SASS, and tested with Jest (integration) and Cypress (E2E).

This is my fifth project at Lighthouse Labs, after [Lotide](https://github.com/sylvielcq/lotide), [TinyApp](https://github.com/sylvielcq/tinyapp), [Tweeter](https://github.com/sylvielcq/tweeter-app) and midtem project [Flavour Labs](https://github.com/sylvielcq/Flavour-Labs).

## Features

* The number of available interview slots is displayed for each day, and updated when an interview is booked or cancelled.
* Confirmation display when attempting to cancel an interview.
* Error display if an interview cannot be saved or deleted.
* Status indicator while asynchronous operations are in progress.
* Data is persisted by the API server using a PostgreSQL database.

## Final Product

### Navigate the App and book a new Appointment
![book-appointment](https://github.com/sylvielcq/scheduler/blob/master/docs/scheduler-create-appointment.gif)

### Modify an Appointment
![modify-appointment](https://github.com/sylvielcq/scheduler/blob/master/docs/scheduler-edit-appointment.gif)

### Cancel an Appointment
![cancel-appointment](https://github.com/sylvielcq/scheduler/blob/master/docs/scheduler-cancel-appointment.gif)

## Dependencies

* axios:0.27.2
* classnames: ^2.2.6
* normalize.css: ^8.0.1
* react: ^16.14.0
* react-dom: ^16.9.0
* react-scripts: 3.4.4

## Dev-Dependencies

* "@babel/core": "^7.4.3",
* "@storybook/addon-actions": "^5.0.10",
* "@storybook/addon-backgrounds": "^5.0.10",
* "@storybook/addon-links": "^5.0.10",
* "@storybook/addons": "^5.0.10",
* "@storybook/react": "^5.0.10",
* "@testing-library/jest-dom": "^4.0.0",
* "@testing-library/react": "^8.0.7",
* "@testing-library/react-hooks": "^8.0.1",
* "babel-loader": "^8.0.5",
* "prop-types": "^15.8.1",
* "react-test-renderer": "^16.9.0",
* "sass": "^1.53.0"

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

### API Server

Fork the following repo, and follow the instructions there to run the API server: 
https://github.com/sylvielcq/scheduler-api
