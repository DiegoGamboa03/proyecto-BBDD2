const express = require('express');
const morgan = require('morgan');
const db = require('./Config/DatabaseConfig');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use('/workers', require('./Routes/Worker'));
app.use('/salaryChanges', require('./Routes/SalaryChange'));
app.use('/restLeave', require('./Routes/RestLeave'));
// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});