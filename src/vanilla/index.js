const http = require('http')
const url = require('url')

const indexHandler = require('./handlers/index')
const registerHandler = require('./handlers/register')
const loginHandler = require('./handlers/login')
const profileHandler = require('./handlers/profile')
const logoutHandler = require('./handlers/logout')
const notFoundHandler = require('./handlers/notFound')

const authMiddleware = require('./middleware/auth')
const parseBodyMiddleware = require('./middleware/parseBody')
const redirectMiddleware = require('./middleware/redirect')
const viewMiddleware = require('./middleware/view')

const logPrefix = '* [Server] '
/**
 * This is the inbuilt way of creating an http server in node js.
 *
 * All the node server frameworks are built on top of this.
 */
const server = http.createServer((request, response) => {
  let handler

  const path = url.parse(request.url).pathname

  console.log(logPrefix + 'Received request: ' + request.method + ' ' + path)

  // choose handler based on the URL. This is a function that takes (request, response) as parameters, reads from
  // the request, and writes to the response.
  switch (path) {
    case '/':
      handler = indexHandler
      break
    case '/register':
      handler = registerHandler
      break
    case '/login':
      handler = loginHandler
      break
    case '/profile':
      handler = profileHandler
      break
    case '/logout':
      handler = logoutHandler
      break
    default:
      // other routes should get a 404
      handler = notFoundHandler
  }

  // the functions in this array are called in order before the handler is called.
  // they take the parameters `(request, response, next)`. `next` is a callback function that is called when the
  // middleware is done decorating the `request` and `response`.
  const middleware = [ authMiddleware, parseBodyMiddleware, redirectMiddleware, viewMiddleware ]

  applyMiddlewareAndCallHandler(request, response, middleware, handler)
})

/**
 *
 * Apply all middleware then call the handler. This is done using recursion.
 *
 * Base case: there is no middleware, so just call `handler(request, response)`
 *
 * Otherwise: call the first middleware with (request, response). When it is complete, call
 * the handleRequest function again with the remaining middleware. This reduces the number of middleware still
 * to call by 1, so eventually the handler will be called.
 *
 * @param request
 * @param response
 * @param middleware
 * @param handler
 * @returns {*}
 */
const applyMiddlewareAndCallHandler = (request, response, middleware, handler) => {
  // if there is no middleware then just call the handler
  if (!middleware.length) {
    return handler(request, response)
  }

  // otherwise get the first middleware
  const firstMiddleware = middleware[ 0 ]
  const remainingMiddleware = middleware.slice(1)

  // this function will be called when the middleware is complete
  const middlewareCallback = () => {
    applyMiddlewareAndCallHandler(request, response, remainingMiddleware, handler)
  }

  // call the middleware with the request and response
  // when it's done, call handleRequest with the remaining middleware
  firstMiddleware(request, response, middlewareCallback)
}

server.listen(3000, () => console.log(logPrefix + 'Listening on port 3000'))
