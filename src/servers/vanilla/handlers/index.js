// / / the index handler simply sends the index.html page
module.exports = (request, response) => {
  console.log('[Index handler]: Handling...')
  response.view('index')
}
