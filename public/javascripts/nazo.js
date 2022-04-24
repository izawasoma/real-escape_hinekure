/////////////謎の答えなどの定数定義、および初期値を変数に格納////////////////
function rand(max){
    return  Math.ceil(Math.random() * max)
}
let student_id = rand(9) * 10000 + rand(999);
const ans_list = {
    q1: {
        answer: "518",
        question: "数字(半角)で答えなさい",
        info: "課題No.は『01』",
    },
    q2: {
        answer: "へるしー",
        question: "ひらがな4文字で答えなさい",
        info: `課題主題は<br>
        『注意力測定(追試)』`,
    },
    q3: {
        question: "クラス記号を求めよ",
        info: "クラス記号を書け",
    },
    q4: {
        question: "点滅した順に押せ",
        info: `科目記号は『NZ85』<br><br>
        カウンターにこの画面を見せると、第5問を解くのに必要な紙が貰えます`,
    },
    q5: {
        answer: "かんしん",
        question: "ひらがな4文字で答えなさい",
        info: `科目担当は『四ツ井 光』<br><br>
        カウンターにこの画面を見せると、第6問を解くのに必要な紙が貰えます`,
    },
    q6: {
        answer: "仲間",
        question: "ひらがな3文字で答えなさい",
        info: "担任は『三須 大井』",
    },
    q7: {
        answer: "てんさい",
        question: "ひらがなで答えなさい",
        info: `学籍番号は『${student_id}』`,
    }
}
const q4ans = [4,0,20,12,24,6,8,16];
//ゲームの状況を保存する
let state = {
    //どこまで正解したか
    progress : 0
}
//進展に応じた初期値を設定
for(let i = 0; i <= state.progress; i++){
    $('.p_nav__item').eq(i).removeClass("--disabled");
}
if(state.progress == 7){
    nav(state.progress);
}else{
    nav(state.progress + 1);
}

/////////////////////イベント設定///////////////////
//解答する
$('#answer_button').on("click",()=>{
    const q_num = $('.p_nav__item.--active').text();
    check_ans(q_num);
})
//ナビおよび問題の切り替え
$('.p_nav__item').on("click",(e)=>{
    const q_num = e.target.textContent;
    console.log(q_num);
    nav(q_num);
})

/////////////////////////関数////////////////////////////
//正誤判定
function check_ans(q_num){
    //特殊問題
    if(q_num == 3){
        if($('.p_content__input').eq(0).val() == "UL" && $('.p_content__input').eq(1).val() == "00L" && $('.p_content__input').eq(2).val() == "495"){
            correct(q_num);
        }else{
            incorrect();
        }
    }else{
        const input_ans = $('.p_content__input').val();
        if(ans_list["q" + q_num].answer == input_ans){
            correct_modal();
            correct(q_num);
        }else{
            incorrect();
        }
    }
}
//正解時の処理
function correct(q_num){
    console.log(q_num);
    correct_modal();
    $('.p_content__info').removeClass("--disabled");
    $('.p_modal--info').addClass("shown");
    $('.p_content__incorrect').addClass('hidden');
    state.progress = q_num;
    if(q_num != 1 || stage2 == "ok"){
        $('.p_nav__item').eq(q_num).removeClass("--disabled");
    }
    $('.p_modal--info__content').html(ans_list["q" + q_num].info);
}
function incorrect(){
    $('.p_content__incorrect').removeClass('hidden');
}
//ナビの切り替え
function nav(q_num){
    $('.q3').remove();
    $('.q4').remove();
    $('.q7').remove();
    $('.p_content__form').removeClass('hidden');
    $('.p_content__nazo_image').removeClass('hidden');
    if(q_num == 3){
        $('.p_content__nazo_image').attr("src",`img/question/3-1.png`);
        $('.p_content__nazo_container').append(`<img class="p_content__nazo_image q3" src="img/question/3-2.png">`);
        $('.p_content__nazo_container').append(`<img class="p_content__nazo_image q3" src="img/question/3-3.png">`);
        //input
        $('.p_content__input').after(`<input class="c_input--text p_content__input q3" type="text" name="">`)
        $('.p_content__input').eq(0).after(`<input class="c_input--text p_content__input q3" type="text" name="">`)
    }else if(q_num == 4){
        $('.p_content__form').addClass('hidden');
        $('.p_content__nazo_image').addClass('hidden');
        q4();
    }else if(q_num == 7){
        $('.p_content__nazo_image').attr("src",`img/question/7-1.png`);
        $('.p_content__nazo_container').append(`<div class="p_modal--star__open q7"><span class="material-icons">collections</span>星を見る</div>`);
        q7modal();
    }else{
        $('.p_content__nazo_image').attr("src",`img/question/${q_num}.png`);
    }
    $('.p_content__question_text').text(ans_list["q" + q_num].question);
    $('.p_modal--info__content').html(ans_list["q" + q_num].info);
    $('.p_nav__item.--active').removeClass("--active");
    $('.p_nav__item').eq(q_num - 1).addClass("--active");
    $('.p_content__incorrect').addClass('hidden');

    if(state.progress >= q_num){
        if(q_num == 3){
            $('.p_content__input').eq(0).val("UL");
            $('.p_content__input').eq(1).val("OOL");
            $('.p_content__input').eq(2).val("495");
        }else if(q_num == 4){
            $('.p_content__q4box').addClass("correct");
            $('.p_content__col').eq(4).addClass("selected");
            $('.p_content__col').eq(0).addClass("selected");
            $('.p_content__col').eq(20).addClass("selected");
            $('.p_content__col').eq(12).addClass("selected");
            $('.p_content__col').eq(24).addClass("selected");
            $('.p_content__col').eq(6).addClass("selected");
            $('.p_content__col').eq(8).addClass("selected");
            $('.p_content__col').eq(16).addClass("selected");
        }
        else{
            $('.p_content__input').val(ans_list["q" + q_num].answer);
        }
        $('.p_content__info').removeClass("--disabled")
    }else{
        $('.p_content__input').val("");
        $('.p_content__info').addClass("--disabled")
    }
}
//q4盤面生成
function q4(){
    //マス目生成
    $('.p_content__nazo_container').append(`<div class="p_content__q4box q4"></div>`)
    for(let i = 0; i < 5; i ++){
        $('.p_content__q4box').append(`<div class="p_content__row q4"></div>`)
        for(let j = 0; j < 5; j ++){
            $('.p_content__row').eq(i).append(`<div class="p_content__col q4"></div>`)
        }
    }
    $('.p_content__col').height($('.p_content__col').width());
    let que = [];
    //マス目にクリックイベントをあてる
    //クリックごとに配列に追加し８クリックごとに比較
    $('.p_content__col').on("click",(e)=>{
        //console.log($('.p_content__col').index(e.currentTarget));
        $(e.currentTarget).addClass("selected");
        //正誤判定
        que.push($('.p_content__col').index(e.currentTarget))
        if(que.length < 8){
            console.log(que);
        }else{
            if(JSON.stringify(que) == JSON.stringify(q4ans)) {
                correct(4);
                $('.p_content__q4box').addClass("correct");
            }else{
                $('.p_content__q4box').on('animationend',()=>{
                    que = [];
                    $('.p_content__col').removeClass('selected');
                    $('.p_content__q4box').removeClass("incorrect");
                })
                $('.p_content__q4box').addClass("incorrect");
            }
        }
    })

}
/////////////モーダル//////////////////
//q7 modal
function q7modal(){
    $('.p_modal--star__open').click(()=>{
        $('.p_modal--star').addClass("shown");
    });
    $('.p_modal--star').click((e)=>{
        $('.p_modal--star').addClass("close");
        $('.p_modal--star').one('animationend',()=>{
            $('.p_modal--star').removeClass("shown");
            $('.p_modal--star').removeClass("close");
        })
    });
    $(".p_modal--info__image").click((e)=>{
        e.stopPropagation();
    })
}
//正解モーダル
function correct_modal(){
    $('.p_modal--correct').addClass("shown");
    $('.p_modal--correct').click(()=>{
        $('.p_modal--correct').addClass("close");
        $('.p_modal--correct').one('animationend',()=>{
            $('.p_modal--correct').removeClass("shown");
            $('.p_modal--correct').removeClass("close");
        })
    });
}
//情報モーダル
$('.p_content__info').click(()=>{
    $('.p_modal--info').addClass("shown");
});
$('.p_modal--info').click((e)=>{
    $('.p_modal--info').addClass("close");
    $('.p_modal--info').one('animationend',()=>{
        $('.p_modal--info').removeClass("shown");
        $('.p_modal--info').removeClass("close");
    })
});
$(".p_modal--info__content").click((e)=>{
    e.stopPropagation();
})

//title
let start = 0;
let end = 0;
let started = false;
const width = $('.p_modal--title').width();
console.log(width);
document.querySelector('.p_modal--title').addEventListener("touchstart",(e)=>{
    e.preventDefault();
    start = e.touches[0].pageX;
});
document.querySelector('.p_modal--title').addEventListener("touchmove",(e)=>{
    e.preventDefault();
    end = e.changedTouches[0].pageX;
    $('.p_modal--title').css("left",`-${start - end}px`)
});
document.querySelector('.p_modal--title').addEventListener("touchend",(e)=>{
    if(started == false){
        if(start > end + (width / 2)){
            $('.p_modal--title__attention_list').eq(1).addClass('red')
        }
        $('.p_modal--title').css("left",`0px`);
    }else{
        if(start > end + (width / 4)){
            $('.p_modal--title').addClass("hidden");
        }else{
            $('.p_modal--title').css("left",`0px`);
        }
    }
});


///////// socket events /////////
let socket = io();

$(function(){
    //受験者として接続
    socket.emit('examinee_connect');
    socket.on('examinee_connect', () => {
        console.log('ID: ' + socket.id);
    });
    //試験開始
    socket.on("exam_start",()=>{
        $('.p_modal--title').addClass('started');
        started = true;
    })
    //
    socket.on("stage1",function(){
        $(".p_modal--title").eq(0).fadeOut(500);
    });
    socket.on("stage2",function(){
        $('.p_nav__item').eq(1).removeClass("--disabled");
        //state.progress = 1;
    });
});

