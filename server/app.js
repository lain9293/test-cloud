const express = require('express');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoose = require('mongoose');
const { httpLogger, errorHandler, notFoundHandler } = require('./middleware');
const { files, auth } = require('./routers');
const { isDev, paths } = require('../utils');

const app = express();

mongoose.connect(`mongodb://${process.env.MONGODB_URL}/my-own-cloud`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(httpLogger());
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }), hpp());

app.use('/api/files', files);
app.use('/api/auth', auth);

// serve files in production environment
if (!isDev) {
  app.use('/build', express.static(`${paths.public}/build`));
  app.get('*', (req, res) => {
    res.sendFile(`${paths.public}/index.html`);
  });
}

app.use(notFoundHandler());
app.use(errorHandler());

const PORT = parseInt(process.env.PORT, 10) || 5000;
app.listen(PORT, (error) => {
  if (error) {
    console.error(`ERROR: ${chalk.red(error)}`);
  }
  console.info(chalk.cyan(`Express server is listening PORT (${PORT})`));
});
