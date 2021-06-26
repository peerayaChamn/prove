const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use('/p10', require('./pr10-server'))
  .get('/', (req, res) => res.render('pages/pr10'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
