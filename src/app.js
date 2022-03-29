const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

const connect = require('./config/database');

const app = express();

// load dotenv
dotenv.config({ path: './config/config.env'});

// connect to database
connect()

// Mout routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const categories = require('./routes/categories');
const channels = require('./routes/channels');
const playlists = require('./routes/playlists');
const videos = require('./routes/videos');
const videoComments = require('./routes/videoComments');
const posts = require('./routes/posts');
const postComments = require('./routes/postComments');
const subscribtions = require('./routes/subscribtions');
const likes = require('./routes/likes');


// Set static folder
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Load routes
app.use('/api/v1/auth',auth);
app.use('/api/v1/users',users);
app.use('/api/v1/categories',categories);
app.use('/api/v1/channels',channels);
app.use('/api/v1/playlists',playlists);
app.use('/api/v1/videos',videos);
app.use('/api/v1/videoComments',videoComments);
app.use('/api/v1/posts',posts);
app.use('/api/v1/postComments',postComments);
app.use('/api/v1/subscribtions',subscribtions);
app.use('/api/v1/likes',likes);

const PORT = process.env.PORT || 5000;

// Run the server
database.sync()
  .then(result => {
		const server = app.listen(PORT,console.log(`Server running in `))
	})
	.catch(err => console.log(err));

