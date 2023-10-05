// To add the server or to communicate using HTTP we will use Express library
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

const middleware1 = (req, res, next) => {
  console.log('from middleware counter is : ', req.headers.counter);
  next();
};

// Middleware
app.use(middleware1);
app.use(bodyParser.json()); // extract the body from the request

app.get('/get_sum', (req, res) => {
  let countedSum = calculateSum(req.headers.counter);
  res.send(`<h1>countedSum:  ${countedSum} </h1>`);
});

app.post('/create-user', (req, res) => {
  // console.log(req.body);
  res.send('Create a user!');
  //   res.write('Hello World2!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

function calculateSum(counter) {
  let sum = 0;
  for (let i = 0; i <= counter; i++) {
    sum += i;
  }
  return sum;
}
