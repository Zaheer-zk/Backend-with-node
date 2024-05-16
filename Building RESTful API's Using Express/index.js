const JOI = require('joi');
const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const app = express();

//* Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(function (err, req, res, next) {
  console.log('Logging...');
  next();
});

app.set('view engine', 'pug');

//* app.get('env') by-default development we can set NODE_ENV as change env..
if (app.get('env') === 'development') app.use(morgan('tiny'));

//* Constants
const PORT = process.env.PORT || 5000;

console.log('process.env.PORT: ', process.env.PORT);

// HTTP Methods ----
// app.get()
// app.post()
// app.put()
// app.delete()

const courses = [
  { id: '1', name: 'JS' },
  { id: '2', name: 'DSA' },
];

app.get('/', (req, res) => {
  // (incomingRequest, sererResponse)
  // This callback function called's on provided path requested
  res.render('index', {
    title: 'Hello',
    message: 'Hello there From Zaheer🙎‍♂️!',
  });
});

//* Route Params
// app.get('/api/:name', (req, res) => {
//   console.log(req.params);
//   let { name } = req.params; // uri = '/<this place refers to name parameter>'

/*  This route handler listens for GET requests
  on a path that includes a parameter called "name".
  When a request is made to this endpoint,
  it logs the parameters received in the request object,
  extracts the value of the "name" parameter,
  and then sends a response back with a greeting message using the extracted name.
  For example, if a request is made to "/John",
  the server will respond with "Hello from Mr John". */

// we can use any string as param using ":<paramString>"
//   res.send(`Hello from  Mr ${name}  `);
// });

//* Query Params
// http://localhost:8080/api/course/2?name=zaheer&age=23
app.get('/api/course/:id', (req, res) => {
  console.log(req.params); // { id: '2' }
  console.log(req.query); //{ name: 'zaheer', age: '23' }
  const { id } = req.params;
  const result = courses.find((course) => parseInt(course.id) === parseInt(id));

  //* Exception handling
  if (!result) {
    return res.status(404).send(`Course with id: ${id} doesn't exist`);
  }
  res.status(200).send(result);
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/course', (req, res) => {
  //* Input Validation with JOI
  const schema = JOI.object({
    name: JOI.string().min(3).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(404).send(result.error.details[0].message);
    return;
  }

  let n = courses.length;
  const lastCourseId = courses[n - 1].id;

  const course = {
    id: String(+lastCourseId + 1),
    name: req.body.name,
  };

  courses.push(course);

  res.status(201).send(course);
});

app.delete('/api/course/:id', (req, res) => {
  const { id } = req.params;
  const result = courses.find((course) => parseInt(course.id) === parseInt(id));

  //* Exception handling
  if (!result) {
    return res.status(404).send(`Course with id: ${id} doesn't exist`);
  }

  const index = courses.indexOf(result);

  const deletedCourse = courses.splice(index, 1);

  res.status(201).send(deletedCourse);
});

//* Server Listening
app.listen(PORT, () => {
  console.log(`Listening on Port 🚀: ${PORT}`);
});
