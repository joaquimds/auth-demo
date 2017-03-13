// return a 404 not found response
module.exports = (request, response) => {
  console.log('[Not Found handler] Returning a 404 response')
  response.writeHead(404)
  response.end()
}
