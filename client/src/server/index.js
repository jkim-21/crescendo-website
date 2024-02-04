const express = require('express');
const app = express();
const users = require('./routes/users')

app.use('/api/user', users);


app.get('/api', (req, res) => {
    res.send('hello world from express!');
});

app.listen(1235);