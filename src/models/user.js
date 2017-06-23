'use strict'

class User {
  constructor ({email, phone}) {
    this.email = email
    this.phone = phone
  }

  toString () {
    return `User: ${this.email}`
  }

  toJSON () {
    return {
      email: this.email,
      phone: this.phone
    }
  }
}

module.exports.createUser = (data) => {
  if (!data.email) throw new Error('Email is required')
  if (!data.phone) throw new Error('Phone is require')

  return new User(data)
}
