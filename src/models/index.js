'use strict'

const mysql = require('mysql')
const Users = require('./users')

module.exports.connect = (settings) => {
  if (!settings.host) throw new Error('A host must be specified.')
  if (!settings.user) throw new Error('A user must be specified.')
  if (!settings.password) throw new Error('A password must be specified.')
  if (!settings.port) throw new Error('A port must be specified.')

  return new Promise((resolve, reject) => {
    try {
      const connection = mysql.createConnection(settings)
      connection.connect()
      resolve(new Users(connection))
    } catch (err) {
      throw new Error('Error connecting database')
    }
  })
}
