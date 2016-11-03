# ipcamera-to-browser

** Barebones **

Streams an mjpg ip camera audio and video to a browser window.  Uses an img element and audio tag.

Streams base64 jpgs and resamples the wav to mp3.

Tested with an assortment of dlink cameras.

# install and use

This project uses node v4 and environment variables to set the host and password of the ip.

```

nvm use 4
npm install
export STREAM_IP=192.168.0.100
export STREAM_PASS=toomanysecrets
node express_server.js
```

Open the browser to http://localhost:60000 and there should be the stream, click play to get the audio.
