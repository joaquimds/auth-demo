const db = require('../../db')

// Get the token from the cookies
// Lookup a user by this token
// Set this on the request
// Call next() to tell express that the middleware is done
module.exports = (req, res, next) => {
  const token = req.cookies.token
  return db.findUserByToken(token, (foundUser) => {
    req.user = foundUser
    next()
  })
}
