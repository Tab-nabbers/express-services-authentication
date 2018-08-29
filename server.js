const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/handlers');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 9000;

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/tabnabbers', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is starting at PORT ${PORT}`);
});