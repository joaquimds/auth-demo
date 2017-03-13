const db = require('../../../db')
const authHelper = require('../../../helpers/auth')
const notFoundHandler = require('../handlers/notFound')

const logPrefix = '[Login handler] '

// the login handler handles requesting and submitting the login form
module.exports = (request, response) => {
  console.log(logPrefix + 'Handling...')

  // GET request means the user wants the login form
  if (request.method === 'GET') {
    return response.view('login')
  }

  // POST request means the user has submitted the login form
  if (request.method === 'POST') {
    console.log(logPrefix + 'Finding user by name', request.body.name)
    return db.findUserByName(request.body.name, (foundUser) => {
      if (foundUser) {
        console.log(logPrefix + 'Found user:', foundUser)
        const validPassword = authHelper.checkString(request.body.password, foundUser.passwordHash)
        if (validPassword) {
          console.log(logPrefix + 'Password is valid, generating token and saving in database')
          const token = authHelper.generateToken()
          return db.setUserToken(foundUser, token, () => {
            console.log(logPrefix + 'Setting header:', 'Set-Cookie: token=' + token)
            response.setHeader('Set-Cookie', [ 'token=' + token ])
            response.redirect('/profile')
          })
        } else {
          console.log(logPrefix + 'Password invalid')
        }
      } else {
        console.log(logPrefix + 'User not found')
      }

      // failed login
      response.view('login')
    })
  }

  notFoundHandler(request, response)
}
