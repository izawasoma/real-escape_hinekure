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
        socket.on('ponpon-se_audio_stop', () => {
            sio.emit('ponpon-se_audio_stop');
        });
        socket.on("disconnect", function() {
            console.log('user disconnected');
        });
        ////////////////admin///////////////////
        //管理の接続を確認
        let admin_id = "";
        socket.on('admin_connect', ()=>{
            admin_id = socket.id;
            console.log(admin_id);
            sio.to(admin_id).emit('admin_connect');
        });
        //受験者の接続を確認
        socket.on('examinee_connect', () => {
            console.log(admin_id);
            sio.emit('examinee_connect',socket.id);
            //sio.to(admin_id).emit('examinee_connect',socket.id);
        });
        //試験開始
        socket.on("exam_start",()=>{
            sio.emit('exam_start');
        })
        ////////////////試験開始フラグ///////////////////
        socket.on("stage1",function(){
            sio.emit("stage1");
        });
        socket.on("stage2",function(){
            sio.emit("stage2");
        });
    });
};
module.exports = socketIO;