//Import Modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

//Define App
var app = express();


//Route
const route = require('./Routes/route');

//Connection
mongoose.connect('mongodb://localhost:27017/contactlist');
mongoose.connection.on('connected', ()=>{
	console.log('Database is Connected at port: 27017');
});
mongoose.connection.on('error', (err)=>{
	if(err)
		console.log('Database Connection Failed', err);
});


//Middleware
app.use(cors());
app.use(bodyparser.json());

//Static File
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', route);

//Port
const PORT = 3000;
app.listen(PORT, ()=>{
	console.log('Serve Started at port: '+ PORT);
});