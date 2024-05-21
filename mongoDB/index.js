const mongoose = require('mongoose');

//* DB connection
// mongoose.connect('mongodb://username:password@host:port/database?options...');
(async function () {
  const connection = await mongoose.connect(
    'mongodb://127.0.0.1:27017/playground'
  );

  if (connection) {
    console.log(
      'MongoDB connection stablish on PORT:',
      connection.connection.port
    );
  }
})();

// Assume this is a mock function to simulate a database check
async function isUsernameTaken(username) {
  // Simulating database check delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated taken usernames (in a real scenario, you would query the database)
  const takenUsernames = ['user1', 'user2', 'user3'];

  return takenUsernames.includes(username);
}

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

//* Schema building
const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length < 0;
        },
        message: 'Must contain at least one tag',
      },
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId, // reference ID (Normalization)
    //   ref: 'User', // Another table/ Collection
    //   required: true,
    // },
    userId: {
      type: userSchema,
      required: true,
    },
    username: {
      type: String,
      required: true,
      validate: {
        validator: async function (v) {
          const isTaken = await isUsernameTaken(v);
          return !isTaken;
        },
        message: (props) => `${props.value} is already taken!`,
      },
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
    },
  },
  { timestamp: true }
);

//* Model creation
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

// To use
/**
 const course = new Course({
  name: 'MongoDB',
  tag: ['Mongoose', 'NoSQL'],
  isPublished: true,
 })

 //* Now we can do DML on course which is a document
 const courseDate = await course.save() // takes time so need to use async/await 
 */

//* DML operation on Model
async function saveDML() {
  const course = new Course({
    name: 'Nodejs',
    tags: ['Backend'],
    isPublished: true,
  });

  const result = await course.save();

  console.log('Course inserted successfully: ', result);
}

saveDML();

//* Querying data
async function getAllCourses() {
  const result = await Course.find({ isPublished: true })
    .find({ name: /^Z/ })
    .limit(10)
    .sort({ name: 1 }) // sort by name ASC === 1 and DESC === -1
    .select({ name: 1, tags: 1 }) // only specify fields needed
    .populate('userId', 'name -_id'); // ('<CollectionName>', 'Field Which is need and not needed')
  if (result) {
    console.log('All courses:', result);
  }
}

getAllCourses();
