const router = require('express').Router()

const db = require('../../db')
const authHelper = require('../../helpers/auth')

// index route
router.get('/', (req, res) => {
  res.render('index.html')
})

// register form
router.get('/register', (req, res) => {
  res.render('register.html')
})

// register form submit
router.post('/register', (req, res) => {
  db.findUserByName(req.body.name, (foundUser) => {
    if (!foundUser) {
      const user = {
        name: req.body.name,
        passwordHash: authHelper.hashString(req.body.password)
      }
      db.insertUser(user, () => {
        res.redirect('/login')
      })
    } else {
      res.redirect('/login')
    }
  })
})

// login form
router.get('/login', (req, res) => {
  res.render('login.html')
})

// login form submit
router.post('/login', (req, res) => {
  db.findUserByName(req.body.name, (foundUser) => {
    if (foundUser) {
      const validPassword = authHelper.checkString(req.body.password, foundUser.passwordHash)
      if (validPassword) {
        const token = authHelper.generateToken()
        return db.setUserToken(foundUser, token, () => {
          res.cookie('token', token)
          res.redirect('/profile')
        })
      }
    }
    // failed login
    res.render('login.html')
  })
})

// profile page
router.get('/profile', (req, res) => {
  if (req.user) {
    res.render('profile.html', req.user)
  } else {
    res.redirect('/login')
  }
})

router.get('/logout', (req, res) => {
  if (req.user) {
    return db.setUserToken(req.user, null, () => {
      res.cookie('token', '', { maxAge: 0 }) // Max-Age=0 means the cookie will be deleted immediately
      res.redirect('/')
    })
  }
  res.redirect('/')
})

module.exports = router
