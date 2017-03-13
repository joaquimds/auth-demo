const db = require('../../db')

const logPrefix = '[Auth middleware] '
// get the token from the cookie, find the user with this token, and set this on the request
// call next() when done
module.exports = (request, response, next) => {
  const cookieHeader = request.headers.cookie
  if (cookieHeader) {
    console.log(logPrefix + 'Read cookies:', cookieHeader)
    const cookies = cookieHeader.split(';').map(cookie => cookie.trim())
    const cookie = cookies.find(cookie => cookie.substring(0, 5) === 'token')
    if (cookie && cookie.split('=').length === 2) {
      const token = cookie.split('=')[ 1 ]
      console.log(logPrefix + 'Found token: ' + token)
      return db.findUserByToken(token, (foundUser) => {
        console.log(logPrefix + (foundUser ? 'Token valid, setting request.user to' : 'Token invalid'), foundUser || '')
        request.user = foundUser
        next()
      })
    }
  } else {
    console.log(logPrefix + 'No cookies')
  }
  next()
}
