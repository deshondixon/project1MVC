const express = require('express');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const path = require('path');
const db = require('./config/connection');
const utils = require('./utils/destination');

const cors = require('cors');

db.on('error', (error) => console.error(error));

db.once('open', () => console.log('Successfully connected to the database!'));

const PORT = process.env.PORT || 3001;
const app = express();

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
