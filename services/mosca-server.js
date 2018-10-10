var mosca = require('mosca');

// TODO: Insert your own key
var SECURE_KEY = './privkey.pem';
var SECURE_CERT = './fullchain.pem';

var settings = {
  port: 1883,
  logger: {
    name: "secureExample",
    level: 40,
  },
  secure : {
    port: 8443,
    keyPath: SECURE_KEY,
    certPath: SECURE_CERT,
  }
};
var server = new mosca.Server(settings);
server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}
