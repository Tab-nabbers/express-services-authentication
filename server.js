const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/handlers');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 9000;

mongoose.set('useCreateIndex', true);

if (process.env.NODE_ENV === 'production') {
    mongoose.connect('mongodb://accimeesterlin:Septembre1@ds111622.mlab.com:11622/tabnabbers-dev', { useNewUrlParser: true });
} else {
    mongoose.connect('mongodb://localhost/tabnabbers', { useNewUrlParser: true });

}

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is starting at PORT ${PORT}`);
});