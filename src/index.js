const express = require('express');
const morgan = require('morgan');
const db = require('./Config/DatabaseConfig');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

//GoogleApis Auth

const KEYFILEPATH = 'D:\Proyecto BBDD2\proyecto-BBDD2\proyectobbdd-1bc9bffb64c5.json';
const SCOPES = ['https://www.googleapis.com/auth/drive',
                "https://www.googleapis.com/auth/spreadsheets"];


const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use('/workers', require('./Routes/Worker'));
app.use('/salaryChanges', require('./Routes/SalaryChange'));
app.use('/workRestLeave', require('./Routes/WorkRestLeave'));
app.use('/workerRelative', require('./Routes/WorkerRelative'));
app.use('/retiredWorker', require('./Routes/RetiredWorkers'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});