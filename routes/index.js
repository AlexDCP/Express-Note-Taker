// this is the routes index file that handles the paths for the webpages.

const app = require('express').Router();
const htmlRoutes = require('./htmlRoutes');
const apiRoutes = require('./apiRoutes');

app.use('/api/notes', apiRoutes);
app.use('/', htmlRoutes);

module.exports = app;