'use strict'

const config = module.exports = {}

config.server = {
  port: process.env.SERVER_PORT || 3000
}

config.db = {
  name: 'users',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: 3306,
  pass: '123',
  user: 'users_service'
}
