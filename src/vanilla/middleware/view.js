const fs = require('fs')
const path = require('path')

// read the views into strings and save in an object
// i.e. views = { index: '<html>...</html>', login: '...' }
const viewDir = path.join(__dirname, '..', '..', 'views')
const viewFiles = fs.readdirSync(viewDir)
const views = {}
viewFiles.forEach(file => {
  const name = file.split('.')[0]
  views[name] = fs.readFileSync(path.join(viewDir, file), 'utf8')
})

const logPrefix = '[View middleware] '

// adds the `response.view()` function
module.exports = (request, response, next) => {
  console.log(logPrefix + 'Adding the response.view() function')

  response.view = (name, params) => {
    console.log(logPrefix + 'Rendering ' + name + (params ? ' with params' : ''), params || '')
    let view = views[name]
    if (params) {
      Object.keys(params).forEach(key => {
        view = view.replace(new RegExp('{{' + key + '}}', 'g'), params[key])
      })
    }
    response.end(view)
  }
  next()
}
