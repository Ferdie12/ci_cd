require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('./routes');
const cors = require('cors');
const Sentry = require('@sentry/node');

const {
    SENTRY_DSN,
    ENVIRONMENT
} = process.env;

Sentry.init({
    environment: ENVIRONMENT,
    dsn: SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],
    tracesSampleRate: 1.0,
  });

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

const {
    HTTP_PORT = 3000
} = process.env;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(router);

app.get('/', (req,res) => {
    return res.status(200).json({
        status: true,
        message: "Test CI/CD in Develop"
    })
})

app.get('/error', (req,res) => {
    

    return res.status(200).json({
        status: true,
        message: data
    })
})

app.use(Sentry.Handlers.errorHandler());
// 500
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({
        status: false,
        message: err.message,
        data: null
    });
});

app.listen(HTTP_PORT, () => console.log("server is running"));

module.exports = app;