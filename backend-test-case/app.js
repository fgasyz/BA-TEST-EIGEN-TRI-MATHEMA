const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorMiddleware = require('./src/middleware/error.middleware');

const memberRouter = require('./src/application/member.controller');
const bookRouter = require('./src/application/book.controller');
const loanRouter = require('./src/application/loan.controller');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = YAML.load('./swagger.yaml');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/members', memberRouter);
app.use('/api/books', bookRouter);
app.use('/api/loan', loanRouter);

app.use(errorMiddleware);

module.exports = app;
