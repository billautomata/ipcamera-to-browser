var express = require('express')
var stream_piper = require('./stream_piper.js')

var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

var lame = require('lame')

// create the Encoder instance
 var encoder = new lame.Encoder({
   // input
   channels: 1,        // 2 channels (left and right)
   bitDepth: 16,       // 16-bit samples
   sampleRate: 11025,  // 44,100 Hz sample rate

   // output
   bitRate: 128,
   outSampleRate: 44100,
   mode: (lame.MONO)
});

var port = 60000
module.exports = server.listen(port, '0.0.0.0', function () {

  app.get('/stream.mp3', function (req, res) {
    console.log('yup')
    res.set({
      'Content-Type': 'audio/mpeg3',
      'Transfer-Encoding': 'chunked'
    });
    encoder.pipe(res);
  });

  app.use('/', express.static('docs'))
  console.log(['listening', port].join(' '))
})

var all_sockets = []

stream_piper('video', function(d){
  all_sockets.forEach(function(socket, socket_idx){
    // console.log(socket_idx)
    socket.emit('jpg', d.toString('base64'))
  })
})

stream_piper('audio', encoder)

io.on('connection', function (socket) {
  console.log('connection')
  all_sockets.push(socket)

  socket.on('disconnect', function(){
    all_sockets = all_sockets.filter(function(o){ return o !== socket })
  })
})
