let socket = io();

$(function(){
    //管理者として接続する
    socket.emit('admin_connect');
    socket.on('admin_connect', () => {
        console.log('ID: ' + socket.id);
    });
    //受験者の接続を確認
    socket.on('examinee_connect', (id) => {
        console.log(id);
        $('.ul').append(`<li class="eva orange">${id}</li>`)
    });
    //開始ボタン
    $('.p_admin__start_button').on("click",()=>{
        socket.emit("exam_start");
    })
});
