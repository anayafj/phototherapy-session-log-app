const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
require('./models/Users');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());
const port = process.env.port || 5000;

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	}),
);

app.use(passport.initialize());
app.use(passport.session());
// app.get('/', (req, res) => {
// 	res.send('Hello World!');
// });

require('./routes/authRoutes')(app);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
