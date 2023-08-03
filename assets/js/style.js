// $(function(){
// 		//頭部--跑馬燈特效
// 		var thisTicker = $('.ticker'),
// 		tickerUl = thisTicker.find('ul'),
// 		tickerLl = tickerUl.find('li'),
// 		liFirst = tickerUl.find('li:first');

// 		liFirst.css({display:'block',opacity:'0',zIndex:'98'}).stop().animate({opacity:'1'},1000,'linear').addClass('showlist');
// 		//每4秒換下一個資訊
// 		setInterval(function(){
// 			var showLi = thisTicker.find('.showlist');
// 			showLi.animate({opacity:'0'},1000,'linear',function(){
// 				$(this).next().css({display:'block',opacity:'0',zIndex:'99'}).animate({opacity:'1'},1000,'swing').addClass('showlist').end().appendTo(tickerUl).css({display:'none',zIndex:'98'}).removeClass('showlist');
// 			});
// 		},4000);
// 	})

// require('./bootstrap');
$(function() {


  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
  });

  class App {
    constructor() {
		this.data = [
			{
			  topic  : 'Q:2014年世界杯足球赛冠军是哪一个国家？',
			  option : ['德国', '阿根廷', '韩国'],
			  answer : 0
			},
			{
			  topic  : 'Q:NBA湖人队球星科比于哪一年退役？',
			  option : ['2015', '2016', '2017'],
			  answer : 1
			},
			{
			  topic  : 'Q:NBA球星林书豪最近加盟的新球队是NBA哪一队？',
			  option : ['老鹰', '公牛', '猛龙'],
			  answer : 2
			},
			{
			  topic  : 'Q:哪个体育社区是国内最受欢迎最大的体育社区？？',
			  option : ['虎扑社区', '天涯社区', '球探体育'],
			  answer : 0
			}
		  ];
	}
	test(){
		alert('123456');
	}
    // 跑馬燈
    ticker() {
      var $ticker = $('.ticker'),
          $tickerUl = $ticker.find('ul'),
          $tickerLl = $tickerUl.find('li'),
          $liFirst  = $tickerUl.find('li:first');
      $liFirst.css({display:'block',opacity:'0',zIndex:'98'})
              .stop()
              .animate({opacity:'1'},1000,'linear')
              .addClass('showlist');
      //每6秒換下一個資訊
      setInterval(function(){
        var $showLi = $ticker.find('.showlist');
        $showLi.animate({opacity:'0'}, 1000, 'linear', function() {
          $(this).next()
                 .css({display:'block',opacity:'0',zIndex:'99'})
                 .animate({opacity:'1'},1000,'swing')
                 .addClass('showlist')
                 .end()
                 .appendTo($tickerUl)
                 .css({display:'none',zIndex:'98'})
                 .removeClass('showlist');
        });
      },4000);
    }
    // 題目挑戰
    test() {
      let $topicDom = $('.ques h1');
      let $optionDom = $('#step2-submit');
      let randomNum = Math.floor(Math.random() * Math.floor(this.data.length));
      let ques = this.data[randomNum];

      $($topicDom).text(ques.topic);
      $($optionDom).find('li a > span:last-child').each(function(index) {
        $(this).text(ques.option[index]);
      });
      this.answer = ques.answer;
    }
    // 挑戰倒數
    testReciprocal() {
      let $timeTextDom = $('.testReciprocal .time-text');
      let $ciRightDom  = $('#ciRight');
      let $ciLeftDom   = $('#ciLeft');
      let $timeText    = $($timeTextDom).text();

      $($ciRightDom).toggleClass("rightAni", true);
      $($ciLeftDom).toggleClass("leftAni", true);
      var timer = setInterval(function() {
        if (0 == $timeText){
          $($ciRightDom).toggleClass("rightAni", false);
          $($ciLeftDom).toggleClass("leftAni", false);
          clearInterval(timer);
          $($timeTextDom).text(10);
          this.showStep(3);
        }else {
          $timeText -= 1;
          $($timeTextDom).text($timeText);
        }
      }, 1000);
    }
    // 領取倒數
    phoneReciprocal() {
      let startTime, limitTime, countTime, hour, min, sec, msec;
      let cookieTime = window.localStorage.getItem('hupu');
      let $hourDOM = $('.phoneReciprocal').find('li').get(0);
      let $minDOM  = $('.phoneReciprocal').find('li').get(2);
      let $secDOM  = $('.phoneReciprocal').find('li').get(4);
      let $msecDOM = $('.phoneReciprocal').find('li').get(6);

      if (cookieTime == null) {
        limitTime = Date.now() + (2 * 60 * 60 * 1000);
        window.localStorage.setItem('hupu', limitTime);
      } else {
        limitTime = cookieTime;
      }

      var timer = setInterval(function() {
        startTime = Date.now();
        countTime = (limitTime - startTime);
        hour =  parseInt(countTime / (60 * 60 * 1000));
        min  =  parseInt(countTime / (60 * 1000) % 60);
        sec  =  parseInt(countTime / 1000 % 60);
        msec =  parseInt((1000 - startTime % 1000) / 10 ) % 100;

        $($hourDOM).text(('0' + hour).substr(-2,2));
        $($minDOM).text(('0' + min).substr(-2,2));
        $($secDOM).text(('0' + sec).substr(-2,2));
        $($msecDOM).text(('0' + msec).substr(-2,2));
        if(limitTime < startTime){
          clearInterval(timer);
          window.localStorage.removeItem('hupu');
          return false;
        }
      }, 10);
    }
    // 上傳手機
    postPhone(data, callback) {
      $.post("/share/data", data, function(response) {
        callback(response);
      }, "json");
    }
    // 步驟切換
    showStep(step) {
      $('section[class^=step]').hide();
      $('section.step' + step).show();
    }

  }

  var app = new App();
  app.ticker();
  app.showStep(1);

  $("#step1-submit").on("click", function(event) {
    app.showStep(2);
    app.testReciprocal();
    app.test();
  });

  $("#step2-submit").on("click", "li", function(event) {
    app.showStep(3);
    app.phoneReciprocal();
    if ($(this).index() == app.answer) {
      console.log('挑戰成功');
    } else {
      console.log('挑戰失敗');
    }
  });

  $("#step3-submit").on("click", function(event) {
    app.postPhone($( "#form" ).serialize(), function(response) {
      if (response.status == 'success') {
        $( "#form" ).addClass('success');
        $( "div.txt_info3" ).addClass('chg_height');
      } else {
        alert(response.msg);
      }
    });
  });

var _li = $('.main_btn ul li'),
duration = 300;

//已结束赛事开关
var leftBox = $('.left_bar'),
    // leftH = leftBox.offset().top,
    dataBox = $('.data_box'),
    _overBtn = $('.data_box:first-child .date_icon button');

var fixedTop = $('#gotop');
$('.data_box:not(:first-child)').find('.date_icon button').hide();

_overBtn.click(function () {
  var alOver = $('.already_over').parents('.css_table');

  if (alOver.hasClass('is_over')) {
    alOver.fadeIn(300).removeClass('is_over');
    _overBtn.text('隱藏已結束賽事').css('background-color', '#0060ff');
  } else {
    alOver.fadeOut(300).addClass('is_over');
    _overBtn.text('開啟已結束賽事').css('background-color', 'red');
  }
}); 

//左側選單滑入動效
$('.live_pic').hide().slideDown();

var _leftLi = $('ul.live_list li');

_leftLi.hide().each(function (index) {
    $(this).delay(300 * index).fadeIn(300);
}); 

//首頁_新聞截斷固定字串
var _len = $('.idx_li a');

$.each(_len, function () {
  var txtLen = $(this).text().length,
      len = 20;

  if (txtLen > len) {
    $(this).text($(this).text().substring(0, len));
    $(this).html($(this).html() + '.....');
  }
}); 

fixedTop.on('click', function () {
  $('html, body').animate({
    scrollTop: '0'
  }, 500);
}); 

//左侧选单固定上方
// $(window).on('scroll', function () {
//   if ($(window).scrollTop() > leftH) {
//     fixedTop.fadeIn('normal');
//     leftBox.css({
//       'position': 'fixed',
//       'top': 0
//     });
//   } else {
//     fixedTop.fadeOut('normal'); // leftBox.css('position', 'static');
//   }

//   if ($(window).width() < 1024) {
//     fixedTop.hide();
//   }
// }); 

//下拉子選單特效(修改後)
$('#mddNav > ul > li').hover(function () {
  childPanel = $(this).children('.mddWrap');
  childPanel.each(function () {
    childPanel.css({
      height: '0',
      display: 'block',
      opacity: '0'
    }).stop().animate({
      height: '150px',
      opacity: '1'
    }, 500, 'swing');
  });
}, function () {
  childPanel.css({
    display: 'none'
  });
}); 


// 右邊側邊標籤收合 ----------------------------------------
var $aside = $('.page-main > aside');
var $asidButton = $aside.find('.qq').on('click', function () {
  $aside.toggleClass('open');

  if ($aside.hasClass('open')) {
    $aside.stop(true).animate({
      right: '-70px'
    }, duration, 'easeOutBack');
    $asidButton.find('img').attr('src', 'assets/css/image/arrow_right.png');
  } else {
    $aside.stop(true).animate({
      right: '-350px'
    }, duration, 'easeInBack');
    $asidButton.find('img').attr('src', 'assets/css/image/arrow_left.png');
  };
});

});