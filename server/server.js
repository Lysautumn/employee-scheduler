// Requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('build'));

// Router requires
const managerRouter = require('./routes/manager.router');
const employeeRouter = require('./routes/employee.router');

// Routers
app.use('/manager', managerRouter);
app.use('/employee', employeeRouter);

// Listen
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
})