const express = require('express');
const app = express();
const PORT = 4000;
const router = require('./router.js');
const cors = require('cors')();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(router);

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`)); //eslint-disable-line
