var fs = require('fs');
const hapi = require('hapi');
const Inert = require('inert');

var http2 = require('http2');
var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/stagingswap.altcoin.io/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/stagingswap.altcoin.io/fullchain.pem'),
};
// var options = {
//   key: fs.readFileSync(__dirname + '/privkey.pem'),
//   cert: fs.readFileSync(__dirname + '/fullchain.pem'),
// };


var server = new hapi.Server({
  listener: http2.createSecureServer(options),
  host: '0.0.0.0',
  port: 5000,
  tls: true
});

const provision = async () => {

  await server.register(Inert);

  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        lookupCompressed: true,
        index: true,
      }
    }
  });

  server.ext('onPreResponse', (request, reply) => {
    const response = request.response;

    if (!response.isBoom) {
      return reply.file(request.response.source.path);
    }

    // else an error has occurred
    const error = response;

    // if the error is 'Object not found', call index.html
    if (error.output.statusCode === 404) {
      return reply.file('index.html');
    }
  });

  await server.start();

  console.log('Server running at:', server.info.uri);
};

provision();
