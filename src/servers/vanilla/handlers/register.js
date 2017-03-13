const db = require('../../../db')
const authHelper = require('../../../helpers/auth')
const notFoundHandler = require('../handlers/notFound')

const logPrefix = '[Register handler] '

// the register handler handles requesting and submitting the register form
module.exports = (request, response) => {
  console.log(logPrefix + 'Handling...')

  if (request.method === 'GET') {
    return response.view('register')
  }

  if (request.method === 'POST') {
    console.log(logPrefix + 'Finding user')
    return db.findUserByName(request.body.name, (foundUser) => {
      if (!foundUser) {
        console.log(logPrefix + 'User does not exist, inserting...')
        const user = {
          name: request.body.name,
          passwordHash: authHelper.hashString(request.body.password)
        }
        db.insertUser(user, () => {
          response.redirect('/login')
        })
      } else {
        console.log(logPrefix + ' User already exists')
        response.redirect('/login')
      }
    })
  }

  // Other request types (PUT, DELETE) should get a 404 Not Found
  notFoundHandler(request, response)
}
