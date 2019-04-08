const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('express-jwt');
const mongoose = require('mongoose');
const config = require('./core/config.json');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
global.config = Object.assign(config.development);
global.config['root'] = __dirname;
global.util = require('./core/util');
require('dotenv').config({ path: '../.env' })

mongoose.connect(`mongodb://ppm:ppm1234!@ds133556.mlab.com:33556/ppm`, { useNewUrlParser: true, useFindAndModify: false }, err => {
    console.log(err ? 'Could not connect to MongoDB' : 'Successfully connected to MongoDB');
  require('./core/init')();
});

/**
 * Configure app CORS, BodyParser, Morgan, and JWT authorization
 */
app.use(cors());
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );
app.use(jwt({ 
  secret: global.config.JWT_SECRET,
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}).unless({path: ['/api/auth']}));
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

/**
 * Route configuration in ./server/api/index
 */
require('./api')(app);
app.get('/', (req, res) => res.sendFile(path.resolve('./app/dist/PersonalPassMan/index.html')))
app.get('*', (req, res) => {
  if (fs.existsSync(path.resolve(`./app/dist/PersonalPassMan/${req.url}`))) {
    res.sendFile(path.resolve(`./app/dist/PersonalPassMan/${req.url}`))
  } else {
    res.sendFile(path.resolve('./app/dist/PersonalPassMan/index.html'))
  }
})

/**
 * Begin listening for requests
 */
app.listen(global.config.port, () => console.log(`Listening on port ${global.config.port}`));