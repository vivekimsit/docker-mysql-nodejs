'use strict'

const { createUser } = require('./user')

class Users {
  constructor (connection) {
    this.connection = connection
  }

  all () {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT email, phone FROM directory', (err, results) => {
        if (err) {
          return reject(err)
        }
        resolve((results || []).map((result) => createUser(result)))
      })
    })
  }

  getByEmail (email) {
    return new Promise((resolve, reject) => {
      this.connection.query(
          'SELECT email, phone FROM directory WHERE email=?', [email], (err, results) => {
            if (err) {
              return reject(err)
            }
            return results.length === 0
          ? resolve(undefined)
          : resolve(createUser(results[0]))
          })
    })
  }

  disconnect () {
    this.connection.end()
  }
}

module.exports = Users
