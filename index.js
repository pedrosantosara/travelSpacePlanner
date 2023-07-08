const express = require('express');
const routes = require('./src/routes/travel-plans.js')


const app = express();

app.use(express.json());
app.use(routes);


app.listen(3000
  , async () => {
    
  })

