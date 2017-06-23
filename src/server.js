'use strict'

const express = require('express')
const morgan = require('morgan')

const logErrors = (err, req, res, next) => {
  console.log(err.stack)
  next(err)
}

const clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

const errorHandler = (err, req, res, next) => {
  res.status(500).send('Something failed!')
}

module.exports.start = (options) => {
  return new Promise((resolve, reject) => {
    //  Make sure we have a repository and port provided.
    if (!options.users) throw new Error('A server must be started with a connected repository.')
    if (!options.port) throw new Error('A server must be started with a port.')

    //  Create the app, add some logging.
    let app = express()
    app.use(morgan('dev'))

    //  Add the APIs to the app.
    require('./api/users')(app, options)

    app.use(logErrors) // print errors to the console
    app.use(clientErrorHandler) // catch xhr request
    // catch-all
    app.use(errorHandler)

    //  Start the app, creating a running server which we return.
    let server = app.listen(options.port, () => {
      resolve(server)
    })
  })
}
