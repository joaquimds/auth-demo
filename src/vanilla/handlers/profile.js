const forbiddenHandler = require('../handlers/forbidden')

const logPrefix = '[Register handler] '

module.exports = (request, response) => {
  console.log(logPrefix + 'Handling...')

  if (request.user) {
    response.view('profile', { name: request.user.name })
  } else {
    forbiddenHandler(request, response)
  }
}
