
/**
 * Socket.io configuration
 */
'use strict';
//import config from './environment';
export class Socketio {
  socketio: any;
  constructor(socketio) {
    this.socketio = socketio;
    socketio.on('connection', function (socket) {
      socket.address = socket.request.connection.remoteAddress + ':' + socket.request.connection.remotePort;

      socket.connectedAt = new Date();

      socket.log = function (...data) {
        console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
      };

      // Call onDisconnect.
      socket.on('disconnect', () => {
        this.onDisconnect(socket);
        socket.log('DISCONNECTED');
      });

      // Call onConnect.
      this.onConnect(socket);
      socket.log('CONNECTED');

      const s = require('../model/device/socket');
      new s.register(socket);
    });
  }
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  // When the user connects.. perform this
  onConnect(socket) {
    // When the client emits 'info', this listens and executes
    socket.on('info', data => {
      socket.log(JSON.stringify(data, null, 2));
    });

    // Insert sockets below
    //require('../model/device/socket').register(socket);
    // require('../api/decisions/decisions.socket').register(socket);
    // require('../api/measurements/measurements.socket').register(socket);
    // require('../api/notifications/notifications.socket').register(socket);
    // require('../api/signals/signals.socket').register(socket);
    // require('../api/devices/devices.socket').register(socket);
    // require('../api/rooms/rooms.socket').register(socket);
    // require('../api/thing/thing.socket').register(socket);
    //new DeviceSocket().register(socket);
  }

  // When the user disconnects.. perform this
  onDisconnect(socket) {
  }
}