var mosca = require('mosca');

// TODO: Insert your own key
var SECURE_KEY = './privkey.pem';
var SECURE_CERT = './fullchain.pem';

var backend = {
  type: 'redis',
  redis: require('redis'),
  db: 12,
  port: 6379,
  return_buffers: true, // to handle binary payloads
  host: "localhost"
};

var settings = {
  port: 3001,
  backend: backend
  // persistence: {
  //   factory: mosca.persistence.Redis
  // }
};


// var settings = {
//   port: 3001,
//   logger: {
//     name: "secureExample",
//     level: 40,
//   }/*,
//   secure : {
//     port: 8443,
//     keyPath: SECURE_KEY,
//     certPath: SECURE_CERT,
//   }*/
// };

var server = new mosca.Server(settings);
server.on('ready', setup);

server.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});

server.on('published', function(packet, client) {
  console.log('Published', packet.topic, packet.payload);
});

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}
