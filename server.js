const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
// This calls the index file in the routes file handling all paths for webpages
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();

// Used clog per suggestion from tutor to log the responses during testing to see if
// responses were being generated.
app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.use(express.static('public'));



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
