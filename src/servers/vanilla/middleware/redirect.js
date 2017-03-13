const logPrefix = '[Redirect middleware] '
// adds the response.redirect() function
module.exports = (request, response, next) => {
  console.log(logPrefix + 'Adding the response.redirect() function')

  /**
   * Return a handler that returns 302 response (a redirect) to the specified location.
   * Note that 'writeHead' does not refer to the <head> element of the returned HTML.
   * It refers to the headers in the HTTP response. If you don't know much about HTTP headers and status codes,
   * it's worth reading about the HTTP protocol.
   *
   * See:
   * https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Message_format
   * for a brief look at HTTP requests and responses.
   *
   * @param location
   */
  response.redirect = (location) => {
    console.log(logPrefix + 'Redirecting to', location)
    response.writeHead(302, { Location: location })
    response.end()
  }
  next()
}
