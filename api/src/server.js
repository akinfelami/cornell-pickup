const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const app = express();
const userRouter = require('./routes/user');
const groupRouter = require('./routes/group');

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Connection
const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('Database is now connected');
	} catch (err) {
		console.error(err);
	}
};

// Router Middleware
app.use('/', userRouter);
app.use('/', groupRouter);

app.get('/', (req, res) => {
	res.send("<h1 style='text-align:center; margin-top:50px'>We are live!</h1>");
});

app.use('*', (req, res) => {
	res.status(404).json({
		success: 'false',
		message: 'Page not found',
		error: {
			statusCode: 404,
			message: 'You reached a route that is not defined on this server',
		},
	});
});

app.listen(port, function () {
	connectDb();
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
