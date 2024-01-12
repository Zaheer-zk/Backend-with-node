const express = require('express');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
const PORT = 8000;
const users = require('./MOCK_DATA.json');

// Middleware
app.use(express.urlencoded({ extended: false }));

//mongodb server connection
mongoose
  .connect('mongodb://127.0.0.1:27017/testDB')
  .then(() => {
    console.log('mongodb server connection established');
  })
  .catch((err) => console.log('Mongoose connection error: ' + err));

//User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: 'string', require: true },
    lastName: { type: 'string', require: true },
    email: { type: 'string', require: true, unique: true },
  },
  { timestamps: true }
);

// User model
const User = mongoose.model('user', userSchema);

//* ROUTES *
app.get('/api/users', (req, res) => {
  // GET all users
  return res.json(users);
});

app.post('/api/user', (req, res) => {
  const body = req.body;
  console.log(body);
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
  //   return res.json({ status: 'Created user with id : ' + users.length });
  // });

  //create a new user by server
});

// multiple routes handling
app
  .route('/api/users/:id')
  .get((req, res) => {
    // Get the user by id
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    // Update the user of id
    const body = req.body;
    console.log('body: ', body);
    const id = Number(req.params.id);

    // Find the user
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user's properties
    users[userIndex] = { ...users[userIndex], ...body };

    // Write the updated array back to the file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error writing file' });
      }

      // Return the updated user
      return res.json({ status: 'Updated', updatedUser: users[userIndex] });
    });
  })
  .delete((req, res) => {
    // Delete the user of id
    const id = Number(req.params.id);

    // Read the current users from the file
    fs.readFile('./MOCK_DATA.json', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading file' });
      }

      // Parse the JSON data
      let users = JSON.parse(data);

      // Find the index of the user in the array
      const index = users.findIndex((user) => user.id === id);

      // Check if user exists
      if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Remove the user from the array
      users.splice(index, 1);

      // Write the updated array back to the file
      fs.writeFile(
        './MOCK_DATA.json',
        JSON.stringify(users, null, 2),
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Error writing file' });
          }

          // Return a response
          return res.json({ status: 'User deleted successfully' });
        }
      );
    });
  });

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
