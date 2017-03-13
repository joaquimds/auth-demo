// fake database
module.exports = {
  users: [],
  insertUser: function (user, callback) {
    this.users.push(user)
    callback()
  },
  setUserToken: function (user, token, callback) {
    user.token = token
    callback()
  },
  findUserByName: function (name, callback) {
    const user = this.users.find(u => u.name === name)
    callback(user)
  },
  findUserByToken: function (token, callback) {
    // force token to be truthy to avoid something like `undefined === undefined`
    const user = token && this.users.find(u => u.token === token)
    callback(user)
  }
}
