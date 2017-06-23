'use strict'

module.exports = (app, options) => {
  app.get('/users', (req, res, next) => {
    options.users.all().then((users) => {
      res.status(200).send(users.map((user) => {
        return user.toJSON()
      }))
    }).catch(next)
  })

  app.get('/search', (req, res, next) => {
    const { email } = req.query

    if (!email) {
      throw new Error('Email must be provided while searching a new user')
    }
    options.users.getByEmail(email).then((user) => {
      if (!user) {
        res.status(404).send({message: 'Not Found'})
      } else {
        res.status(200).send(user.toJSON())
      }
    }).catch(next)
  })
}
