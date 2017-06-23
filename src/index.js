'use strict'

const server = require('./server')
const config = require('./config')
const models = require('./models')

//  Lots of verbose logging when we're starting up...
console.log('--- User Service---')
console.log('Connecting to use repository...')

//  Log unhandled exceptions.
process.on('uncaughtException', function (err) {
  console.error('Unhandled Exception', err)
})
process.on('unhandledRejection', function (err, promise) {
  console.error('Unhandled Rejection', err)
})

models.connect({
  database: config.db.name,
  host: config.db.host,
  password: config.db.pass,
  port: config.db.port,
  user: config.db.user
}).then((users) => {
  console.log('Connected to user repository, starting server')
  return server.start({
    port: config.server.port,
    users: users
  })
}).then((app) => {
  console.log(`Server started, running on port ${config.server.port}`)
  app.on('close', () => {
    models.disconnect()
  })
})
