const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const cors = require('cors');
const PORT = 8000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log('Server is listening on port 🚀', PORT);
});
