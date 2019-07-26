const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./models.js');
const secrets = require('./secrets.js');


const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/api/users', getUsers);
};

function register(req, res) {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });

  }

function login(req, res) {
  const { username, password } = req.body;
  console.log("in login function")
  Users.findBy({ username })
    .first()
    .then(user => {
      console.log("in then");
      if (user && bcrypt.compareSync(password, user.password)) {
        console.log("passwords match");
        const token = generateToken(user);
        console.log("token generated", token);
        res.status(200).json({
          message: `Welcome ${user.username}`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
}

function getUsers(req, res) {
  Users.find()
  .then(users => {
    res.json(users);
  })
  .catch(err => res.send(err));
}
function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function generateToken(user) {
  console.log("in generate token");
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1d',
  };

  console.log("about to return token");
  console.log("payload", payload);
  console.log("jwt secret", secrets.jwtSecret);
  console.log("options", options);
  return jwt.sign(payload, secrets.jwtSecret, options);
}