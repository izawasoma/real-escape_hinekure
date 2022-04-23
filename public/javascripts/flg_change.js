var socket = io();

$(function(){
    $("#stage1").click(function(){
        socket.emit("stage1");
        window.location.href = "./flg_change?stage=1";
    });
    $("#stage2").click(function(){
        console.log("clicked");
        socket.emit("stage2");
        window.location.href = "./flg_change?stage=2";
    });
})