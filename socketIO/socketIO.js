const socketio = require('socket.io');
function socketIO(server) {
    const sio = socketio(server);
    sio.on('connection', function(socket) {
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            sio.emit('chat message', msg);
        });
        socket.on('ponpon-se_audio_play', (audio_num) => {
            sio.emit('ponpon-se_audio_play', audio_num);
        });
        socket.on("disconnect", function() {
            console.log('user disconnected');
        });
    });
};
module.exports = socketIO;