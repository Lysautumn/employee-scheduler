# Employee Scheduler

Welcome to my employee scheduler! This app allows users to select between a `Manager` or `Employee` role. The Manager role allows users to see all shifts scheduled, ordered by date. The Manager is also able to see the schedule of a specific employee and schedule new shifts. The Employee is able to see the shifts of individual employees.

This app can be accessed here: or run locally following the instructions below:

## Installation

### Prerequisites

- Node/npm
- Postgresql v11.2
- I recommend a Postgresql client, such as [Postico](https://eggerapps.at/postico/)
- I recommend a GUI to hit API endpoints, such as [Postman](https://www.getpostman.com/)

### Steps

- Adjust config settings for database in `server/modules/pool.js` file
- Run Postgresql queries in the `database.sql` file to get the databases set up
- Clone the [repo](https://github.com/Lysautumn/employee-scheduler) for this project to your local machine
- `cd` into the project
- Run `npm install` to install required dependencies
- Open a second Terminal window in the same directory
- Run `npm run server` in one Terminal window
- Run `npm run client` in the other Terminal window, this should open http://localhost:3000 in your browser. If not, navigate to that url to view the app.

## Accessing API Endpoints

In order to access some of the API endpoints, you may need to provide information in the following formats:

- Integers (ids)
- Dates as `"2019-07-20T10:00:00Z"` (start and end dates)

To view all scheduled shifts (ordered by date): `GET http://localhost:5000/manager`

To view scheduled shifts for a specific employee: `GET http://localhost:5000/employee/:id`

To add a new shift to the schedule: `POST http://localhost:5000/manager/new-shift` with the following request body format:
```
{
    emp_id: 1,
    start_time: '2019-06-20T19:30:00.000Z',
    end_time: '2019-06-20T19:30:00.000Z'
}
```
*Note*: Make sure data is sent as type `application/x-www-form-url-encoded`.

## Future 

- Refactor the backend in Go as a mechanism to learn the language
- Authentication has not been implemented on this project, and would be a natural next step to provide a more realistic separation between manager and employee roles
- Implement Redux to make state management easier and make the front-end code less repetitive
- Implement testing

## Technologies Used

- React
- Node.js
- Express
- Postgresql
- Axios
- MomentJS
- Material UI