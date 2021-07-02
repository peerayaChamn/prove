const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const http = require('http');
const socketio = require("socket.io")

const app = express();
const server = http.createServer(app);
const io = socketio(server)

io.on('connection', socket => {
  console.log('Client connected')

  socket.on('new-name', () => {
      socket.broadcast.emit('update-list')
  })
})

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/p10', require('./pr10-server'))
app.get('/', (req, res) => res.render('pages/pr10'))
server.listen(PORT, () => console.log(`Listening on ${ PORT }`))

