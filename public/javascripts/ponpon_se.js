var socket = io();

let work = $(".ponpon_audio");
let audio = [];
let i = 0;
for(let value of work){
    audio[i] = value;
    i++;
}

$(".p_pad-area__btn").click(function(){
    let index = $(".p_pad-area__btn").index(this);
    socket.emit('ponpon-se_audio_play', index);
});

socket.on("ponpon-se_audio_play",function(audio_num){
    audioAllStop(audio);
    audio[audio_num].play();
})

function audioAllStop(audios){
    for(let audio of audios){
        audio.pause();
        audio.currentTime = 0;
    }
}