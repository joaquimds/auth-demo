const db = require('../../db')

const logPrefix = '[Logout handler] '
// the logoutHandler clears the cookie and the token in the database
module.exports = (request, response) => {
  console.log(logPrefix + 'Handling...')
  if (request.user) {
    return db.setUserToken(request.user, null, () => {
      console.log(logPrefix + 'Deleting token cookie')
      response.setHeader('Set-Cookie', [ 'token=; Max-Age=0' ]) // Max-Age=0 means the cookie will be deleted immediately
      response.redirect('/')
    })
  }
  response.redirect('/')
}
