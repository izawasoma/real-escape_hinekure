var socket = io();

$(function(){
    let audio = document.getElementsByClassName("ponpon_audio");
    let i = 0;
    let sound_duration;
    for(let audioElement of audio){
        audioElement.addEventListener('loadedmetadata', function() {
            sound_duration= sec_to_time(audioElement.duration);
            $(".sound_duration").eq(i).html(sound_duration);
            console.log(i);
            i++;
        });
    }
    
    $(".p_pad-area__btn").click(function(){
        let index = $(".p_pad-area__btn").index(this);
        socket.emit('ponpon-se_audio_play', index);
    });
    
    socket.on("ponpon-se_audio_play",function(audio_num){
        audioAllStop(audio);
        audio[audio_num].play();
        //ボタンの色を変更
        $(".p_pad-area__btn--active").eq(0).removeClass("p_pad-area__btn--active").addClass("p_pad-area__btn--nomal");
        $(".p_pad-area__icon--active").eq(0).removeClass("p_pad-area__icon--active").addClass("p_pad-area__icon--nomal");
        $(".p_pad-area__title--active").eq(0).removeClass("p_pad-area__title--active").addClass("p_pad-area__title--nomal");
        $(".p_pad-area__play--active").eq(0).removeClass("p_pad-area__play--active").addClass("p_pad-area__play--nomal");
        $(".p_pad-area__time--active").eq(0).removeClass("p_pad-area__time--active").addClass("p_pad-area__time--nomal");
        $(".p_pad-area__btn").eq(audio_num).removeClass("p_pad-area__btn--nomal").addClass("p_pad-area__btn--active");
        $(".p_pad-area__icon").eq(audio_num).removeClass("p_pad-area__icon--nomal").addClass("p_pad-area__icon--active");
        $(".p_pad-area__title").eq(audio_num).removeClass("p_pad-area__title--nomal").addClass("p_pad-area__title--active");
        $(".p_pad-area__play").eq(audio_num).removeClass("p_pad-area__play--nomal").addClass("p_pad-area__play--active");
        $(".p_pad-area__time").eq(audio_num).removeClass("p_pad-area__time--nomal").addClass("p_pad-area__time--active");
    })
    
    function audioAllStop(audios){
        for(let audio of audios){
            audio.pause();
            audio.currentTime = 0;
        }
    }
    
    $("#enter").click(function(){
        $("#enter_modal").fadeOut(500);
    });
});

function sec_to_time(sec){
    min = Math.floor(sec / 60);
    sec = Math.round(sec - min * 60);
    return min + ":" + sec;
}

function duration_write(time,target_class,index){

}

