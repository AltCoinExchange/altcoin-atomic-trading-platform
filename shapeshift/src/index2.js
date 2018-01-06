var fs = require('fs');
const hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');

var http2 = require('http2');
var options = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.crt'),
};


const server = new hapi.Server({
  listener: http2.createSecureServer(options),
  host: 'localhost',
  port: 3333,
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
