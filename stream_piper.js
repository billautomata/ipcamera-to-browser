var request = require("request");
var MjpegConsumer = require('./mjpeg-consumer.js');
var Transform = require('stream').Transform

var consumer = new MjpegConsumer();

var host = process.env['STREAM_IP']

module.exports = function piper(type, callback){

  var username = "admin";
  var password = process.env['STREAM_PASS']
  var options = {
      url: "http://"+host+"/video/mjpg.cgi",
      headers: {
       'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
     }
  };

  if(type === 'audio'){
    options.url = 'http://'+host+'/audio.cgi'
  }

  const m = new Transform({
  	transform(chunk, encoding, cb){
      callback(chunk)
  		cb()
  	}
  })

  if(type === 'video'){
    request(options).pipe(consumer).pipe(m);
  } else {
    request(options).pipe(callback)
  }
}
