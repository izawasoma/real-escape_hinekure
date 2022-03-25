const ans_list = {
    q1: {
        answer: "518",
        question: "数字(半角)で答えなさい",
        info: "課題No.は『01』",
    },
    q2: {
        answer: "へるしー",
        question: "ひらがな4文字で答えなさい",
        info: "課題主題は『注意力測定(追試)』",
    },
    q3: {
        question: "クラス記号を求めよ",
        info: "クラス記号を書け",
    },
    q4: {
        question: "点滅した順に押せ",
        info: "科目記号は『NZ85』",
    },
    q5: {
        answer: "かんしん",
        question: "ひらがな4文字で答えなさい",
        info: "科目担当は『四ツ井 光』",
    },
    q6: {
        answer: "なかま",
        question: "ひらがな3文字で答えなさい",
        info: "担任は『三須 大井』",
    },
    q7: {
        answer: "てんさい",
        question: "ひらがなで答えなさい",
        info: "学籍番号は『06025』",
    }
}
const q4ans = [4,0,20,12,24,6,8,16];
//ゲームの状況を保存する
let state = {
    //どこまで正解したか
    progress : 0
}

//解答する
$('#answer_button').on("click",()=>{
    const q_num = $('.p_nav__item.--active').text();
    check_ans(q_num);
})
//正誤判定
function check_ans(q_num){
    //特殊問題
    if(q_num == 3){
        if($('.p_content__input').eq(0).val() == "UL" && $('.p_content__input').eq(1).val() == "OOL" && $('.p_content__input').eq(2).val() == "495"){
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
function correct(q_num){
    correct_modal();
    $('.p_content__info').removeClass("--disabled");
    $('.p_modal--info').addClass("shown");
    $('.p_content__incorrect').addClass('hidden');
    state.progress = q_num;
    $('.p_nav__item').eq(q_num).removeClass("--disabled");
    $('.p_modal--info__content').text(ans_list["q" + q_num].info);
}
function incorrect(){
    $('.p_content__incorrect').removeClass('hidden');
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
$(".p_modal--info__image").click((e)=>{
    e.stopPropagation();
})
//ナビおよび問題の切り替え
$('.p_nav__item').on("click",(e)=>{
    const q_num = e.target.textContent;
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
        $('.p_content__nazo_container').append(`<img class="p_content__nazo_image q7" src="img/question/7-2.png">`);
    }else{
        $('.p_content__nazo_image').attr("src",`img/question/${q_num}.png`);
    }
    $('.p_content__question_text').text(ans_list["q" + q_num].question);
    $('.p_nav__item.--active').removeClass("--active");
    $(e.target).addClass("--active");
    $('.p_content__incorrect').addClass('hidden');

    if(state.progress >= q_num){
        if(q_num == 3){
            $('.p_content__input').eq(0).val("UL");
            $('.p_content__input').eq(1).val("OOL");
            $('.p_content__input').eq(2).val("495");
        }else{
            $('.p_content__input').val(ans_list["q" + q_num].answer);
        }
        $('.p_content__info').removeClass("--disabled")
    }else{
        $('.p_content__input').val("");
        $('.p_content__info').addClass("--disabled")
    }
})

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