const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/userfrom');
  console.log('db Connected.');
}

main().catch((err) => console.log(err));

// Schema userSchema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// created a model
const Users = mongoose.model('Users', userSchema);

const server = express();
server.use(cors());
server.use(bodyParser.json());

// CURD OPERATION
server.post('/', async (req, res) => {
  let user = new Users();
  user.username = req.body.username;
  user.password = req.body.password;
  const doc = await user.save();

  console.log(doc);
  res.json(doc);
});

server.get('/', async (req, res) => {
  const docs = await Users.find({});
  res.json(docs);
})

server.listen(8090, () => {
  console.log('server Started on port number 8090');
});
