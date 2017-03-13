const crypto = require('crypto')

/**
 * NOTE: MD5 IS NOT A SUFFICIENTLY SECURE PASSWORD HASHING ALGORITHM
 *
 * YOU SHOULD USE BCRYPT!
 *
 */

// Stolen from StackOverflow "How to hash a string in node"
module.exports.hashString = (string) => {
  return crypto.createHash('md5').update(string).digest('hex')
}

// Check that hashString(string) returns the provided hash
module.exports.checkString = (string, hash) => {
  return module.exports.hashString(string) === hash
}

// Stolen from StackOverflow "How to generate a random token in node"
module.exports.generateToken = () => {
  return crypto.randomBytes(16).toString('hex')
}
