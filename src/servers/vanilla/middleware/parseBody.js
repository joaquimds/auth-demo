const logPrefix = '[ParseBody middleware] '
// read the request body into a string, then parse it into an object
//
// This is done using node's Stream API. This is how the request makes the data available; there is no 'request.data'
// or 'request.body' when using node's vanilla web server.
//
// Streams are an "advanced concept" in nodejs. They are definitely something you should understand if you decide
// to specialize in node. I don't have a tutorial I particularly recommend; the API documentation is OK.
module.exports = (request, response, next) => {
  let rawPostData = ''
  request.on('data', data => {
    rawPostData += data.toString()
  })
  request.on('end', () => {
    const parsedPostData = {}
    console.log(logPrefix + 'Request body is', rawPostData || 'blank')
    if (rawPostData) {
      rawPostData.split('&').forEach(keyValue => {
        let parts = keyValue.split('=')
        let key = parts[ 0 ]
        parsedPostData[ key ] = parts[ 1 ]
      })
    }
    console.log(logPrefix + 'Setting request.body to', parsedPostData)
    request.body = parsedPostData
    next()
  })
}
