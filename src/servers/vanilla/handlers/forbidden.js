// Return a 403 forbidden response
module.exports = (request, response) => {
  console.log('[Forbidden handler] Returning a 403 response')
  response.writeHead(403)
  response.end()
}
