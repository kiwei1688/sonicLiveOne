var set_pageFn2 = function(){
	var $this = this;
	var _ext;
	
	var fn = {
	 //產資料~~未領取
	 appendData:function(obj){
		//  console.log('obj--->',obj);
		var pro1 = $('.promotion'),
			_ul = $('<ul/>').attr('class','clearfix');
			var pro_length = obj.length;

			pro_length = 0;
			fn.topBtn(pro_length);

		// $.each(obj,function(index,elm){
		for(var k in obj){
			var index =k;
			var elm = obj[k];
			for(var i in elm){
				var _id = elm[i].id,
					_typeName = elm[i].typeName,
					_saveNum = elm[i].saveNum,
					_sendNum = elm[i].sendNum,
					_stopTime = elm[i].stopTime,
					_actTime = elm[i].actTime,
					_actDetail = elm[i].actDetail,
					_proTxt = elm[i].proTxt;

				var _li = $('<li/>').attr('data-id',index).click(function(){
						var thisObj = obj[$(this).attr('data-id')]; 

						$('.act_page1').remove(); 
						$('.mask_box').fadeIn();
						fn.popup(thisObj); //點擊後 傳送當下obj值過去popup函式
				    }),
					_actBox = $('<div/>').attr('class','act_box'),
					_topic = $('<div class="act_topic">'+ _typeName +'</div>'),
					_actTime = $('<div class="act_time">'+ _stopTime +'&nbsp;领取截止</div>'),
					_topic2 = $('<div class="act_topic"/>'),
					_rightNow = $('<a href="javascript:void(0)" class="rightNow"/>').append('立即领取');
					
					_topic2.append(_rightNow);

				switch (_id){
					case '01':
						var _type1 = $('<div class="type1 act_save"/>'),
							_saveM = $('<div/>').append('存' + _saveNum),
							_sendM = $('<div/>').append('送' +_sendNum);
							_type1.append(_saveM).append(_sendM);

						_actBox.append(_topic).append(_type1).append(_actTime).append(_topic2);
						break;
					case '02':
						var _type2 = $('<div class="type2 act_save2"/>'),
							_span = $('<span/>').append('¥');

							_type2.append(_span).append(_saveNum);
							_actBox.append(_topic).append(_type2).append(_actTime).append(_topic2);
						break;
					case '03':
						var _type3 = $('<div class="type3 act_save3 clearfix"/>'),
							_txtDiv_l = $('<div class="txt_l"/>').append('优惠<br>存款'),
							_txtDiv_r = $('<div class="txt_r"/>'),
							_span_r = $('<span/>').append('%');

							_txtDiv_r.append(_saveNum).append(_span_r);
							_type3.append(_txtDiv_l).append(_txtDiv_r);

							_actBox.append(_topic).append(_type3).append(_actTime).append(_topic2);
						break;
				}
				_li.append(_actBox);
			}
			_ul.append(_li);
		// });
		}	

		pro1.html(_ul);
	 },
	 //產~~已領取資料
	 appendPro2:function(data){
		// console.log('data--->',data);
		var pro1 = $('.promotion_ok'),
			_ul = $('<ul/>').attr('class','clearfix');

		$.each(data,function(index,elm){
			for(var i in elm){
				var _id = elm[i].id,
					_typeName = elm[i].typeName,
					_saveNum = elm[i].saveNum,
					_sendNum = elm[i].sendNum,
					_stopTime = elm[i].stopTime,
					_actTime = elm[i].actTime,
					_actDetail = elm[i].actDetail,
					_proTxt = elm[i].proTxt;

				var _li = $('<li/>'),
					_actBox = $('<div/>').attr('class','act_box'),
					_topic = $('<div class="act_topic">'+ _typeName +'</div>'),
					_actTime = $('<div class="act_time">'+ _stopTime +'&nbsp;领取截止</div>'),
					_topic2 = $('<div class="act_topic"/>'),
					_already = $('<div/>').attr('class','act_already').append('您已完成领取');
					
				    _topic2.append(_already);

				switch (_id){
					case '01':
						var _type1 = $('<div class="type1 act_save"/>'),
							_saveM = $('<div/>').append('存' + _saveNum),
							_sendM = $('<div/>').append('送' +_sendNum);
							_type1.append(_saveM).append(_sendM);

						_actBox.append(_topic).append(_type1).append(_actTime).append(_topic2);
						break;
					case '02':
						var _type2 = $('<div class="type2 act_save2"/>'),
							_span = $('<span/>').append('¥');

							_type2.append(_span).append(_saveNum);
							_actBox.append(_topic).append(_type2).append(_actTime).append(_topic2);
						break;
					case '03':
						var _type3 = $('<div class="type3 act_save3 clearfix"/>'),
							_txtDiv_l = $('<div class="txt_l"/>').append('存款<br>优惠'),
							_txtDiv_r = $('<div class="txt_r"/>'),
							_span_r = $('<span/>').append('%');

							_txtDiv_r.append(_saveNum).append(_span_r);
							_type3.append(_txtDiv_l).append(_txtDiv_r);

							_actBox.append(_topic).append(_type3).append(_actTime).append(_topic2);
						break;
				}
				_li.append(_actBox);
			}
			_ul.append(_li);
		});

		pro1.html(_ul);
	 },
	 // 產~~彈窗資料
	 popup:function(data){
		 var _this = this;

		 var arr = data;
		 var act_page = $('<div/>').attr('class','act_page1 clearfix');
	 
		 for(var i in arr){
			var _id = arr[i].id,
				_typeName = arr[i].typeName,
				_saveNum = arr[i].saveNum,
				_sendNum = arr[i].sendNum,
				_stopTime = arr[i].stopTime,
				_actTime = arr[i].actTime,
				_actDetail = arr[i].actDetail,
				_proTxt = arr[i].proTxt,
				_ex = arr[i].ext,
				_web = arr[i].website,
				_rule = arr[i].rule1;

			var data_l = $('<div/>').attr('class','data_l'),
				data_l2 = $('<div/>').attr('class','data_l rule'),
				data_r = $('<div/>').attr('class','data_r'),
				div_left = $('<div/>').attr('class','data_left'),
				div_right = $('<div/>').attr('class','data_right'),
				data_list = $('<div/>').attr('class','data_list'),
				pop_actTime_span4 = $('<span/>').attr('class','main_txt').append('詳細規則'),
				_deadline = $('<div class="inner_txt"/>').append('请于存款后1小时内进行领取'),
				_h1 = $('<h1/>').append(_typeName),
				_ul = $('<ul/>'),
				_li_01 = $('<li/>'),
				_li_02 = $('<li/>'),
				_li_03 = $('<li/>'),
				_li_04 = $('<li/>'),
				pop_actTime_span = $('<div/>').attr('class','main_txt').append('活动时间'),
				pop_goldTime_span = $('<div/>').attr('class','gold_txt').append(_actTime),
				pop_actTime_span2 = $('<div/>').attr('class','main_txt').append('活动简介'),
				pop_goldTime_span2 = $('<div/>').attr('class','gold_txt').append(_actDetail),
				pop_actTime_span3 = $('<div/>').attr('class','main_txt').append('优惠说明'),
				pop_goldTime_span3 = $('<div/>').attr('class','red_txt').append(_proTxt);

				//活動條則 渲染資料
				var data_list_rule = $('<div/>').attr('class','data_list').append('<h2>活動條則</h2>'),
					_ul_rule = $('<ul/>');

				// 判斷是 按鈕連細則說明 or 連到官網
				if(_ex == '1'){ //連至官網
					_ext = $('<div/>').attr('class','main_txt').append('詳細規則');
					var linkSpan = $('<div/>').attr('class','gold_txt');
					var _href = $('<a class="circle"/>').html('<img src="assets/css/images/circle.png">').attr({
							'href':_web,
							'target':"_blank"
					});
					linkSpan.append('請參閱優博資訊站，馬上前往').append(_href);
					_li_04.append(_ext).append(linkSpan);
				}else{ //連至 細則說明
					var _chk_btn = $('<div class="gold_txt type01"><a href="javascript:void(0)">請點此查看</a></div>'),
						_ext = $('<div/>').attr('class','main_txt').append('詳細規則');

					var _divRule = $('<div/>').attr('class','data_l rule none'),
						_divList = $('<div/>').attr('class','data_list'),
						_divUl = $('<ul/>'),
						_li_rule = $('<li/>').append('<a href="javascript:void(0)" class="back"><img src="assets/css/images/back.png"></a>');

						// _divUl.append(_rule);
						_divUl.append(_li_rule);
						_divList.append(_divUl);
						_divRule.append(_divList);
						act_page.append(_divRule);

						_li_04.append(_ext).append(_chk_btn).click(function(){
							// console.log('111', act_page[0]);

							$('.act_page1 .data_l').hide();
							$('.act_page1 .rule').removeClass('none').show();
						});
				}

				_li_03.append(pop_actTime_span3).append(pop_goldTime_span3);
				_li_02.append(pop_actTime_span2).append(pop_goldTime_span2);
				_li_01.append(pop_actTime_span).append(pop_goldTime_span);

				_ul.append(_li_01).append(_li_02).append(_li_03);
				data_list.append(_h1).append(_ul);
				data_l.append(data_list);
				
				//彈窗1 左側資料 (存1000送88)
				function popData01(){
					var _data_r1 = $('<div class="main_txt"/>').append('存'+ _saveNum +'送<span>'+ _sendNum +'</span>'),

						_get_btn1 = $('<a href="javascript:void(0)" id="=b1" class="rightGray"/>').append('立即领取'),
						_s_time = $('<div class="stop_time">领取截止时间<br>'+ _stopTime +'</div>'); 
						//append right
						_li_04.append(_chk_btn);
						_ul.append(_li_04);
						div_left.append(_data_r1).append(_deadline);

						div_right.append(_get_btn1).append(_s_time);
						data_r.append(div_left).append(div_right);
						// 細則
						_ul_rule.append(_rule).append(_li_rule);
						data_list_rule.append(_ul_rule);
						data_l2.append(data_list_rule);
					}
				//彈窗2 左側資料 (388)
				function popData02(){
					var _data_r2 = $('<div class="money_txt"/>').append('<span>¥</span>' + _saveNum),
						
						_get_btn1 = $('<a href="javascript:void(0)" id="=b2" class="rightGray"/>').append('立即领取'),
						_s_time = $('<div class="stop_time">领取截止时间<br>'+ _stopTime +'</div>');
						
						_ul.append(_li_04);
						div_left.append(_data_r2);
						
						div_right.append(_get_btn1).append(_s_time);
						data_r.append(div_left).append(div_right);
						// 細則
						_ul_rule.append(_rule).append(_li_rule);
						data_list_rule.append(_ul_rule);
						data_l2.append(data_list_rule);
					}
				//彈窗2 左側資料 (存款優惠10%)
				function popData03(){
					var _data_r3 = $('<div class="main_txt"/>').append('优惠存款<span>'+ _saveNum +'%</span>'),

						_get_btn1 = $('<a href="javascript:void(0)" id="=b3" class="rightGray"/>').append('立即领取');
						_s_time = $('<div class="stop_time">领取截止时间<br>'+ _stopTime +'</div>'),
						_max_limit = $('<div class="inner_txt"/>').append('上限3888/打碼3倍<br>').append('请于存款后1小时内进行领取');
						
						_ul.append(_li_04);
						div_left.append(_data_r3).append(_max_limit);
						
						div_right.append(_get_btn1).append(_s_time);
						data_r.append(div_left).append(div_right);
						// 細則
						_ul_rule.append(_rule).append(_li_rule);
						data_list_rule.append(_ul_rule);
						data_l2.append(data_list_rule);
					}	
				
				function chkRule(){
					switch (_id){
						case '01':
							popData01();
							// console.log(data_l2[0]);
							break;
						case '02':
							popData02();
							// console.log(data_l2[0]);
							break;
						case '03':
							popData03();
							// console.log(data_l2[0]);
							break;
						default:
							break;
					 }	
				}
				chkRule();
				// switch (_id){
				// 	case '01':
				// 		popData01();
				// 		console.log(data_l2[0]);
				// 	    break;
				// 	case '02':
				// 		popData02();
				// 		console.log(data_l2[0]);
				// 		break;
				// 	case '03':
				// 		popData03();
				// 		console.log(data_l2[0]);
				// 		break;
				// 	default:
				// 		break;
		     	// }	
			act_page.append(data_l).append(data_r);
			$('.m_inner_box').append(act_page);
		 }
	 },
	 loadAjax:function(){
		var _this = this;

		$.ajax({
			type:'post',
			url:'http://127.0.0.1/yubos/assets/js/promotion.json',
			success:function(data){
				var loadData = data;
				    dataGroup = data;
				// fn.appendData(loadData); // 傳給 尚未領取
				// fn.appendPro2(loadData); // 傳給 已領取
			},error:function(){
				alert('沒有連上伺服器');
			}
		}).always(function(){ });
	 },
	 //帳號登入判斷
	 chkIpt:function(){
		// 判斷是否有登入帳號
		$('.sumit_btn a').on('click',function(){
			var _login = $('.login_content input').val();
			if(_login == ''){
				alert('请输入您的帐号!');
				$('.login_content input').focus();
			}
		});
		//前往優博官網
		$('.yubo_w a').on('click',function(){
			$(this).attr({
				"href":"http://iyb88.biz/",
				"target":"_blank"
			});
		});
	 },
	 //按鈕判斷開啟page
	 topBtn:function(length){
		var pro_length = length;

		$('.sec_btn a').on('click',function(){
			var current = $(this).index(); 
			$('.sec_btn a').removeClass('active2');

			if(current == 0){
				$(this).addClass('active2');
					$('.promotion').fadeIn();
					$('#pagination-demo1').fadeIn();
					$('.promotion_ok').hide();
					$('#pagination-demo2').hide();
			}else{
				$(this).addClass('active2');

				$('.promotion').hide();
				$('#pagination-demo1').hide();
				$('.promotion_ok').fadeIn();
				$('#pagination-demo2').fadeIn();
			}
		});
	 },
	 init:function(){
		this.loadAjax();
		this.chkIpt();
		// this.topBtn();

		//關掉彈窗
		 $('.close_btn').on('click',function(){
			$('.mask_box').hide();
		});
	 }
	};
	fn.init();
	return fn;
 };
 var setPage = new set_pageFn2();
