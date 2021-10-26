/**
 * Created by JKZ on 2015/6/9.
 */

var MsgType = {
    MSG_TYPE_SINGLE_TEXT: 0x01, // 单聊文本消息
    MSG_TYPE_SINGLE_AUDIO: 0x02, // 单聊语音消息
    MSG_TYPE_SINGLE_RED_PACKET: 0x03, // 单聊红包消息
    MSG_TYPE_SINGLE_SYS_MSG: 0x04, //单聊系统消息
    MSG_TYPE_SINGLE_RICH_TXT: 0x05, //单聊富文本消息
};
var RichMsgSubType = {
    SUBTYPE_IMG_AND_TEXT: 0x01, // 图文混编
    SUBTYPE_PRODUCT_LINK: 0x02, // 产品链接
    SUBTYPE_EMAIL_NOTIFY: 0x03, // 邮件提示
    SUBTYPR_ATTACHMENT:   0x04,   // 发送附件
};

var  yunwebim = {
    timer:0, //定时心跳
    curchat:0,
    params:{},
    config:function( params )
    {
        yunwebim.curchat= params.curchat;
        yunwebim.params=params;
        if(params && params.eventid &&  params.eventid >0 )
        {
            yunwebim.params.eventid=params.eventid;
        }
        else
        {
            yunwebim.params.eventid=0;
        }
        if(params && params.appid &&  params.appid >0 )
        {
            yunwebim.params.appid=params.appid;
        }
        else
        {
            yunwebim.params.appid=10001;
        }
        yunwebim.params.config.flag=yunwebim.params.appid;
        yunwebim.params.model=2;
        yunwebim.params.config.ws=true;
        if(  window.location.protocol.toLowerCase() =="https:" )
        {
        	yunwebim.params.config.ws=false;
        }
         
        	
    },
    im_init:function()
    {
    	try {
    		
    		if( chat.datas.msgserver  && chat.datas.msgserver.length >0 && chat.datas.msgport && chat.datas.msgport.length >0 )
    			{
    			yunwebim.im_init2();
    			}
    		else
    			{
    			chat.getMsgserverurl( yunwebim.params.config.loadserver );
    			yunwebim.im_init2();
    			}
    		
    		}
    		catch(err){
    		      console.log("get server ip error");
    		}
        
    },
    im_init2:function()
    {
        var params = yunwebim.params;
        chat.init( params.config   );
        chat.wsOpen(params.loginname, params.loginpass,params.loginid,params.appid);
        chat.wsMessage(receiveMessageCallback,params);
        chat.wsOnclose();
        chat.wsOnerror();
        
    },

    //解析消息内容，并展示
    //type 消息类型
    // msg 消息体
    createMessageHtml:function( type,msg )
    {
        var html = '';
        switch (type) {
            case MsgType.MSG_TYPE_SINGLE_TEXT:
                if(msg.match(/&\$#@~\^@\[\{:(.*):\}\]&\$~@#@/i)){
                    var match = msg.match(/&\$#@~\^@\[\{:(.*):\}\]&\$~@#@/i);
                    msg = yunwebim.dealimg(match[1]);  //图片加a标签，lightbox 进行放大
                }else{

                    msg = yunwebim.dealincludeurl(msg);
                }

                html += str = '<img src="img/wap3_03.png"/*tpa=http://www.aksoherb.com/webim/img/wap3_03.png*/ class="header_icon"><pre  class="youspeak">'+ msg +'</pre>';
                break;
        }

        var str = '<div msg="msg" class="alert alert-left alert-info">' +
                html +
                '</div>';
        $('#im_content_list').append(str);
        var ismin = $(window.parent.document).find('.layui-layer-min').css('display');
        if(ismin == 'none'){
            $(window.parent.document).find(".imgtips").remove();
            $(window.parent.document).find('.layui-layer-max').prepend("<img id=imgtips class=imgtips src=images/webim.gif>");
        }
        $('#im_content_list').scrollTop( $('#im_content_list')[0].scrollHeight );
        
    },

    //接受消息
    responseMsgData: function  (responseArr,params) {
        var resmsg = chat.byteToString( responseArr[5]  );  //解析消息具体内容
        console.log( "responseMsgData " + resmsg ) ;
        var msg_type= responseArr[4] ;
        var eventid= responseArr[8];

        var html= yunwebim.createMessageHtml( msg_type,resmsg );
        //设置已读
        chat.MsgDataReadAck(yunwebim.params.loginid,responseArr[0],0,1,eventid);
    },

    /**
     * 处理上传图片发送的消息
     * @param content
     * @returns {string|*|XML|void}
     */
    dealimg:function  (content) {
        return '<img class="rich-img" '+'src="'+content+'"  style="max-width:80%; max-height:400px;"  onerror="IM.Img_Error_Reload(this)"  onload="IM.To_Bottom()"  />';
    },
    /**
     * 接受消息时 给文本中所有url加超链接
     * @param content
     * @returns {string|*|XML|void}
     */
    dealincludeurl:function (msg) {
        var text = msg;
        var exp = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        return  text.replace(exp, "<a href='$1$2' target='_blank'>$1$2</a>");
    },
    /*
     发送消息
     send_type
     1  文本 表情 文本加链接  非产品链接  msg_data= 原始内容
     2  产品链接  msg_data={ name ,imgurl,url,brand , certification}
     3  上传图片  msg_data为上传图片的路径

     4 文本图片数组 msg_data=[{subType:'text',value:'hello'},{subType:'img',value:'b.jpg'/*tpa=http://www.aksoherb.com/webim/b.jpg*/}];
     5  上传附件  msg_data={  name,size,url,filetype }
     */
    send_msg_data: function (  send_type , msg_data )
    {
    	console.log(  "send_msg_data" );
    	console.log(  send_type );
    	console.log(  msg_data );
        var send_info = {
            send_time: Date.parse(new Date()) / 1000
        };
        switch(send_type)
        {

            case 2:
                send_info.msg_type = MsgType.MSG_TYPE_SINGLE_RICH_TXT;
                send_info.msg_data = {
                    subType: RichMsgSubType.SUBTYPE_PRODUCT_LINK,
                    content: [
                        {
                            title: msg_data.name,
                            img: msg_data.imgurl,
                            url: msg_data.url,
                            "Brand Name": msg_data.brand,
                            certification: msg_data.certification
                        }
                    ]
                };
                break;
            case 3:
                send_info.msg_type = MsgType.MSG_TYPE_SINGLE_TEXT;
                send_info.msg_data= "&$#@~^@[{:"+msg_data+":}]&$~@#@";
                break;
            case 4:
                send_info.msg_type = MsgType.MSG_TYPE_SINGLE_RICH_TXT;
                send_info.msg_data = {
                    subType: RichMsgSubType.SUBTYPE_IMG_AND_TEXT,
                    content:  msg_data,
                };
                break;
            case 5:
                send_info.msg_type = MsgType.MSG_TYPE_SINGLE_RICH_TXT;
                send_info.msg_data = {
                    subType: RichMsgSubType.SUBTYPR_ATTACHMENT,
                    content:
                    {
                        name: msg_data.name,
                        size: msg_data.size,
                        url:  msg_data.url,
                        filetype: msg_data.filetype,
                    }
                };
                break;
            default:
                send_info.msg_type = MsgType.MSG_TYPE_SINGLE_TEXT;
                send_info.msg_data = msg_data;
                break;

        }

        if( send_info.msg_type == MsgType.MSG_TYPE_SINGLE_RICH_TXT  )
        {
            send_info.msg_data=JSON.stringify(send_info.msg_data);
        }

        if(  yunwebim.curchat &&  yunwebim.curchat >0 )
        {
        	var jsonObj= {"device": yunwebim.params.device  ,"bemail":yunwebim.params.bemail,"bcountry":yunwebim.params.bcountry};
        	var jsonStr = JSON.stringify(jsonObj);
            var extra_info = chat.stringToByte(jsonStr);
            chat.MsgData(yunwebim.params.loginid, yunwebim.curchat, 0, send_info.send_time, send_info.msg_type, send_info.msg_data,yunwebim.params.eventid ,extra_info);
        }
    },
    // 发送文本消息 ， 可能是产品链接，可能是普通文本
    send_text:function( str )
    {
        str=str.replace(/\r\n/g,"<br/>")
        str=str.replace(/\n/g,"<br/>");
        yunwebim.send_msg_data(  1 , str  );
    }
}

/*-------------------------------*/

/**
 * WebSocket onMessage 消息监听的回调函数
 */
function receiveMessageCallback (responseArr,params) {
    var serid = responseArr[(responseArr.length) - 1][0];
    var comid = responseArr[(responseArr.length) - 1][1];
    
    console.log(  " serid " + serid+ " comid " +comid   );
    switch (serid) {
        case 1://Login
            switch (comid) {
                case 260://IMLoginRes	 登录成功
                	 if( responseArr[1]  !=0 )
                		 {                		  
                		 var cookies = document.cookie.split(";");
                		    for (var i = 0; i < cookies.length; i++) {
                		        var cookie = cookies[i];
                		        var eqPos = cookie.indexOf("=");
                		        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                		        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                		    }
	                		 alert("please input email!");
	                		 parent.location.reload(1);
	                		 return false;

                		 }
                    break;
                default:
                    console.log(comid + "指令暂未定义");
                    return false;
            }
            break;
        case 2: //Buddy
            switch (comid) {
                case 515 : ////IMUserStatNotify
                    break;
                case 517://IMUsersInfoRsp   用户信息


                    break;
                default:
                    console.log(comid + "指令暂未定义");
                    return false;
            }
            break;
        case 3://Message
            switch (comid) {
                case 769://IMMsgData  接受消息

                    if(  params.loginid == responseArr[1]){
                        yunwebim.responseMsgData(responseArr,params);

                    }

                    break;

                case 776://IMUnreadMsgCntRsp



                    break;
                case 778://IMGetMsgListRsp


                    break;
                case 780://IMGetLatestMsgIdRsp

                    break;

                default:
                    console.log(comid + "指令暂未定义");
                    return false;
            }
            break;
        case 5://File
            switch (comid) {

                default:
                    console.log(comid + "指令暂未定义");
                    return false;
            }
            break;
        default:
            console.log("服务暂未定义");
            return false;
    }

}
(function()
{
    window.IM = window.IM ||
            {
                _appid : '', //应用ID
                _3rdServer : '3rd.php.htm'/*tpa=http://www.aksoherb.com/webim/3rd.php*/, //3rdServer，主要用来虚拟用户服务器获取SIG

                /** 以下不要动，不需要改动 */
                _user_account : null,
                _content_you : null,
                _timeoutkey : null,
                _username : null,
                _user_account : null,
                _contact_type_c : 'C', //代表联系人
                _contact_type_g : 'G', //代表群组
                _contact_type_m : 'M', //代表多渠道客服
                _onMsgReceiveListener : null,
                _onDeskMsgReceiveListener : null,
                _noticeReceiveListener : null,
                _onConnectStateChangeLisenter : null,
                _isMcm_active : false,
                _local_historyver : 0,
                _msgId : null,//消息ID，查看图片时有用
                _pre_range : null,//pre的光标监控对象
                _pre_range_num : 0, //计数，记录pre中当前光标位置，以childNodes为单位

                _name : "", // 展示用
                //_pinfo : {}, // 相关产品信息
                //_tips : false, // 产品信息是否已发送
                _userdata : {},//用户定义数据,包括产品和聊天

                /**
                 * 自动回复
                 * @private
                 */
                autoreply : function(){
                    if(IM._userdata.is_auto_reply == 0){
                        if(IM._userdata.auto_reply.status == 1){
                            if(IM._userdata.bname != ""){
                                var newcontent=IM._userdata.auto_reply.content.replace("[EMAIL]",IM._userdata.bname);
                            }else{
                                var newcontent=IM._userdata.auto_reply.content.replace("[EMAIL]",IM._userdata.bemail);
                            }
                            if(IM._userdata.pname == ""){
                                IM._userdata.pname = "our products";
                            }
                            newcontent=newcontent.replace("[PNAME]",IM._userdata.pname);
                            var str = '<div msg="msg" class="alert alert-left alert-info" style="block"><img src="img/wap3_03.png"/*tpa=http://www.aksoherb.com/webim/img/wap3_03.png*/ class="header_icon"><pre  class="youspeak">'+newcontent+'</pre></div>';
                            $('#im_content_list').append(str);
                            IM._userdata.is_auto_reply = 1;
                        }
                    }
                },

                /**
                 * 初始化
                 * @private
                 */
                init : function(params){

                    yunwebim.config( params );
                    //yunwebim初始化
                    yunwebim.im_init();

                    clearInterval( yunwebim.timer );
                    yunwebim.timer = setInterval(function () {
                        //开启定时器
                        //ws已连接，已登录状态 心跳一次
                        if (chat.datas.isLogin && chat.datas.wsstatus) {
                            chat.HeartBeat();
                        }
                        //ws未连接，未登录状态 重新ws连接且重新登录
                        else if (!chat.datas.wsstatus) {
                            yunwebim.im_init();
                        }//ws已连接，未登录状态 重新登录
                        else if (!chat.datas.isLogin) {
                            chat.doLogin(yunwebim.params.loginname  , yunwebim.params.loginpass , yunwebim.params.loginid , yunwebim.params.appid );
                        }
                        else {
                            console.log("异常错误！");
                        }

                    }, 60000);
                },

                /**
                 * 初始化一些页面需要绑定的事件
                 */
                initEvent : function(){

                    //IM._pre_range = new TextareaEditor( document.getElementById('im_send_content') );
                    $('#im_send_content')
                        //.bind('mouseup', function(){
                        //    IM.DO_pre_replace_content();
                        //    IM.DO_pre_range_num('mouseup');
                        //})
                        //.bind('keyup', function(){
                        //    IM.DO_pre_replace_content();
                        //    IM.DO_pre_range_num('keyup');
                        //})
                        //.bind('focus', function(){
                        //    IM.DO_pre_range_num('focus');
                        //})
                            .bind('paste', function(){
                                IM.DO_pre_replace_content();
                            });
                },

                /**
                 * 初始化表情
                 */
                initEmoji : function(){
                    var emoji_div = $('#emoji_div').find('div[class="popover-content"]');
                    for(var i in emoji.show_data){
                        var c = emoji.show_data[i];
                        var out = emoji.replace_unified(c[0][0]);

                        var content_emoji = '<span style="cursor:pointer; margin: 0 2px 0 4px;" onclick="IM.DO_chooseEmoji(\''+ i +'\', \''+ c[0][0] +'\')" imtype="content_emoji">'+ out +'</span>';

                        emoji_div.append(content_emoji);
                    }

                },

                /**
                 * 监控键盘
                 * @param event
                 * @constructor
                 */
                _keyCode_1 : 0,
                _keyCode_2 : 0,
                EV_keyCode : function(event){
                    IM._keyCode_1 = IM._keyCode_2;
                    IM._keyCode_2 = event.keyCode;
                    //17=Ctrl  13=Enter
                    if(IM._userdata.device!= 1){
                        if(event.shiftKey && 13 == IM._keyCode_2 || event.altKey && 13 == IM._keyCode_2) {
                            event.returnValue = true;
                        }else if(13 == IM._keyCode_2 && !$("#sendmsgBtn").prop("disabled")){
                            event.returnValue = false;
                            IM.DO_sendMsg();
                        }
                    }
                },

                DO_login : function(){
                    // console.log("DO_login");
                    var user_account = IM._user_account;
                    if(user_account=='' || user_account==undefined || user_account==null){
                        // alert('请填写手机号后再登录');
                        return;
                    }

                    IM._login(user_account);
                },

                /**
                 * 正式处理登录逻辑，此方法可供断线监听回调登录使用
                 * 获取时间戳，获取SIG，调用SDK登录方法
                 * @param user_account
                 * @private
                 */
                _login : function(user_account){
                    var timestamp = IM._getTimeStamp();
                    IM._privateLogin(user_account, timestamp, function(obj){
                        IM.EV_login(user_account, obj.sig, timestamp);
                    }, function(obj){
                        alert(obj.msg);
                    });
                },

                /**
                 * SIG获取
                 * 去第三方（客服）服务器获取SIG信息
                 * 并将SIG返回，传给SDK中的登录方法做登录使用
                 * @param user_account
                 * @param timestamp -- 时间戳要与SDK登录方法中使用的时间戳一致
                 * @param callback
                 * @param onError
                 * @private
                 */
                _privateLogin : function(user_account, timestamp, callback, onError){
                    // console.log("_privateLogin");
                    var data={"appid":IM._appid,
                        "username":user_account,
                        "timestamp":timestamp};
                    var url = IM._3rdServer;
                    $.ajax({
                        url:url,
                        dataType:'jsonp',
                        data:data,
                        jsonp:'cb',
                        success:function(result) {
                            if(result.code!=000000){
                                var resp = {};
                                resp.code=result.code;
                                resp.msg="Get SIG fail from 3rd server!...";
                                onError(resp);
                                return ;
                            }else{
                                var resp = {};
                                resp.code=result.code;
                                resp.sig=result.sig;
                                callback(resp);
                                return ;
                            }
                        },
                        error:function(){
                            var resp = {};
                            resp.msg='Get SIG fail from 3rd server!';
                            onError(resp);
                        },
                        timeout:15000
                    });
                },

                /**
                 * 事件，登录
                 * 去SDK中请求登录
                 * @param user_account
                 * @param sig
                 * @param timestamp -- 时间戳要与生成SIG参数的时间戳保持一致
                 * @constructor
                 */
                EV_login : function(user_account, sig, timestamp){
                    // console.log("EV_login");

                    //$('#navbar_user_account').addClass('input-xlarge');
                    var loginBuilder = new RL_YTX.LoginBuilder(1, user_account, '', sig, timestamp);
                    RL_YTX.login(loginBuilder, function(obj){
                        // console.log("EV_login succ...");

                        IM._user_account = user_account;
                        IM._username = user_account;
                        //注册PUSH监听
                        IM._onMsgReceiveListener = RL_YTX.onMsgReceiveListener(function(obj){
                            IM.EV_onMsgReceiveListener(obj);
                        });
                        //注册客服消息监听
//                    IM._onDeskMsgReceiveListener = RL_YTX.onDeskMsgReceiveListener(function(obj){
//                        IM.EV_onMsgReceiveListener(obj);
//                    });
                        //注册群组通知事件监听
//                    IM._noticeReceiveListener = RL_YTX.onNoticeReceiveListener(function(obj){
//                        IM.EV_noticeReceiveListener(obj);
//                    });
                        //服务器连接状态变更时的监听
                        IM._onConnectStateChangeLisenter = RL_YTX.onConnectStateChangeLisenter(function(obj){
                            //obj.code;//变更状态 1 断开连接 2 重练中 3 重练成功 4 被踢下线 5 断线需要人工重连
                            if(1 == obj.code){
                                // console.log('onConnectStateChangeLisenter obj.code:'+ obj.msg);
                            }else if(2 == obj.code){
                                IM.HTML_showAlert('alert-warning', '网络状况不佳，正在试图重连服务器', 10*60*1000);
                                //IM.HTML_closeAlert();
                            }else if(3 == obj.code){
                                IM.HTML_showAlert('alert-success', '连接成功');
                            }else if(4 == obj.code){
                                IM.DO_logout();
                                alert(obj.msg);
                            }else if(5 == obj.code){
                                IM.HTML_showAlert('alert-warning', '网络状况不佳，正在试图重连服务器');
                                IM._login(IM._user_account);
                            }else{
                                // console.log('onConnectStateChangeLisenter obj.code:'+ obj.msg);
                            }
                        });

                        $('#navbar_user_account').removeAttr("readonly");

                        IM.EV_getMyInfo();
                        IM.HTML_LJ_none();

                        //登录后拉取群组列表
//                    IM.EV_getGroupList();

                        //登录后拉取未读过的消息
                        if(IM._local_historyver <= parseInt(obj.historyver) && parseInt(obj.historyver) < parseInt(obj.version)){
                            IM._local_historyver = parseInt(obj.historyver)
                            IM.EV_syncMsg(parseInt(obj.historyver)+1, obj.version);
                        }

                        var uploadPersonInfoBuilder = new RL_YTX.UploadPersonInfoBuilder();
                        uploadPersonInfoBuilder.setNickName('即时询盘');
                        RL_YTX.uploadPerfonInfo(uploadPersonInfoBuilder, function(obj){//设置成功
                            //obj.version;//个人信息版本号
                        }, function(resp){
                            //设置失败
                            // console.log('nickname error:'+resp.code);
                        });
                        //添加客服号到列表中
                    }, function(obj){
                        $('#navbar_user_account').removeAttr("readonly");

                        alert("error code: "+ obj.code);
                    });
                },

                /**
                 * 事件，登出
                 * @constructor
                 */
                EV_logout : function(){
                    // console.log("EV_logout");
                    IM.DO_logout();
                    RL_YTX.logout(function(){
                        // console.log("EV_logout succ...");
                    }, function(obj){
                        alert("error code: "+ obj.code);
                    });
                },

                /**
                 * 登出
                 * @constructor
                 */
                DO_logout : function(){
                    //销毁PUSH监听
                    IM._onMsgReceiveListener = null;
                    //注册客服消息监听
                    IM._onDeskMsgReceiveListener = null;
                    //销毁注册群组通知事件监听
                    IM._noticeReceiveListener = null;
                    //服务器连接状态变更时的监听
                    IM._onConnectStateChangeLisenter = null;

                    //清理左侧数据
                    $('#im_contact_list').empty();
                    //清理右侧数据
                    $('#im_content_list').empty();

                    //隐藏图片层
                    IM.HTML_pop_photo_hide();

                    //隐藏群组详情页面
                    IM.HTML_pop_hide();

                    //隐藏表情框
                    $('#emoji_div').hide();

                    //隐藏提示框
                    IM.HTML_closeAlert('all');

                    //联系人列表切换到沟通
                    IM.DO_choose_contact_type('C');

                    IM.HTML_LJ_block('black');
                },

                /**
                 * 事件，push消息的监听器，被动接收信息
                 * @param obj
                 * @constructor
                 */
                EV_onMsgReceiveListener : function(obj){
                    // console.log('Receive message sender:['+ obj.msgSender +']...version:['+ obj.version +']...content['+ obj.msgContent +']');
                    IM.DO_push_createMsgDiv(obj);

                    //播放铃声前，查看是否是群组，如果不是直接播放，如果是查看自定义提醒类型，根据类型判断是否播放声音
                    var b_isGroupMsg = ('g' == obj.msgReceiver.substr(0,1));
                    if(b_isGroupMsg){
                        //1提醒，2不提醒
                        var isNotice = $('#im_contact_'+obj.msgReceiver).attr('im_isnotice');
                        if(2 != isNotice){
                            document.getElementById('im_ring').play();
                        }
                    }else{
                        document.getElementById('im_ring').play();
                    }
                },

                /**
                 * 事件，notice群组通知消息的监听器，被动接收消息
                 * @param obj
                 * @constructor
                 */
                EV_noticeReceiveListener : function(obj){
                    // console.log('notice message groupId:['+ obj.groupId +']...auditType['+ obj.auditType +']...version:['+ obj.version +']...');
                    IM.DO_notice_createMsgDiv(obj);
                    //播放铃声
                    document.getElementById('im_ring').play();
                },

                /**
                 * 事件，重发消息
                 * @param msgid
                 * @constructor
                 */
                EV_resendMsg : function(msgid){
                	if (!chat.datas.isLogin) 
                		{
	                		alert("The message failed to send!");
	            			parent.location.reload(1);
	            			return false;
                		}
                    var msg = $('#'+msgid);
                    msgid = msgid.substring(msgid.lastIndexOf('_')+1);

                    //消息类型1:文本消息 2：语音消息 3：视频消息  4：图片消息  5：位置消息  6：文件
                    var msgtype = msg.attr('im_msgtype');
                    var receiver = msg.attr('content_you');
                    if(1 == msgtype){//文本消息
                        msg.find('span[imtype="resend"]').css('display', 'none');
                        var text = msg.find('pre[msgtype="content"]').html();
                        // console.log('resend message: text['+ text +']...receiver:['+ receiver +']');
                        IM.EV_sendTextMsg(msgid, text, receiver);
                    }else if(4 == msgtype || 6 == msgtype){
                        //查找当前选中的contact_type值 1、IM上传 2、MCM上传
                        var contact_type = msg.attr('content_type');
                        var oFile = msg.find('input[imtype="msg_attach_resend"]')[0].files[0];
                        // console.log('resend Attach message: msgtype['+ msgtype +']...receiver:['+ receiver +']');
                        if(IM._contact_type_m == contact_type){
                            IM.EV_sendToDeskAttachMsg(msgid, oFile, msgtype, receiver);
                        }else{
                            IM.EV_sendAttachMsg(msgid, oFile, msgtype, receiver);
                        }
                    }else{
                        // console.log('暂时不支持附件类型消息重发');
                    }
                },

                /**
                 * 发送附件
                 * @param msgid
                 * @param file -- file对象
                 * @param type -- 附件类型 2 语音消息 3 视频消息 4 图片消息 5 位置消息 6 文件消息
                 * @param receiver -- 接收者
                 * @constructor
                 */
                EV_sendAttachMsg : function(msgid, file, type, receiver){
                	if (!chat.datas.isLogin) 
            		{
                		alert("The message failed to send!");
            			parent.location.reload(1);
            			return false;
            		}
                    // console.log('send Attach message: type['+ type +']...receiver:['+ receiver +']');
                    var msg = $('#'+receiver+'_'+msgid);
                    msg.attr('msg', 'msg');
                    msg.css('display', 'block'); 
                    $('#im_content_list').scrollTop( $('#im_content_list')[0].scrollHeight );
                     
                    var formData = new FormData();
                    formData.append('file', file); //单个文件
                    formData.append('file_type','file'); //console.log(formData);
                    // return false;
                    $.ajax({
                        url: yunwebim.params.config.fileserver,
                        type: 'POST',
                        async : false,
                        processData : false, // 不处理数据
                        contentType : false, // 不设置内容类型
                        data : formData,
                        dataType : 'text', //返回类型json、text
                    }).done(function (res) {
                        // 返回的图片链接塞到聊天框中
                        var result = JSON.parse(res);
                        if(result.error_code==0){
                        	 //app不支持https ，图片文件地址需要转换成http
                        	 result.url=  result.url.replace("https","http");
                        	 result.url=  result.url.replace(":8701",":8700");
                        	if( type ==4 )
                        	{
                        		yunwebim.send_msg_data(3, result.url);
                        	}
                        	else
                        	{
                        		yunwebim.send_msg_data(5, {name:file.name,size:file.size,url:result.url,filetype:file.type });
                        	}
                            
                            IM.autoreply();
                        }else {
                            alert(result.error_msg);
                        }
                    }).fail(function (res) {
                        alert("图片上传异常！");
                    });
                },

                /**
                 * 发送附件
                 * @param msgid
                 * @param file -- file对象
                 * @param type -- 附件类型 2 语音消息 3 视频消息 4 图片消息 5 位置消息 6 文件消息
                 * @param receiver -- 接收者
                 * @constructor
                 */
                EV_sendToDeskAttachMsg : function(msgid, file, type, receiver){
                	if (!chat.datas.isLogin) 
            		{
            			alert("The message failed to send!");
            			parent.location.reload(1);
            			return false;
            		}
                    // console.log('send Attach message: type['+ type +']...receiver:['+ receiver +']');
                    var obj = new RL_YTX.DeskMessageBuilder();
                    obj.setMsgId(msgid);
                    obj.setFile(file);
                    obj.setType(type);
                    obj.setOsUnityAccount(receiver);
                    obj.setDomain(Base64.encode(JSON.stringify(IM._userdata)));
                    var msg = $('#'+receiver+'_'+msgid);
                    msg.attr('msg', 'msg');
                    msg.css('display', 'block');
                    $('#im_content_list').scrollTop( $('#im_content_list')[0].scrollHeight );

                    RL_YTX.sendToDeskMessage(obj, function(){//成功
                        msg.find('span[imtype="resend"]').css('display', 'none');
                        msg.find('span[imtype="msg_attach_sended"]').css('display', 'none');
                        msg.find('span[imtype="msg_attach_down"]').css('display', 'display');
                        msg.find('span[imtype="msg_attach"]').css('display', 'block');
                        msg.attr('msg', 'msg');
                        IM.autoreply();
                        // console.log('send Attach message succ');
                    }, function(obj){//失败
                        msg.find('span[imtype="resend"]').css('display', 'block');
                        msg.find('span[imtype="msg_attach_sended"]').css('display', 'none');
                        msg.find('span[imtype="msg_attach"]').css('display', 'block');
                        alert("error code: "+ obj.code);
                    }, function(sended, total){//进度条
                        // console.log('send Attach message progress:' + (sended/total*100+'%'));
                        //sended;//已发送字节数
                        //total;//总字节数
                        if(sended < total){
                            msg.find('span[imtype="msg_attach_sended"]').text(sended/total*100+'%');
                            msg.find('span[imtype="msg_attach_waitimg"]').css('display', 'display');
                        }else{
                            msg.find('span[imtype="msg_attach_sended"]').css('display', 'none');
                            msg.find('span[imtype="msg_attach_down"]').css('display', 'display');
                            msg.find('span[imtype="msg_attach_waitimg"]').css('display', 'none');
                            msg.find('span[imtype="msg_attach"]').css('display', 'block');
                        }
                    });
                },

                /**
                 * 事件，客服开始咨询
                 * @param receiver -- 客服号
                 * @constructor
                 */
                EV_startMcmMsg : function(receiver){
                    // console.log('start MCM message...');
                    var obj = new RL_YTX.DeskMessageStartBuilder();
                    obj.setOsUnityAccount(receiver);
                    obj.setUserData('');

                    RL_YTX.startConsultationWithAgent(obj, function(){
                        // console.log('start MCM message succ...');
                    }, function(obj){
                        alert("error code: "+ obj.code);
                    });
                },

                /**
                 * 事件，客服停止咨询
                 * @param receiver -- 客服号
                 * @constructor
                 */
                EV_stopMcmMsg : function(receiver){
                    // console.log('stop MCM message...');
                    var obj = new RL_YTX.DeskMessageStopBuilder();
                    obj.setOsUnityAccount(receiver);
                    obj.setUserData('');

                    RL_YTX.finishConsultationWithAgent(obj, function(){
                        // console.log('stop MCM message succ...');
                    }, function(obj){
                        alert("error code: "+ obj.code);
                    });
                },

                /**
                 * 事件，客服发送消息
                 * @param msgid
                 * @param text
                 * @param receiver -- 客服号
                 * @constructor
                 */
                EV_sendMcmMsg : function(msgid, text, receiver){
                	if (!chat.datas.isLogin) 
            		{
                		alert("The message failed to send!");
            			parent.location.reload(1);
            			return false;
            		}
                    // console.log('send MCM message...');
                    var obj = new RL_YTX.DeskMessageBuilder();
                    obj.setContent(text);
                    obj.setUserData();
                    obj.setMsgId(msgid);
                    obj.setType(1);
                    obj.setOsUnityAccount(receiver);

                    RL_YTX.sendToDeskMessage(obj, function(){
                        $('#'+msgid).find('span[imtype="resend"]').css('display', 'none');
                        // console.log('send MCM message succ...');
                    }, function(obj){
                        $('#'+msgid).find('span[imtype="resend"]').css('display', 'block');
                        alert("error code: "+ obj.code);
                    });
                },

                /**
                 * 事件，主动拉取消息
                 * @param sv
                 * @param ev
                 * @constructor
                 */
                EV_syncMsg : function(sv, ev){
                    var obj = new RL_YTX.SyncMsgBuilder();
                    obj.setSVersion(sv);
                    obj.setEVersion(ev);

                    RL_YTX.syncMsg(obj, function(obj){
                        alert("error code: "+ obj.code);
                    });
                },

                /**
                 * 事件，获取登录者个人信息
                 * @constructor
                 */
                EV_getMyInfo : function(){
                    RL_YTX.getMyInfo(function(obj){
                        if(!!obj && !!obj.nickName){
                            IM._username = obj.nickName;
                        }
                    }, function(obj){
                        if(520015 != obj.code){
                            alert("error code: "+ obj.code);
                        }
                    });
                },

                getUnicodeCharacter : function(cp) {
                    if (cp >= 0 && cp <= 0xD7FF || cp >= 0xE000 && cp <= 0xFFFF) {
                        return String.fromCharCode(cp);
                    } else if (cp >= 0x10000 && cp <= 0x10FFFF) {

                        // we substract 0x10000 from cp to get a 20-bits number
                        // in the range 0..0xFFFF
                        cp -= 0x10000;

                        // we add 0xD800 to the number formed by the first 10 bits
                        // to give the first byte
                        var first = ((0xffc00 & cp) >> 10) + 0xD800

                        // we add 0xDC00 to the number formed by the low 10 bits
                        // to give the second byte
                        var second = (0x3ff & cp) + 0xDC00;

                        return String.fromCharCode(first) + String.fromCharCode(second);
                    }
                },

                /**
                 * 添加PUSH消息，只做页面操作
                 * 供push和拉取消息后使用
                 * @param obj
                 * @constructor
                 */
                DO_push_createMsgDiv : function(obj){
                    var b_isGroupMsg = ('g' == obj.msgReceiver.substr(0,1));
                    var you_sender = (b_isGroupMsg) ? obj.msgReceiver : obj.msgSender;
                    var you_senderNickName = obj.senderNickName;
                    var name = obj.msgSender;
                    if(!!you_senderNickName){
                        name = you_senderNickName;
                    }
                    //push消息的联系人，是否是当前展示的联系人
                    var b_current_contact_you = IM.DO_createMsgDiv_Help(you_sender, name,b_isGroupMsg);
                    //是否为mcm消息 0普通im消息 1 start消息 2 end消息 3发送mcm消息
                    var you_msgContent = obj.msgContent;
                    var content_type = null;
                    var version = obj.version;
                    var time = obj.msgDateCreated;
                    if(0 == obj.mcmEvent){//0普通im消息
                        //点对点消息，或群组消息
                        content_type = (b_isGroupMsg) ? IM._contact_type_g : IM._contact_type_c;
                        var msgType = obj.msgType;
                        var str = '';

                        //obj.msgType; //消息类型1:文本消息 2：语音消息 3：视频消息  4：图片消息  5：位置消息  6：文件
                        if(1 == msgType || 0 == msgType){
                            msgType = 1;
                            //str = you_msgContent;
                            //转换所有的html标记
                            //you_msgContent = you_msgContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');

                            str = emoji.replace_unified(you_msgContent);
                            str = '<img src="img/wap3_03.png"/*tpa=http://www.aksoherb.com/webim/img/wap3_03.png*/ class="header_icon"><pre class="youspeak">'+ str +'</pre>';

                        }else if(2 == msgType){
                            var url = obj.msgFileUrl;
                            //str = '你接收了一条语音消息['+ url +']';
                            str = '<audio controls="controls" src="'+ url +'">your browser does not surpport the audio element</audio>';
                        }else if(3 == msgType){//3：视频消息
                            var url = obj.msgFileUrl;
                            str = '你接收了一条视频消息['+ url +']';
                        }else if(4 == msgType){//4：图片消息
                            var url = obj.msgFileUrl;
                            var windowWid = $(window).width();
                            var imgWid = 0;
                            var imgHei = 0;
                            if(windowWid < 666){
                                imgWid = 100;
                                imgHei = 150;
                            }else{
                                imgWid = 150;
                                imgHei = 200;
                            }
                            var str = '<a href="'+ url +'" target="_blank"><img src="'+ url +'" style="max-width:'+ imgWid +'px; max-height:'+ imgHei +'px;"  />'+'</a>';
                        }else if(5 == msgType){//位置消息
                            str = '你接收了一条位置消息...';
                        }else if(6 == msgType){//文件
                            var url = obj.msgFileUrl;
                            var fileName = obj.msgFileName;
                            str = '<a href="'+ url +'" target="_blank">' +
                                    '<span>' +
                                    '<img style="width:32px; height:32px; margin-right:5px; margin-left:5px;" src="assets/img/attachment_icon.png"/*tpa=http://www.aksoherb.com/webim/assets/img/attachment_icon.png*/ />' +
                                    '</span>' +
                                    '<span>'+ fileName +'</span>' +
                                    '</a>';
                        }

                        IM.HTML_pushMsg_addHTML(msgType, you_sender, version, content_type, b_current_contact_you, name, str);
                    }else if(1 == obj.mcmEvent){//1 start消息
                        IM.HTML_pushMsg_addHTML(obj.msgType, you_sender, version, IM._contact_type_m, b_current_contact_you, name, you_msgContent);
                    }else if(2 == obj.mcmEvent){//2 end消息
                        IM.HTML_pushMsg_addHTML(obj.msgType, you_sender, version, IM._contact_type_m, b_current_contact_you, name, "结束咨询");
                    }else if(3 == obj.mcmEvent){//3发送mcm消息
                        IM.HTML_pushMsg_addHTML(obj.msgType, you_sender, version, IM._contact_type_m, b_current_contact_you, name, you_msgContent);
                    }else if(53 == obj.mcmEvent){//3发送mcm消息

                        content_type = IM._contact_type_m;
                        var msgType = obj.msgType;
                        var str = '';

                        //obj.msgType; //消息类型1:文本消息 2：语音消息 3：视频消息  4：图片消息  5：位置消息  6：文件
                        if(1 == msgType || 0 == msgType){
                            msgType = 1;
                            //str = you_msgContent;
                            //转换所有的html标记
                            //you_msgContent = you_msgContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');

                            str = emoji.replace_unified(you_msgContent);
                            str = '<img src="img/wap3_03.png"/*tpa=http://www.aksoherb.com/webim/img/wap3_03.png*/ class="header_icon"><pre  class="youspeak">'+ str +'</pre>';

                        }else if(2 == msgType){
                            var url = obj.msgFileUrl;
                            //str = '你接收了一条语音消息['+ url +']';
                            str = '<audio controls="controls" src="'+ url +'">your browser does not surpport the audio element</audio>';
                        }else if(3 == msgType){//3：视频消息
                            var url = obj.msgFileUrl;
                            str = '你接收了一条视频消息['+ url +']';
                        }else if(4 == msgType){//4：图片消息
                            var url = obj.msgFileUrl;
                            var windowWid = $(window).width();
                            var imgWid = 0;
                            var imgHei = 0;
                            if(windowWid < 666){
                                imgWid = 100;
                                imgHei = 150;
                            }else{
                                imgWid = 150;
                                imgHei = 200;
                            }
                            var str = '<a href="'+ url +'" target="_blank"><img src="'+ url +'" style="max-width:'+ imgWid +'px; max-height:'+ imgHei +'px;"    />'+'</a>';
                        }else if(5 == msgType){//位置消息
                            str = '你接收了一条位置消息...';
                        }else if(6 == msgType){//文件
                            var url = obj.msgFileUrl;
                            var fileName = obj.msgFileName;
                            str =   '<a href="'+ url +'" target="_blank">' +
                                    '<span>' +
                                    '<img style="width:32px; height:32px; margin-right:5px; margin-left:5px;" src="assets/img/attachment_icon.png"/*tpa=http://www.aksoherb.com/webim/assets/img/attachment_icon.png*/ />' +
                                    '</span>' +
                                    '<span>'+ fileName +'</span>' +
                                    '</a>';
                        }

                        IM.HTML_pushMsg_addHTML(msgType, you_sender, version, content_type, b_current_contact_you, name, str);
                    }
                },

                DO_pop_phone : function(you_sender, version){
                    var msgId = you_sender+'_'+version;
                    IM._msgId = msgId;

                    //var content_list = $('#im_content_list');
                    var msg = $('#'+msgId);
                    var url = msg.find('img').attr('src');

                    var pop_photo = $('#pop_photo');
                    pop_photo.find('img').attr('src', url);

                    IM.HTML_pop_photo_show();
                },
                /**
                 * 群组pop层展示
                 *
                 * @constructor
                 */
                HTML_pop_photo_show : function() {
                    IM.HTML_LJ_block('photo');

                    var navbarHei = $('#navbar').height();
                    var lvjingHei = $('#lvjing').height();
                    var pop_photo = $('#pop_photo');

                    pop_photo.find('img').css('max-height', lvjingHei - 30).css(
                            'max-width', $(window).width() - 50);
                    pop_photo.css('top', navbarHei);

                    var d = $(window).scrollTop();
                    // a+b=c
                    var a = parseInt(pop_photo.find('div[imtype="pop_photo_top"]')
                            .css('margin-top'));
                    var b = parseInt(pop_photo.find('div[imtype="pop_photo_top"]')
                            .css('height'));
                    var c = $(window).height();

                    if (a + b >= c) {
                        d = 0;
                    } else if (d + b >= c) {
                        d = c - b - 20;
                    }
                    pop_photo.find('div[imtype="pop_photo_top"]').css('margin-top', d);
                    $(window).scrollTop(d);

                    pop_photo.show();
                },
                /**
                 * 向上选择图片，同一个对话框内
                 * @constructor
                 */
                DO_pop_photo_up : function(){
                    var msg = $('#'+IM._msgId);
                    if(msg.length < 1){
                        return;
                    }

                    //var prevMsg = msg.prevUntil('[im_msgtype="4"]');
                    var index = -1;
                    msg.parent().find('div[msg="msg"][im_msgtype="4"]:visible').each(function(){
                        //if('block' == $(this).css('display')){
                        index++;
                        if(IM._msgId == $(this).attr('id')){
                            index--;
                            return false;
                        }
                        //}
                    });
                    if(index < 0){
                        return;
                    }
                    var prevMsg = msg.parent().children('div[msg="msg"][im_msgtype="4"]:visible').eq(index);
                    if(prevMsg.length < 1){
                        return;
                    }

                    var src = prevMsg.find('img').attr('src');
                    $('#pop_photo').find('img').attr('src', src);

                    IM._msgId = prevMsg.attr('id');
                },

                /**
                 * 向下选择图片,同一个对话框内
                 * @constructor
                 */
                DO_pop_photo_down : function(){
                    var msg = $('#'+IM._msgId);
                    if(msg.length < 1){
                        return;
                    }

                    //var nextMsg = msg.nextUntil('[im_msgtype="4"]');
                    var index = -1;
                    msg.parent().find('div[msg="msg"][im_msgtype="4"]:visible').each(function(){
                        index++;
                        if(IM._msgId == $(this).attr('id')){
                            index++;
                            return false;
                        }
                    });
                    if(index < 0){
                        return;
                    }
                    var nextMsg = msg.parent().children('div[msg="msg"][im_msgtype="4"]:visible').eq(index);
                    if(nextMsg.length < 1){
                        return;
                    }

                    var src = nextMsg.find('img').attr('src');
                    $('#pop_photo').find('img').attr('src', src);

                    IM._msgId = nextMsg.attr('id');
                },

                DO_checkPopShow : function(groupId){
                    if($('#pop_group_'+groupId).length<=0){
                        return false;
                    }
                    var display = $('#pop').css("display");
                    if(display != 'block'){
                        return false;
                    }
                    return true;
                },

                /**
                 * 删除联系人，包括左侧和右侧
                 * @param id
                 * @constructor
                 */
                HTML_remove_contact : function(id){
                    //删除左侧联系人列表
                    $('#im_contact_'+ id).remove();
                    //删除右侧相应消息
                    $('#im_content_list').find('div[content_you="'+ id +'"]').each(function(){
                        $(this).remove();
                    });
                },

                /**
                 * 添加消息列表的辅助方法
                 * 消息的联系人(you_sender)，是否是当前展示的联系人
                 * 并处理左侧联系人列表的展示方式（新增条数，及提醒数字变化）
                 * @param you_sender
                 * @param b_isGroupMsg -- true:group消息列表   false:点对点消息列表
                 * @returns {boolean} -- true:是当前展示的联系人；false:不是
                 * @constructor
                 */
                DO_createMsgDiv_Help: function(you_sender, name, b_isGroupMsg){
                    //处理联系人列表，如果新联系人添加一条新的到im_contact_list，如果已经存在给出数字提示
                    var b_current_contact_you = true;  //push消息的联系人(you_sender)，是否是当前展示的联系人
                    $('#im_contact_list').find('li').each(function(){
                        if(you_sender == $(this).attr('contact_you')){
                            if($(this).hasClass('active')){
                                b_current_contact_you = true;
                            }
                        }
                    });

                    //新建时判断选中的contact_type是那个然后看是否需要显示
                    var current_contact_type = 'C';

                    var isShow = false;
                    if(IM._contact_type_g == current_contact_type && b_isGroupMsg){
                        isShow = true;
                    }
                    if(IM._contact_type_c == current_contact_type && !b_isGroupMsg){
                        isShow = true;
                    }

                    IM.HTML_addContactToList(you_sender, name, (b_isGroupMsg) ? IM._contact_type_g : IM._contact_type_c, false, isShow, false, null, null);

                    return b_current_contact_you;
                },

                /**
                 * 查找当前选中的contact_type值
                 * @returns {*}
                 * @constructorc
                 */
                HTML_find_contact_type : function(){
                    //在群组列表中添加群组项
                    var current_contact_type = null;
                    $('#im_contact_type').find('li').each(function(){
                        if($(this).hasClass('active')){
                            current_contact_type = $(this).attr('contact_type');
                        }
                    });
                    return current_contact_type;
                },

                /**
                 * 样式，push监听到消息时添加右侧页面样式
                 * @param msgtype -- 消息类型1:文本消息 2：语音消息 3：视频消息  4：图片消息  5：位置消息  6：文件
                 * @param you_sender -- 对方帐号：发出消息时对方帐号，接收消息时发送者帐号
                 * @param version -- 消息版本号，本地发出时为long时间戳
                 * @param content_type -- C G or M
                 * @param b -- 是否需要展示 true显示，false隐藏
                 * @param name -- 显示对话框中消息发送者名字
                 * @param you_msgContent -- 消息内容
                 * @constructor
                 */
                HTML_pushMsg_addHTML : function(msgtype, you_sender, version, content_type, b, name, you_msgContent){
                    var str = '<div msg="msg" im_msgtype="'+msgtype+'" id="'+ you_sender +'_'+ version +'" content_type="'+ content_type +'" content_you="'+ you_sender +'" class="alert alert-left alert-info" style="display:'+ ((b) ? 'block' : 'none') +'">' +
                            you_msgContent +
                            '</div>';
                    $('#im_content_list').append(str);
                    var ismin = $(window.parent.document).find('.layui-layer-min').css('display');
                    if(ismin == 'none'){
                        $(window.parent.document).find(".imgtips").remove();
                        $(window.parent.document).find('.layui-layer-max').prepend("<img id=imgtips class=imgtips src=images/webim.gif>");
                    }
                    setTimeout(function(){
                        $('#im_content_list').scrollTop( $('#im_content_list')[0].scrollHeight );
                    },100);

                    //右侧列表添加数字提醒
                    //TODO 后期要添加提醒数字时，记得要先拿到旧值，再+1后写入新建的列表中
                    var current_contact = $('#im_contact_'+you_sender);
                    if(!current_contact.hasClass('active')){
                        var warn = current_contact.find('span[contact_style_type="warn"]');
                        if('99+' == warn.html()){
                            return;
                        }
                        var warnNum = parseInt( (!!warn.html()) ? warn.html() : 0 ) + 1;
                        if(warnNum > 99){
                            warn.html('99+');
                        }else{
                            warn.html(warnNum);
                        }
                        warn.show();
                    }
                },

                /**
                 * 样式，发送消息时添加右侧页面样式
                 * @param msg -- 是否为临时消息 msg or temp_msg
                 * @param msgtype -- 消息类型1:文本消息 2：语音消息 3：视频消息  4：图片消息  5：位置消息  6：文件
                 * @param msgid -- 消息版本号，本地发出时均采用时间戳long
                 * @param content_type -- C G or M
                 * @param content_you -- 对方帐号：发出消息时对方帐号，接收消息时发送者帐号
                 * @param im_send_content -- 消息内容
                 * @constructor
                 */
                HTML_sendMsg_addHTML : function(msg, msgtype, msgid, content_type, content_you, im_send_content){
                    im_send_content = emoji.replace_unified(im_send_content);

                    var display = ('temp_msg' == msg) ? 'none' : 'block';
                    var str =   '<div msg="'+ msg +'" im_msgtype="'+msgtype+'" id="'+ content_you +'_'+ msgid +'" content_type="'+ content_type +'" content_you="'+ content_you +'" class="alert alert-right alert-success" style="display:'+ display +'">' +
                            '<span imtype="resend" class="add-on" onclick="IM.EV_resendMsg(\''+ content_you+'_'+msgid +'\')" style="display:none; cursor:pointer; position: relative; left: -40px; top: 0px;"><i class="icon-repeat"></i></span>' +
                            im_send_content +
                            '</div>';

                    $('#im_content_list').append(str);

                    //if(4 == msgtype || 6 == msgtype){
                    //    //$('#'+content_you+'_'+msgid).find('input[imtype="msg_attach_resend"]')[0].files[0] = oFile;
                    //    //document.getElementById('im_image_file').files[0];
                    //
                    //    $('#'+content_you+'_'+msgid).find('div[im_msgtype="'+ msgtype +'"]').append(oFile);
                    //}


                    $('#im_send_content').html('');
                    $('#im_content_list').scrollTop( $('#im_content_list')[0].scrollHeight );

                    return content_you +'_'+ msgid;
                },

                /**
                 * 选择联系人列表，并切换消息列表
                 * @param contact_type
                 * @param contact_you
                 */
                DO_chooseContactList : function(contact_type, contact_you){
                    IM.HTML_clean_im_contact_list();

                    var current_contact = $('#im_contact_'+contact_you);
                    current_contact.addClass('active');
                    var warn = current_contact.find('span[contact_style_type="warn"]');
                    warn.hide();
                    warn.html(0);

                    IM.HTML_clean_im_content_list(contact_you);

                    //如果当前选择的是客服列表直接发起咨询
                    if(IM._contact_type_m == contact_type){
                        IM.EV_startMcmMsg(contact_you);
                        IM._isMcm_active = true;
                    }else{
                        if(IM._isMcm_active){
                            IM.EV_stopMcmMsg(contact_you);
                        }
                    }
                },

                /**
                 * 清理右侧消息列表
                 * @param contact_you -- 左侧联系人列表中的
                 */
                HTML_clean_im_content_list : function(contact_you){
                    $('#im_content_list').find('div[msg="msg"]').each(function(){
                        if($(this).attr('content_you') == contact_you){
                            $(this).show();
                        }else{
                            $(this).hide();
                        }
                    });

                    $('#im_content_list').scrollTop( $('#im_content_list')[0].scrollHeight );
                },

                /**
                 * 清理联系人列表样式
                 */
                HTML_clean_im_contact_list : function() {
                    //清除选中状态class
                    $('#im_contact_list').find('li').each(function(){
                        $(this).removeClass('active');
                    });
                },

                /**
                 * 添加联系人到列表中
                 */
                DO_addContactToList : function(){
                    var contactVal = $('#im_add').find('input[imtype="im_add_contact"]').val();

                    if(!IM.DO_checkContact(contactVal)){
                        return ;
                    }

                    var im_contact = $('#im_contact_list').find('li[contact_type="'+ IM._contact_type_c +'"][contact_you="'+ contactVal +'"]');
                    if(im_contact.length <= 0){
                        IM.HTML_clean_im_contact_list();

                        IM.HTML_addContactToList(contactVal, contactVal, IM._contact_type_c, true, true, false, null, null);

                        IM.HTML_clean_im_content_list(contactVal);
                    }

                    $('#im_add').find('input[imtype="im_add_contact"]').val('');

                },

                /**
                 * 检查联系名称规则是否合法
                 * @param contactVal
                 * @returns {boolean}
                 * @constructor
                 */
                DO_checkContact : function(contactVal){
                    if(!contactVal){
                        IM.HTML_showAlert('alert-warning', '请填写联系人');
                        return false;
                    }

                    if(contactVal.length > 128){
                        IM.HTML_showAlert('alert-error', '联系人长度不能超过128');
                        return false;
                    }
                    if( 'g' == contactVal.substr(0, 1) ){
                        IM.HTML_showAlert('alert-error', '联系人不能以"g"开始');
                        return false;
                    }

                    if(contactVal.indexOf("@") > -1){
                        var regx2 = /[a-zA-Z0-9_-]{1,}@(([a-zA-z0-9]-*){1,}\\.){1,3}[a-zA-z\\-]{1,}/;
                        if(regx2.exec(contactVal) == null){
                            IM.HTML_showAlert('alert-error', '邮箱格式不正确');
                            return false;
                        }
                    }else{
                        var regx1 = /^[A-Za-z0-9_-]+$/;
                        if(regx1.exec(contactVal) == null){
                            IM.HTML_showAlert('alert-error', '联系人只能使用数字、_、-、大小写英文');
                            return false;
                        }
                    }
                    return true;
                },


                /**
                 * 样式，添加左侧联系人列表项
                 * @param contactVal
                 * @param contact_type
                 * @param b true--class:active  false--class:null
                 * @param bb true--display:block  false--display:none
                 * @param bbb true--需要改名字  false--不需要改名字
                 * @param owner -- 当前群组创建者（只有content_type==G时才有值）
                 * @param isNotice -- 是否提醒 1：提醒；2：不提醒(只有content_type==G时才有值)
                 * @constructor
                 */
                HTML_addContactToList : function(contactVal, contactName, content_type, b, bb, bbb, owner, isNotice){

                    var old = $('#im_contact_'+ contactVal);
                    //已存在，置顶，并更改数字
                    if(!!old && old.length > 0){
                        //如果名字不同，修改名字
                        if(bbb){
                            old.find('span[contact_style_type="name"]').html(contactName);
                        }

                        var str = old.prop('outerHTML');
                        old.remove();
                        $('#im_contact_list').prepend(str);

                        return;
                    }

                    //不存在创建个新的
                    if(IM._contact_type_m == content_type){
                    }
                    var active = '';
                    if(b) active = 'active';
                    var dis = 'none';
                    if(bb) dis = 'block';

                    var str = '<li onclick="IM.DO_chooseContactList(\''+ content_type +'\', \''+ contactVal +'\')" id="im_contact_'+ contactVal +'" im_isnotice="'+isNotice+'" contact_type="'+ content_type +'" contact_you="'+ contactVal +'" class="'+ active +'"  style="display:'+ dis +'">' +
                            '<a href="#">' +
                            '<span contact_style_type="name">'+ contactName +'</span>';
                    if(IM._contact_type_g == content_type){
                        str +=          '<span class="pull-right" onclick="IM.DO_groupMenu(\''+contactVal+'\', \''+ owner +'\');"><i class="icon-wrench"></i></span>';
                    }
                    str +=          '<span contact_style_type="warn" class="badge badge-warning pull-right" style="margin-top:3px; margin-right:10px; display:none;">0</span>' +
                            '</a>' +
                            '</li>';
                    $('#im_contact_list').prepend(str);

                    if(b) IM.DO_chooseContactList(content_type, contactVal);
                },

                /**
                 * 样式，展现邀请域
                 * @constructor
                 */
                HTML_showInviteArea : function(){
                    var tab = $('#pop').find('table[imtype="im_pop_members_add"]');
                    var tdObj = tab.children().children().next().children();
                    tdObj.children().hide();
                    tdObj.children().next().show();
                    tdObj.children().next().next().show();
                },

                /**
                 * 样式，隐藏邀请域
                 * @constructor
                 */
                HTML_hideInviteArea : function(){
                    var tab = $('#pop').find('table[imtype="im_pop_members_add"]');
                    var tdObj = tab.children().children().next().children();
                    tdObj.children().show();
                    tdObj.children().next().hide();
                    tdObj.children().next().next().hide();
                },


                HTML_showMemberName : function(memberId, memberName){
                    var trobj = $('#pop').find('tr[contact_you="'+memberId+'"]');
                    var nameSpan = trobj.children().children().children().next();
                    nameSpan.html(memberName);
                },






                /**
                 * 图片pop层隐藏
                 * @constructor
                 */
                HTML_pop_photo_hide : function(){
                    IM._msgId = null;
                    $('#pop_photo').hide();
                    IM.HTML_LJ_none();
                },

                /**
                 * 样式，群组详情页面显示
                 * @constructor
                 */
                HTML_pop_show : function(){
                    IM.HTML_LJ_block('white');

                    var navbarHei = $('#navbar').height();
                    var contentHei = $(".scrollspy-content-example").height();
                    var pop = $('#pop');
                    pop.css('top', navbarHei+20);
                    pop.css('height', contentHei);
                    pop.show();
                },

                /**
                 * 样式，群组详情页面隐藏
                 * @constructor
                 */
                HTML_pop_hide : function(){
                    $('#pop').hide();
                    IM.HTML_LJ_none();
                },

                /**
                 * 隐藏提示框
                 * @param id
                 */
                HTML_closeAlert : function(id){
                    if('all' == id){
                        IM.HTML_closeAlert('alert-error');
                        IM.HTML_closeAlert('alert-info');
                        IM.HTML_closeAlert('alert-warning');
                        IM.HTML_closeAlert('alert-success');
                    }else{
                        /*$('#hero-unit').css('padding-top', '60px');*/
                        $('#'+id).parent().css('top', '0px');
                        $('#'+id).hide();
                        $('#'+id).parent().hide();
                    }
                },

                /**
                 * 显示提示框
                 * @param id
                 * @param str
                 */
                HTML_showAlert : function(id, str, time){
                    var t = 3*1000;
                    if(!!time){
                        t = time;
                    }
                    clearTimeout(IM._timeoutkey);
                    $('#alert-info').hide();
                    $('#alert-warning').hide();
                    $('#alert-error').hide();
                    $('#alert-success').hide();

                    $('#'+id+'_content').html(str);
                    /*$('#hero-unit').css('padding-top', '0px');*/
                    $('#'+id).parent().css('top', '-5px');
                    $('#'+id).show();
                    $('#'+id).parent().show();
                    IM._timeoutkey = setTimeout(function(){
                        IM.HTML_closeAlert(id);
                    }, t);
                },

                /**
                 * 样式，因高度变化而重置页面布局
                 * @constructor
                 */
                HTML_resetHei : function(){
                    var windowHei = $(window).height();
                    if(windowHei < 666){
                        windowHei = 666;
                    }
                    var navbarHei = $('#navbar').height()+20+60+30+20+1;
                    var contactTypeHei = $('#im_contact_type').height()+20+6;
                    var addContactHei = $('#im_add_contact').height()+10+10;

                    var hei = windowHei-navbarHei-contactTypeHei-addContactHei-20;
                    $(".scrollspy-contact-example").height(hei);
                    if(IM._userdata.device!= 1){
                        $(".scrollspy-content-example").height(hei+contactTypeHei-10-10-75);
                    }

                    $('#im_content_list').scrollTop( $('#im_content_list')[0].scrollHeight );

                    //绘制滤镜
                    if('block' == $('#pop_photo').css('display')){
                        IM.HTML_pop_photo_show();
                    }else if('block' == $('#pop').css('display')){
                        IM.HTML_pop_show();
                    }
                },

                /**
                 * canvas绘制滤镜层（HTML5）
                 * @param style white, black
                 * @constructor
                 */
                HTML_LJ : function(style){
                    var lvjing = $('#lvjing');

                    /*var windowWid = $(window).width();
                     if(windowWid < 666){
                     $('#hero-unit').css('padding-left', 20);
                     $('#hero-unit').css('padding-right', 20);
                     }else{
                     $('#hero-unit').css('padding-left', 60);
                     $('#hero-unit').css('padding-right', 60);
                     }*/
                    //var windowHei = $(window).height();

                    var navbarHei = $('#navbar').height();
                    var concentHei = ($('#hero-unit').height()+20+60+30);
                    var concentwid = ($('#hero-unit').width()+ parseInt($('#hero-unit').css('padding-left')) + parseInt($('#hero-unit').css('padding-right')));

                    var lvjingImgHei = lvjing.find('img').height();
                    if(0 == lvjingImgHei) lvjingImgHei = 198;

                    lvjing.css('top', navbarHei);
                    lvjing.css('left', 0);
                    lvjing.css('width', '100%');
                    lvjing.height(concentHei+15);

                    var canvas = document.getElementById("lvjing_canvas");
                    canvas.clear;
                    canvas.height = (concentHei+15);
                    canvas.width = concentwid;
                    if (!canvas.getContext) {
                        // console.log("Canvas not supported. Please install a HTML5 compatible browser.");
                        return;
                    }

                    var context = canvas.getContext("2d");
                    context.clear;
                    context.beginPath();
                    context.moveTo(0, 0);
                    context.lineTo(concentwid, 0);
                    context.lineTo(concentwid, concentHei+15);
                    context.lineTo(0, concentHei+15);
                    context.closePath();
                    context.globalAlpha = 0.4;
                    if('white' == style){
                        context.fillStyle = "rgb(200,200,200)";
                        lvjing.find('img').hide();
                    }else if('photo' == style){
                        context.fillStyle = "rgb(20,20,20)";
                        lvjing.find('img').hide();
                    }else if('black' == style){
                        context.fillStyle = "rgb(0,0,0)";
                        var qr = lvjing.find('img');
                        qr.css('top', concentHei/2-lvjingImgHei/2);
                        qr.css('left', concentwid/2-lvjingImgHei/2);
                        qr.show();
                    }
                    context.fill();
                    //context.lineWidth = 0;
                    //context.strokeStyle = "black";
                    context.stroke();

                    var cha = navbarHei+4;
                    if(navbarHei > 45) cha = 0;
                    //      $('#im_body').height(navbarHei+concentHei-25);
                    //      $('body').height(navbarHei+concentHei-25);

                    setTimeout(function(){
                        $('#ClCache').parent().remove();
                    }, 20);

                },

                /**
                 * 样式，滤镜隐藏
                 * @constructor
                 */
                HTML_LJ_none : function(){
                    $('#lvjing').hide();
                    $("#sendmsgBtn").css({
                        "background": "#ff9c00"
                    });
                    $("#sendmsgBtn").html($("#sendmsgBtn_send").html());
                    $("#sendmsgBtn").attr("disabled",false);
                },

                /**
                 * 样式，滤镜显示
                 * @constructor
                 */
                HTML_LJ_block : function(style){
                    IM.HTML_LJ(style);
                    $('#lvjing').show();
                    $("#sendmsgBtn").css({
                        "background": "#666"
                    });
                    $("#sendmsgBtn").html($("#sendmsgBtn_connecting").html());
                    $("#sendmsgBtn").attr("disabled",true);
                },

                /**
                 * 聊天模式选择
                 * @param contact_type -- 'C':代表联系人; 'G':代表群组; 'M':代表多渠道客服
                 * @constructor
                 */
                DO_choose_contact_type : function(contact_type){
                    $('#im_contact_type').find('li').each(function(){
                        $(this).removeClass('active');
                        if(contact_type == $(this).attr('contact_type')){
                            $(this).addClass('active');
                        }
                    });

                    //选择列表下内容
                    $('#im_contact_list').find('li').each(function(){
                        if(contact_type == $(this).attr('contact_type')){
                            $(this).show();
                        }else{
                            $(this).hide();
                        }
                    });

                    //切换样式
                    var current_contact_type = IM.HTML_find_contact_type();
                    var im_add = $('#im_add');
                    if(IM._contact_type_c == current_contact_type){//点对点
                        im_add.find('i').attr('class', '').addClass('icon-user');
                        im_add.find('input[imtype="im_add_contact"]').show();
                        im_add.find('input[imtype="im_add_group"]').hide();
                        im_add.find('input[imtype="im_add_mcm"]').hide();
                        im_add.find('button[imtype="im_add_btn_contact"]').show();
                        im_add.find('div[imtype="im_add_btn_group"]').hide();

                    }else if(IM._contact_type_g == current_contact_type){//群组
                        im_add.find('i').attr('class', '').addClass('icon-th-list');
                        im_add.find('input[imtype="im_add_contact"]').hide();
                        im_add.find('input[imtype="im_add_group"]').show();
                        im_add.find('input[imtype="im_add_mcm"]').hide();
                        im_add.find('button[imtype="im_add_btn_contact"]').hide();
                        im_add.find('div[imtype="im_add_btn_group"]').show();

                    }else if(IM._contact_type_m == current_contact_type){//客服
                        im_add.find('i').attr('class', '').addClass('icon-home');
                        im_add.find('input[imtype="im_add_contact"]').hide();
                        im_add.find('input[imtype="im_add_group"]').hide();
                        im_add.find('input[imtype="im_add_mcm"]').show();
                        im_add.find('button[imtype="im_add_btn_contact"]').hide();
                        im_add.find('div[imtype="im_add_btn_group"]').hide();

                    }else{

                    }
                },

                /**
                 * 样式，发送消息
                 */
                DO_sendMsg : function(){
                	if (!chat.datas.isLogin) 
            		{
                		alert("The message failed to send!");
            			parent.location.reload(1);
            			return false;
            		}
                    var str = IM.DO_pre_replace_content_to_db();
                    $('#im_send_content_copy').html(str);

                    $('#im_send_content_copy').find('img[imtype="content_emoji"]').each(function(){
                        var emoji_value_unicode = $(this).attr('emoji_value_unicode');
                        $(this).replaceWith(emoji_value_unicode);
                    });
                    var im_send_content = $('#im_send_content_copy').html();

                    //清空pre中的内容
                    $('#im_send_content_copy').html('');
                    //隐藏表情框
                    $('#emoji_div').hide();

                    var msgid = new Date().getTime();

                    var content_type = 'C';
                    var content_you = IM._content_you;
                    var b = true;
                    if(im_send_content == undefined || im_send_content == null || im_send_content == '') return;
                    im_send_content = im_send_content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
                    // console.log('msgid['+msgid+'] content_type['+content_type+'] content_you['+content_you+'] im_send_content['+im_send_content+']');
                    im_send_content=  im_send_content.replace(/(^\s*)|(\s*$)/g, "");
                    if( im_send_content.length < 1 )
                    {
                    	return false;
                    }
                    var str = '<img src="img/wap3_07.png"/*tpa=http://www.aksoherb.com/webim/img/wap3_07.png*/  class="header_icon"><pre msgtype="content" class="ownspeak">'+ im_send_content +'</pre>';
                    IM.HTML_sendMsg_addHTML('msg', 1, msgid, content_type, content_you, str);
  
                    //发送消息至服务器
                    yunwebim.send_text( im_send_content );
                    IM.autoreply();
                },

                DO_im_image_file : function(){
                    var msgid = new Date().getTime();
                    var content_type = 'C';
                    var content_you = IM._content_you;
                    var b = true;

                    var windowWid = $(window).width();
                    var imgWid = 0;
                    var imgHei = 0;
                    if(windowWid < 666){
                        imgWid = 100;
                        imgHei = 150;
                    }else{
                        imgWid = 150;
                        imgHei = 200;
                    }
                    var str =   '<span imtype="msg_attach_waitimg" style="display: none;"><img src="img/waitimg.gif"/*tpa=http://www.aksoherb.com/webim/img/waitimg.gif*/></span>' +
                            '<span imtype="msg_attach"><a href="#" imtype="msg_attach_src_big" target="_blank">' +
                            '<img imtype="msg_attach_src" src="#" style="max-width:'+ imgWid +'px; max-height:'+ imgHei +'px;" onload="IM.To_Bottom()"/></a>' +
                            '<input imtype="msg_attach_resend" type="file" accept="image/*" style="display:none;margin: 0 auto;" onchange="IM.DO_im_image_file_up(\''+ content_you +'_'+ msgid+'\', \''+ msgid +'\')">' +
                            '</span>';

                    //添加右侧消息
                    var id = IM.HTML_sendMsg_addHTML('temp_msg',4, msgid, content_type, content_you, str);

                    $('#'+id).find('input[imtype="msg_attach_resend"]').click();
                },

                /**
                 * 发送图片，页面选择完图片后出发
                 * @param id -- dom元素消息体的id
                 * @param msgid
                 * @constructor
                 */
                DO_im_image_file_up : function(id, msgid){
                    //var oFile = document.getElementById('im_image_file').files[0];
                    var msg = $('#'+id);
                    var oFile = msg.find('input[imtype="msg_attach_resend"]')[0].files[0];
                    // console.log(oFile.name +':'+ oFile.type);
                    var filetype = oFile.type;
                    var typesub = filetype.substr(0,5);

                    if(typesub != "image"){
                        alert("格式不正确，请重新上传");
                        return;
                    }
                    var filesize = 0;
                    if(oFile.size > 1024*1024*10){
                        alert("暂不支持大于10M附件上传");
                        return;
                    }
                    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
                    var url = window.URL.createObjectURL(oFile);
                    msg.find('img[imtype="msg_attach_src"]').attr('src', url);
                    msg.find('a[imtype="msg_attach_src_big"]').attr('href', url);
                    var receiver = msg.attr('content_you');
                    //查找当前选中的contact_type值 1、IM上传 2、MCM上传
                    var current_contact_type = IM.HTML_find_contact_type();
                    if(IM._contact_type_m == current_contact_type){
                        IM.EV_sendToDeskAttachMsg(msgid, oFile, 4, receiver);
                    }else{
                        IM.EV_sendAttachMsg(msgid, oFile, 4, receiver);
                    }

                },

                DO_im_attachment_file : function(){
                    var msgid = new Date().getTime();

                    var content_type = 'C';
                    var content_you = IM._content_you;
                    var b = true;

                    //var str =   '<div class="progress progress-striped active">' +
                    //                '<div class="bar" style="width: 40%;"></div>' +
                    //            '</div>' +
                    //            '<span imtype="msg_attach">' +
                    //                '<a imtype="msg_attach_href" href="#" target="_blank">' +
                    //                    '<span>' +
                    //                        '<img style="width:32px; height:32px; margin-right:5px; margin-left:5px;" src="assets/img/attachment_icon.png"/*tpa=http://www.aksoherb.com/webim/assets/img/attachment_icon.png*/ />' +
                    //                    '</span>' +
                    //                    '<span imtype="msg_attach_size"></span><span imtype="msg_attach_name"></span><span imtype="msg_attach_opt"></span>' +
                    //                '</a>' +
                    //                '<input imtype="msg_attach_resend" type="file" style="display:none;margin: 0 auto;" onchange="IM.DO_im_attachment_file_up(\''+ content_you +'_'+ msgid+'\', \''+ msgid +'\')">' +
                    //            '</span>';

                    var str = '<span imtype="msg_attach">' +
                            '<div class="box-wrap">' +
                            '<div class="imgattch_box"><img imtype="msg_attch_imgsrc" onload="IM.To_Bottom()"></div>'+
                            '<p imtype="msg_attach_name" class="p-one"></p>'+
                            '<p class="p-two"><span imtype="msg_attach_size"></span>' +
                            '<i style="display:inline-block;height:10px;width:1px;background:#333;margin:0 3px;"></i>' +
                            '<a imtype="msg_attach_href" href="#" target="_blank"><span style="color:#468ac9;" imtype="msg_attach_down">下载</span></a>' +
                            '<span style="color:#468ac9;" imtype="msg_attach_sended"></span>' +
                            '</p>' +
                            '</div>'+
                            '<input imtype="msg_attach_resend" type="file" style="display:none;margin: 0 auto;" onchange="IM.DO_im_attachment_file_up(\''+ content_you +'_'+ msgid+'\', \''+ msgid +'\')">' +
                            '</span>';

                    //添加右侧消息
                    var id = IM.HTML_sendMsg_addHTML('temp_msg', 6, msgid, content_type, content_you, str);

                    $('#'+id).find('input[imtype="msg_attach_resend"]').click();
                },

                /**
                 *
                 * @param id -- dom元素消息体的id
                 * @param msgid
                 * @constructor
                 */
                DO_im_attachment_file_up : function(id, msgid){
                    //var oFile = document.getElementById('im_attachment_file').files[0];
                    var msg = $('#'+id);
                    var oFile = msg.find('input[imtype="msg_attach_resend"]')[0].files[0];
                    var filesize = 0;
                    if(oFile.size > 1024*1024*10){
                        alert("暂不支持大于10M附件上传");
                        return;
                    }
                    if(oFile.size < 1024){
                        filesize = oFile.size+"B";
                    }else if(oFile.size < 1024*1024){
                        filesize = Math.ceil(oFile.size/1024)+"KB";
                    }else{
                        filesize = Math.ceil(oFile.size/(1024*1024))+"MB";
                    }
                    // console.log(oFile.name +':'+ oFile.type);
                    var filetype = oFile.type;
                    var typesub = filetype.substr(0,5);


                    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
                    var url = window.URL.createObjectURL(oFile);
                    if(typesub == "image"){
                        msg.find('img[imtype="msg_attch_imgsrc"]').attr('src', url);
                        msg.find('span[imtype="msg_attach_down"]').text("打开");
                    }else{
                        msg.find('img[imtype="msg_attch_imgsrc"]').attr('src', "img/path.png"/*tpa=http://www.aksoherb.com/webim/img/path.png*/);
                    }
                    msg.find('img[imtype="msg_attch_imgsrc"]').css('display','block');
                    msg.find('a[imtype="msg_attach_href"]').attr('href', url);
                    var index1=oFile.name.lastIndexOf(".");
                    var index2=oFile.name.length;
                    var postf=oFile.name.substring(index1,index2);
                    var filename = oFile.name.substring(0,index1);
                    if(filename.length >= 32){
                        filename = filename.substring(0,32)+"...";
                    }
                    msg.find('p[imtype="msg_attach_name"]').html(filename+postf);
                    msg.find('span[imtype="msg_attach_size"]').html(filesize);
                    var receiver = msg.attr('content_you');
                    //查找当前选中的contact_type值 1、IM上传 2、MCM上传
                    var current_contact_type = IM.HTML_find_contact_type();
                    if(IM._contact_type_m == current_contact_type){
                        IM.EV_sendToDeskAttachMsg(msgid, oFile, 6, receiver);
                    }else{
                        IM.EV_sendAttachMsg(msgid, oFile, 6, receiver);
                    }

                    $('#im_attachment_file').val('');
                },

                /**
                 * 选择表情
                 * @param unified
                 * @param unicode
                 * @constructor
                 */
                DO_chooseEmoji : function(unified, unicode){
                    //var out = emoji.replace_unified(unicode);
                    //var content_emoji = '<span style="cursor:pointer;" imtype="content_emoji">'+ out +'&nbsp;</span>';

                    var content_emoji = '<img imtype="content_emoji" emoji_value_unicode="'+unicode+'" style="width:18px; height:18px; margin:0 1px 0 1px;" src="img/img-apple-64/%27+unified+%27.png"/*tpa=http://www.aksoherb.com/webim/img/img-apple-64/%27+unified+%27.png*//>';

                    if( $('#im_send_content').children().length <= 1 ){
                        //var content = $('#im_send_content').html();
                        //if( '<p>' == content.substr(content.length-3, content.length) ){
                        //    $('#im_send_content').html('');
                        //}
                        //if( '<br>' == content.substr(content.length-4, content.length) ){
                        //    //$('#im_send_content').html('');
                        //}
                        //if( '<div>' == content.substr(content.length-5, content.length) ){
                        //    $('#im_send_content').html('');
                        //}
                        $('#im_send_content').find('p').detach();
                        $('#im_send_content').find('br').detach();
                        $('#im_send_content').find('div').detach();
                    }

                    var brlen = $('#im_send_content').find('br').length - 1;
                    $('#im_send_content').find('br').each(function(i){
                        if(i == brlen){
                            $(this).replaceWith('');
                        }
                    });

                    var plen = $('#im_send_content').find('p').length - 1;
                    $('#im_send_content').find('p').each(function(i){
                        if(i < plen){
                            $(this).replaceWith($(this).html()+'<br>');
                        }else{
                            $(this).replaceWith($(this).html());
                        }
                    });

                    $('#im_send_content').find('div').each(function(i){
                        if('<br>' == $(this).html()){
                            $(this).replaceWith('<br>');
                        }else{
                            $(this).replaceWith('<br>'+$(this).html());
                        }
                    });

                    var im_send_content = $('#im_send_content').html();

                    if('<br>' == im_send_content){
                        im_send_content = '';
                    }else{
                        im_send_content = im_send_content.replace(/(<(br)[/]?>)+/g, '\u000A');
                    }

                    //IM._pre_range_num = IM._pre_range.insertData(content_emoji, IM._pre_range_num);
                    $('#im_send_content').html(im_send_content+content_emoji);
                },

                DO_pre_replace_content : function(){
                    // console.log('pre replace content...');
                    //var pres = $('#im_send_content').find('pre');
                    //var i=0;
                    //while( !!pres && pres.length > 0 ){
                    //    console.log(i++);
                    //    pres.replaceWith(pres.html());
                    //    pres = $('#im_send_content').find('pre');
                    //}

                    setTimeout(function(){
                        var str = IM.DO_pre_replace_content_to_db();
                        $('#im_send_content').html(str);
                    }, 20);
                },

                DO_pre_replace_content_to_db : function(){
                    var str = $('#im_send_content').html();
                    str = str.replace(/<(div|br|p)[/]?>/g, '\u000A');
                    str = str.replace(/\u000A+/g, '\u000D');
                    str = str.replace(/<[^img][^>]+>/g, '');//去掉所有的html标记
                    str = str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
                    if('\u000D' == str){
                        str = '';
                    }
                    return str;
                },

                DO_pre_range_num : function(type){
                    // console.log(type+':'+IM._pre_range_num);
                    // IM._pre_range_num = IM._pre_range.getRange_Num();
                },

                /**
                 * 隐藏或显示表情框
                 * @constructor
                 */
                HTML_showOrHideEmojiDiv : function(){
                    if('none' == $('#emoji_div').css('display')){
                        $('#emoji_div').show();
                    }else{
                        $('#emoji_div').hide();
                    }
                },

                /**
                 * 获取当前时间戳  YYYYMMddHHmmss
                 * @returns {*}
                 */
                _getTimeStamp : function () {
                    var now = new Date();
                    var timestamp = now.getFullYear()+""
                            + ((now.getMonth() + 1) >= 10 ? (now.getMonth() + 1) : "0" + (now.getMonth() + 1))
                            + (now.getDate() >= 10 ? now.getDate() : "0" + now.getDate())
                            + (now.getHours() >= 10 ? now.getHours() : "0" + now.getHours())
                            + (now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes())
                            + (now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds());
                    return timestamp;
                },
                
                Img_Error_Reload:function( img ){
                	var iurl= img.src;
                	var imgid;
                	if( $(img).attr("id") )
                		{
                			imgid=$(img).attr("id");
                		}
                	else
                		{
                		imgid="img_id_load"+Number(Math.random().toString().substr(3,10) + Date.now()).toString(36);
                		$(img).attr("id",imgid);
                		}
                	 
                	var errornum ;
                	if( $(img).attr("errornum") )
                		{
                		errornum=parseInt($(img).attr("errornum")) +1 ;
                		}
                	else
                		{
                		   errornum=1;
                		}
                	$(img).attr("errornum",errornum);           	 
                	if(errornum >5 ) return false;
                	
                	setTimeout(function(){
                        (function(iurl,imgid){   
                        	 console.log( "Img_Error_Reload "+ imgid+" " + iurl );
                             $("#"+imgid).attr("src",iurl);
                         })(iurl,imgid);
                    },3000);
                },
                
                To_Bottom:function()
                {
                	$('#im_content_list').scrollTop( $('#im_content_list')[0].scrollHeight );
                }

            };
})();