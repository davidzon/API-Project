const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const config = require('./config/index');
const { environment } = require('./config');
const isProduction = environment === 'production';
const app = express();
const routes = require('./routes');
app.use(routes);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );
  module.exports = app;
