const express = require('express');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const hpp = require('hpp');

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }), hpp());


if (!isDev) {
  app.use('/build', express.static(`${paths.public}/build`));
  app.get('*', (req, res) => {
    res.sendFile(`${paths.public}/index.html`);
  });
}

const PORT = parseInt(process.env.PORT, 10) || 5000;
app.listen(PORT, (error) => {
  if (error) {
    console.error(`ERROR: ${chalk.red(error)}`);
  }
  console.info(chalk.cyan(`Express server is listening PORT (${PORT})`));
});
