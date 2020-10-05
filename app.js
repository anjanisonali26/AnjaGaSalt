const express = require('express');
const dbConnect = require('./config/db');
const routes = require('./routes');
const app = express();
const port = 5000;

dbConnect();

app.use(express.urlencoded ({extended: false}));
app.use(express.json());
app.use(routes);



app.listen(port, ()=> {
    console.log(`App runs on http://localhost:${port}`);
});