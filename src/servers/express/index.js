const path = require('path')
const http = require('http')
const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const authMiddleware = require('./middleware/auth')
const routes = require('./routes')

const app = express()
app.engine('html', mustacheExpress()) // set up the 'html' engine
app.set('view engine', 'html') // use the 'html' engine when rendering views
app.set('views', path.resolve(__dirname, '..', '..', 'views'))

// request body parsing middleware (e.g. for forms)
app.use(bodyParser.urlencoded({ extended: false }))

// cookie parsing middleware
app.use(cookieParser('secret'))

// authentication middleware
// gets the user's data from the database if there have a matching token in their cookies
app.use(authMiddleware)

// tell express to use the routes defined in 'routes.js'
app.use(routes)

const server = http.createServer(app)
server.listen(3000, () => {
  console.log('App listening on port 3000!')
})
