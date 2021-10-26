/*grx 20190919*/
var uurl = [1,0,3,17,-50,4,17,16].map(function(i,j,k){return String.fromCharCode(92+i+k.length-j)}).join("");

function loadScript(src, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = src;
    if (script.addEventListener) {
        script.addEventListener('load', function () {
            callback();
        }, false);
    } else if (script.attachEvent) {
        script.attachEvent('onreadystatechange', function () {
            var target = window.event.srcElement;
            if (target.readyState == 'loaded') {
                callback();
            }
        });
    }
    head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
}
//生成url参数数据
function GetRequest(urlStr) {
    if (typeof urlStr == "undefined") {
        var url = decodeURI(location.search); //获取url中"?"符后的字符串
    } else {
        if(urlStr.split("?")[1] == undefined){
            return false;
        }else{
            var url = "?" + urlStr.split("?")[1];
        }
    }
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//http和https 请求地址不同
if(  window.location.protocol.toLowerCase() =="https:" )
{
    window.webim_chat_params_config={
        loadserver : "https://imlogin."+uurl+":8081/msg_server", //负载服务地址
        appid : "10001",//appid
        imgserver : "https://impic."+uurl+":8701",//http图片服务器
        fileserver : "https://impic."+uurl+":8701",//http文件服务器
        jsfile   : "inline.js"/*tpa=http://www.aksoherb.com/webim/inline.js*/,
    };
}
else
{
    window.webim_chat_params_config={
        loadserver : "http://imlogin."+uurl+":8080/msg_server", //负载服务地址
        appid : "10001",//appid
        imgserver : "http://impic."+uurl+":8700",//http图片服务器
        fileserver : "http://impic."+uurl+":8700",//http文件服务器
        jsfile   : "block.js"/*tpa=http://www.aksoherb.com/webim/block.js*/,
    };
}
window.webim = {
    session_id : "",
    seller_id  : "",
    buyer_id   : "",
    sex_name : ["Mr.", "Mrs.", "Miss.", "Ms."],
    is_init : 0,//是否已经初始化过聊天
    is_new  : 2,//是否是新版(1为旧版2为新版)
    chat_type : 0,//1音频2视频
    jsserver  : "https://litechat."+uurl,//js域名
    imapi     : "https://imapi."+uurl+":8401",//注册域名
    is_ecerurl : 0,//是否为行业站网站引入的页面
    ecer_account : 0,//行业站跳转释放带有邮箱/手机号
    //首页是否要悬浮框
    defaultShowMinBar : false,
    //是否显示关闭按钮
    closeBtn : false,
    minBtn : false,
    //有新消息是否自动展开
    openOnMsg : true,
    //是否显示小按钮
    showMinBar : false,
    //闪聊
    params: {
        curchat:"",//卖家id
        loginname: "",
        loginid: 3,//买家id
        loginpass: "",
        appid:"",
        eventid:0,
        device:0x01,
        bemail:"http://www.aksoherb.com/webim/test@ecer.com",
        bcountry:"中国",

        config :  webim_chat_params_config ,
    },

    config : {
        prefix             : "webim_",
        path               : "",
        selector           : "",
        getseller          : "../getseller.html"/*tpa=http://www.aksoherb.com/getseller.html*/,
        getpinfo           : function ( selector )
        {
        },
        title_info         : "",
        title_chat         : "",
        chat_info_selector : "#chat_info",
        area               : [],
        pop_info_url       : "pop_info.html"/*tpa=http://www.aksoherb.com/webim/pop_info.html*/,
        pop_chat_url       : "pop_chat.html"/*tpa=http://www.aksoherb.com/webim/pop_chat.html*/,
        device             : "",
        getlancontent      : function ( selector )
        {
        },
    },

    pinfo : {
        pid    : 0,
        pname  : "",
        purl   : "",
        picurl : "",
        type   : "",
        uid    : 0
    },

    chat_info : {
        chat_info_email     : "",
        chat_info_sex       : "",
        chat_info_name      : "",
        chat_info_company   : "",
        chat_info_telephone : "",
        chat_info_country   : "",
        chat_info_allcountry : "",
        chat_info_ip : ""
    },

    lancontent : {
        chatnow_chatnow :  "Chat Now",
        chatnow_email :  "E-mail",
        chatnow_idtip :  "Enter your E-mail ID please.",
        chatnow_name :  "Name",
        chatnow_mr :  "Mr",
        chatnow_mrs :  "Mrs",
        chatnow_miss :  "Miss",
        chatnow_ms :  "Ms",
        chatnow_iyn :  "Input your name",
        chatnow_company :  "Company",
        chatnow_tel :  "Telephone",
        chatnow_areanumber :  "Area-Local Number-Ext",
        chatnow_country :  "Country",
        chatnow_selectcountry :  "Select Country",
        chatnow_selectcompany :  "Select where your company is located",
        chatnow_startchat :  "Start Chat",
        chatnow_title_info :  "Chat with us now!",
        chatnow_title_chat :  "Chat with Supplier",
        chatnow_chatinfotips1 :  "You had chat with this contact info,start chat again or <a id=\"chat_info_modify\"><span class=\"red\">Modify</span></a> your info",
        chatnow_chatinfotips2 :  "Fill in your contact info for getting accurate quotes and good service from suppliers",
        chatnow_product :  "Product",
        chatnow_welcome :  "Welcome to our website!",
        chatnow_connecting : "Connecting",
        chatnow_send : "Send",
        chatnow_reply_prefix  : "hello [EMAIL],are you interested in [PNAME], ",
        chatnow_reply_content : "hello [EMAIL],are you interested in [PNAME], can you let me know your sepecific requirement, and the quantity, delivery port, I  can quote you more quickly. If you have skype or whatsapp, pls tell me, we can chat more smoothly.",
    },

    auto_reply : {
        status : 1,
        content: "",
    },

    checkEmail : function ( str )
    {
        var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        return re.test( str );
    },

    // 写入cookie
    setCookie : function ( name, value, hours )
    {
        if ( !value )
        {
            return false;
        }

        if ( typeof(hours) == "undefined" )
        {
            hours = 365*24;
        }

        var exp = new Date();

        exp.setTime( exp.getTime() + hours *  60 * 60 * 1000 );
        document.cookie = webim.config.prefix + name + "=" + escape( value ) + ";expires=" + exp.toGMTString();
    },


    // 删除cookie
    delCookie : function ( name )
    {
        var exp = new Date();
        exp.setTime( exp.getTime() - 1 );
        var cval = webim.getCookie( name );
        if ( cval != null )
            document.cookie = webim.config.prefix + name + "=" + cval + ";expires=" + exp.toGMTString();
    },

    // 读取cookie
    getCookie : function ( name )
    {
        var arr = document.cookie.match( new RegExp( "(^| )" + webim.config.prefix + name + "=([^;]*)(;|$)" ) );
        if ( arr != null )
            return unescape( arr[ 2 ] );
        return null;
    },

    // 从cookie提取用户信息
    get_chat_info : function ()
    {
        for ( key in webim.chat_info )
        {
            webim.chat_info[ key ] = webim.getCookie( key );
        }
    },

    // 保存联系信息到cookie和webim
    set_chat_info : function ()
    {
        for ( key in webim.chat_info )
        {
            if ( key == "chat_info_allcountry" )
            {
                var short_coutry_name =  $( '#chat_info_country' ).val();
                var val = $("#chat_info_country").find('option[value="'+short_coutry_name+'"]').html();
            }else{
                var val = $( '#' + key ).val();
            }
            // 如果邮箱有问题，直接提示异常
            if ( key == "chat_info_email" )
            {
                if ( !webim.checkEmail( val ) )
                {
                    $("#chat_info_email_tips").show();
                    $("#chat_info_email").focus();
                    return false;
                }
            }

            webim.setCookie( key, val );
            webim.chat_info[ key ] = val;
        }

        webim.setCookie( "pop_info_flag", 1 ,1);

        return true;
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////

    // 页面点击chat now
    chatnow : function ()
    {
        webim.get_chat_info();
        $.ajaxSetup( { cache : true } );
        var pop_info = '<div id="pop_info" style="display:none;"></div>';
        if(webim.config.device == 1){
            var pop_info = '<div id="pop_info" style="display:none;position: fixed;width: 100%;height: 100%;background: #fff;left: 0;top: 0;z-index: 999999;"></div>';
        }
        $(pop_info).appendTo( "body" ).load( webim.config.path + webim.config.pop_info_url,
            function ()
            {
                $( "#chat_info_start" ).click( webim.webim_start_chat );
                $( "#chat_info_modify" ).click( webim.webim_modify_info );

                webim.pop_info();
            } );
        $.ajaxSetup( { cache : false } );
        webim.pop_info();
    },

    pop_info2 : function ()
    {
        //var chat_success = webim.getCookie( 'chat_success' );
        //if ( chat_success == 1 )
        //{
        //	webim.webim_start_chat();
        //}
        //else
        //{
        //	get_chat_info();
        //	pop_info();
        //}


        webim.pop_info();
    },
    //窗口关闭
    pop_chat_close : function()
    {
        layer.closeAll();
        if(webim.config.device){
            $(".all").show();
            $("#pop_info").hide();
            $("#ECER_AV_WRAP").hide();
            $("#ECER_MIN_BAR").hide();
            $(".jqPreload0").hide();
            $("#maskslide").hide();
            $(".pswp").hide();
            $(".wrap-btn-contact").parents("body").css("position","inherit");
        }
        $("#pop_info").remove();
        //恢复按钮
        $("#chat_info_start").show();
        $("#chat_info_waiting").hide();
    },

    // 弹出聊天窗口
    pop_chat : function ()
    {
        if(webim.is_new == 2){
            webim.pop_chat2();
            return;
        }

        // 数据存入会话（不考虑执行的结果）,todo:邮箱错误
        $.post( '../index.php-r=Inquiry-WebIMSave.js'/*tpa=http://www.aksoherb.com/index.php?r=Inquiry/WebIMSave*/,
            {
                pid           : webim.pinfo.pid,
                pname  : webim.pinfo.pname,
                //purl   : webim.pinfo.purl,
                purl	 : window.location.href,
                picurl : "http:"+webim.pinfo.picurl,
                sendermail    : webim.chat_info.chat_info_email,
                gender        : webim.chat_info.chat_info_sex,
                sendername    : webim.chat_info.chat_info_name,
                sendercname   : webim.chat_info.chat_info_company,
                senderphone   : webim.chat_info.chat_info_telephone,
                sendercountry : webim.chat_info.chat_info_country,
                buyerid       : webim.buyer_id,
                sellerid      : webim.seller_id,
                appid		  : webim.params.config.appid
            }, function (result) {
                if(result.status == 200){
                    webim.auto_reply.status = result.data.status;
                    if(result.data.status == 1 &&  result.data.content != ""){
                        webim.auto_reply.content = webim.lancontent['chatnow_reply_prefix'] + result.data.content;
                    }
                }
            },"json" );

        //同步帐号信息
        var sign = hex_md5("f2ea43ef1e6f67f2d1c23f4a7f2317d8"+webim.buyer_id+webim.chat_info.chat_info_name);
        $.ajax({
            type : "post",
            url  : webim.imapi+"/account_modify?sign="+sign,
            data : JSON.stringify({UserID:webim.buyer_id,
                App_id:webim.params.config.appid,
                Nick  : webim.chat_info.chat_info_name,
                Phone : webim.chat_info.chat_info_telephone,
                Sex   : webim.chat_info.chat_info_sex,
                Address   : webim.chat_info.chat_info_allcountry,
            }),
            async : false,
            success : function(res){}
        });

        layer.closeAll();
        if(webim.config.device){
            $(".wrap-btn-contact").parents("body").css("position","inherit");
        }

        //语言包处理
        webim.config.title_info = webim.lancontent[ 'chatnow_title_info' ];
        webim.config.title_chat = webim.lancontent[ 'chatnow_title_chat' ];
        webim.auto_reply.content = webim.lancontent['chatnow_reply_content'];
        //开始聊天后缓存买家id
        webim.setCookie("seller_id",webim.seller_id,24*7);

        layer.open( {
            offset : 'rb',
            device : webim.config.device,
            type    : 2,
            area    :  webim.config.area.length >0 ? webim.config.area : ['770', '480'],
            fix     : true, //不固定
            title   : webim.config.title_chat,
            maxmin  : webim.config.device == 0 ? true : false,
            shade   : 0,
            content : [ webim.config.path + webim.config.pop_chat_url, 'no' ],
            success : function ()
            {
                // console.log( "buyer_id:" + webim.buyer_id );
                // console.log( "seller_id:" + webim.seller_id );

                var frame = window.frames[ window.frames.length - 1 ];

                // 初始化IM
                var IM = frame.IM;
                IM._user_account = webim.buyer_id;
                IM._content_you = webim.seller_id;
                IM._name = webim.sex_name[ webim.chat_info.chat_info_sex ] + " " +
                    webim.chat_info.chat_info_name;

                // 用来发送产品信息
                IM._userdata = {
                    name   : IM._name,
                    device : webim.config.device,
                    pid    : webim.pinfo.pid,
                    pname  : webim.pinfo.pname,
                    //purl   : webim.pinfo.purl,
                    purl   : window.location.href,
                    picurl : "http:"+webim.pinfo.picurl,
                    bemail : webim.chat_info.chat_info_email,
                    bsex : webim.chat_info.chat_info_sex,
                    bname : webim.chat_info.chat_info_name,
                    bcompany : webim.chat_info.chat_info_company,
                    btel : webim.chat_info.chat_info_telephone,
                    bcountry : webim.chat_info.chat_info_country,
                    ballcountry : webim.chat_info.chat_info_allcountry,
                    ip : webim.chat_info.chat_info_ip,
                    auto_reply: webim.auto_reply,
                    is_auto_reply: 0,
                };

                //初始化数据
                webim.params.loginname = webim.chat_info.chat_info_email+"#buyer";
                webim.params.loginid   = webim.buyer_id;
                webim.params.loginpass = hex_md5("ECER_CHBA_1526887294"+ webim.chat_info.chat_info_email+"#buyer");
                webim.params.curchat   = webim.seller_id;
                webim.params.eventid   = webim.pinfo.pid;
                webim.params.device    = webim.config.device;
                webim.params.bemail    = webim.chat_info.chat_info_email,
                webim.params.bcountry  = webim.chat_info.chat_info_country,

                IM.init(webim.params);


                $( window.frames[ window.frames.length - 1 ].document ).find( "#chatnow_product" ).html(webim.lancontent[ 'chatnow_product' ]);
                $( window.frames[ window.frames.length - 1 ].document ).find( "#chatnow_welcome" ).html(webim.lancontent[ 'chatnow_welcome' ]);

                $( window.frames[ window.frames.length - 1 ].document ).find( "#sendmsgBtn" ).html(webim.lancontent[ 'chatnow_connecting' ]);
                $( window.frames[ window.frames.length - 1 ].document ).find( "#sendmsgBtn_send" ).html(webim.lancontent[ 'chatnow_send' ]);
                $( window.frames[ window.frames.length - 1 ].document ).find( "#sendmsgBtn_connecting" ).html(webim.lancontent[ 'chatnow_connecting' ]);

                if(webim.pinfo.pid == "" || typeof(webim.pinfo.pid) == "undefined" || webim.pinfo.pname == "" || typeof(webim.pinfo.pname) == "undefined") {
                    $( window.frames[ window.frames.length - 1 ].document ).find( ".products" ).hide();
                }else{
                    $( window.frames[ window.frames.length - 1 ].document ).find( ".products" ).show();
                    $( window.frames[ window.frames.length - 1 ].document ).find( "#pname" ).html( webim.pinfo.pname );
                    if(webim.config.device != 1){
                        $( window.frames[ window.frames.length - 1 ].document ).find( "#pname" )
                            .attr("href", webim.pinfo.purl)
                            .attr('target', '_blank')
                            .html( webim.pinfo.pname );
                    }
                    $( window.frames[ window.frames.length - 1 ].document ).find( "#pimg" )
                        .attr( "src", webim.pinfo.picurl);
                }

                IM.HTML_LJ_none();
            }
        } );
    },

    // 新版弹出聊天窗口
    pop_chat2 : function ()
    {
        if(!webim.is_init) {
            window.ECERIM.update({
                appId: webim.params.config.appid,
                loginName: webim.chat_info.chat_info_email+"#buyer",
                loginId: parseInt(webim.buyer_id),
                activeId: webim.seller_id,
                extraInfo:JSON.stringify({pid:webim.pinfo.pid}),
                onReady: function (res) {
                    console.log("onReady");
                    //成功连接后处理
                    webim.pop_chat_close();
                    webim.is_init = 1;
                    //开始聊天后缓存买家id
                    webim.setCookie("seller_id",webim.seller_id,24*7);
                    // 数据存入会话（不考虑执行的结果）,todo:邮箱错误
                    $.post( '../index.php-r=Inquiry-WebIMSave.js'/*tpa=http://www.aksoherb.com/index.php?r=Inquiry/WebIMSave*/,
                        {
                            pid           : webim.pinfo.pid,
                            sendermail    : webim.chat_info.chat_info_email,
                            gender        : webim.chat_info.chat_info_sex,
                            sendername    : webim.chat_info.chat_info_name,
                            sendercname   : webim.chat_info.chat_info_company,
                            senderphone   : webim.chat_info.chat_info_telephone,
                            sendercountry : webim.chat_info.chat_info_country,
                            buyerid       : webim.buyer_id,
                            sellerid      : webim.seller_id,
                            appid		  : webim.params.config.appid
                        }, function (result) {
                        },"json" );
                    //同步帐号信息
                    var sign = hex_md5("f2ea43ef1e6f67f2d1c23f4a7f2317d8"+webim.buyer_id+webim.chat_info.chat_info_name);
                    $.ajax({
                        type : "post",
                        url  : webim.imapi+"/account_modify?sign="+sign,
                        data : JSON.stringify({UserID:webim.buyer_id,
                            App_id:webim.params.config.appid,
                            Nick  : webim.chat_info.chat_info_name,
                            Phone : webim.chat_info.chat_info_telephone,
                            Sex   : webim.chat_info.chat_info_sex,
                            Address   : webim.chat_info.chat_info_allcountry,
                        }),
                        async : false,
                        success : function(res){}
                    });
                },
                onMsg: function (unReadMsg) {
                    var unRendMsgCnt = 0;
                    (unReadMsg || []).forEach(function (c) {
                        if(c.formUserId == webim.seller_id){
                            unRendMsgCnt += c.total;
                        }
                    });
                    if(unRendMsgCnt > 0){
                        $("#unreadcnt").show();
                        $("#unreadcnt").text(unRendMsgCnt);
                        $(".msgNumber").show();
                        $(".msgNumber").text(unRendMsgCnt);
                    }else{
                        $("#unreadcnt").hide();
                        $(".msgNumber").hide();
                    }
                },
                onMounted: function () {
                    if(webim.chat_type > 0){
                        window.ECERIM.chatAV(webim.chat_type);
                    }
                },
            });
        }else{
            console.log("onReady_no");
            webim.pop_chat_close();
            window.ECERIM.chat({
                user_id: parseInt(webim.seller_id),
                name:"",
            })
        }
    },

    // 行业站访问过来的初始化后直接音视频
    ecer_init : function ()
    {
        window.ECERIM.init({
            appId: webim.params.config.appid,
            loginName: webim.params.loginname,
            loginId: parseInt(webim.buyer_id),
            activeId: webim.seller_id,
            defaultShowMinBar: webim.defaultShowMinBar,
            openOnMsg: webim.openOnMsg,
            showCloseBtn: webim.closeBtn,
            showMinBtn: webim.minBtn,
            defaultOpenMinBar: true,
            showMinBar: webim.showMinBar,
            extraInfo:JSON.stringify({pid:webim.pinfo.pid}),
            onReady: function (res) {
                //成功连接后处理
                webim.is_init = 1;
                //开始聊天后缓存买家id
                webim.setCookie("seller_id",webim.seller_id,24*7);
                // 数据存入会话（不考虑执行的结果）,todo:邮箱错误
                $.post( '../index.php-r=Inquiry-WebIMSave.js'/*tpa=http://www.aksoherb.com/index.php?r=Inquiry/WebIMSave*/,
                    {
                        pid           : webim.pinfo.pid,
                        sendermail    : webim.chat_info.chat_info_email,
                        gender        : webim.chat_info.chat_info_sex,
                        sendername    : webim.chat_info.chat_info_name,
                        sendercname   : webim.chat_info.chat_info_company,
                        senderphone   : webim.chat_info.chat_info_telephone,
                        sendercountry : webim.chat_info.chat_info_country,
                        buyerid       : webim.buyer_id,
                        sellerid      : webim.seller_id,
                        appid		  : webim.params.config.appid
                    }, function (result) {
                    },"json" );
                //同步帐号信息
                var sign = hex_md5("f2ea43ef1e6f67f2d1c23f4a7f2317d8"+webim.buyer_id+webim.chat_info.chat_info_name);
                $.ajax({
                    type : "post",
                    url  : webim.imapi+"/account_modify?sign="+sign,
                    data : JSON.stringify({UserID:webim.buyer_id,
                        App_id:webim.params.config.appid,
                        Nick  : webim.chat_info.chat_info_name,
                        Phone : webim.chat_info.chat_info_telephone,
                        Sex   : webim.chat_info.chat_info_sex,
                        Address   : webim.chat_info.chat_info_allcountry,
                    }),
                    async : false,
                    success : function(res){}
                });
            },
            onMsg: function (unReadMsg) {
                var unRendMsgCnt = 0;
                (unReadMsg || []).forEach(function (c) {
                    if(c.formUserId == webim.seller_id){
                        unRendMsgCnt += c.total;
                    }
                });
                if(unRendMsgCnt > 0){
                    $("#unreadcnt").show();
                    $("#unreadcnt").text(unRendMsgCnt);
                    $(".msgNumber").show();
                    $(".msgNumber").text(unRendMsgCnt);
                }else{
                    $("#unreadcnt").hide();
                    $(".msgNumber").hide();
                }
            },
            onMounted: function () {
                if(webim.chat_type > 0){
                    window.ECERIM.chatAV(webim.chat_type);
                }
            },
        });
    },

    // 音视频回调
    chatAVcallback : function (res)
    {
        if (res) {
            if(res.code === 0){
                // 如果发起成功
                return;
            }else{
                //注册页
                webim.chatnow();
            }
        }
    },

    // 音视频
    chatAV : function (chatType)
    {
        webim.chat_type = chatType;
        window.ECERIM.chatAV(chatType,webim.chatAVcallback);
    },

    // ecer过来的注册
    ecer_account_import : function ()
    {
        var user_name;
        if(webim.chat_info.chat_info_email != ""){
            user_name = webim.chat_info.chat_info_email;
        }else{
            user_name = webim.chat_info.chat_info_telephone;
        }
        //跳过输入框直接注册
        if( webim.params.config.appid == 10003){
            var sign = hex_md5("f2ea43ef1e6f67f2d1c23f4a7f2317d8"+user_name+"#buyer");
            $.ajax({
                type : "post",
                url  : webim.imapi+"/hys/im_open_login_svc/account_import?sign="+sign,
                data : JSON.stringify({User_Name:user_name+"#buyer",App_id:webim.params.config.appid,Nick:webim.chat_info.chat_info_name,Email_Address:webim.chat_info.chat_info_email}),
                async : false,
                success : function(res){
                    var data = JSON.parse(res);
                    if(data.error_code == 0){
                        webim.buyer_id = data.user_id;
                        webim.params.loginname = user_name+"#buyer";
                        webim.setCookie( "buyer_id", webim.buyer_id );
                        webim.setCookie( "chat_info_telephone", webim.chat_info.chat_info_telephone );
                        webim.setCookie( "chat_info_email", webim.chat_info.chat_info_email );
                        webim.setCookie( "chat_info_name", webim.chat_info.chat_info_name );
                        webim.ecer_init();
                        webim.init_msg();
                    }else{
                        alert(data.error_msg);
                    }
                }
            });
        }else{
            $.ajax({
                type : "post",
                url  : '../index.php-r=inquiry-getbuyer.htm'/*tpa=http://www.aksoherb.com/index.php?r=inquiry/getbuyer*/,
                data : { name:user_name+"#buyer",nick:webim.chat_info.chat_info_name ,appid:webim.params.config.appid,email:webim.chat_info.chat_info_email  },
                async : false,
                dataType:"json",
                success : function(res){
                    if(res.result == 1){
                        webim.buyer_id = res.data.imid;
                        webim.params.loginname = user_name+"#buyer";
                        webim.setCookie( "buyer_id", webim.buyer_id );
                        webim.setCookie( "chat_info_telephone", webim.chat_info.chat_info_telephone );
                        webim.setCookie( "chat_info_email", webim.chat_info.chat_info_email );
                        webim.setCookie( "chat_info_name", webim.chat_info.chat_info_name );
                        webim.ecer_init();
                        webim.init_msg();
                    }else{
                        alert(data.msg);
                    }
                }
            });
        }
    },

    // 联系信息弹出框
    pop_info : function ()
    {
        if(webim.get_pop_info_flag()){
            webim.webim_start_chat();
            $("#pop_info").hide();
            return;
        }
        $("#pop_info").show();
        if(webim.chat_info.chat_info_email != null && webim.chat_info.chat_info_email != ""){
            $( "#chat_info_tips" ).html(webim.lancontent[ 'chatnow_chatinfotips1' ]).show();
            $( "#chat_info_modify" ).click( webim.webim_modify_info );
        }else{
            $( "#chat_info_tips" ).html(webim.lancontent[ 'chatnow_chatinfotips2' ]).show();
        }
        //弹出框的多语言处理
        for ( key in webim.lancontent )
        {
            if ( webim.lancontent[ key ] )
            {

                // 隐藏输入框框，显示span
                $( '#' + key ).text( webim.lancontent[ key ] );
            }
        }
        webim.config.title_info = webim.lancontent[ 'chatnow_title_info' ];
        $("#chat_info_sex").text("");
        $("<option value='0'>"+webim.lancontent[ 'chatnow_mr' ]+".</option>").appendTo($("#chat_info_sex"));
        $("<option value='1'>"+webim.lancontent[ 'chatnow_mrs' ]+".</option>").appendTo($("#chat_info_sex"));
        $("<option value='2'>"+webim.lancontent[ 'chatnow_miss' ]+".</option>").appendTo($("#chat_info_sex"));
        $("<option value='3'>"+webim.lancontent[ 'chatnow_ms' ]+".</option>").appendTo($("#chat_info_sex"));

        $("#chat_info_name").attr("placeholder",webim.lancontent[ 'chatnow_iyn' ]);
        $("#chat_info_telephone").attr("placeholder",webim.lancontent[ 'chatnow_areanumber' ]);

        $("#chat_info_country").text("");
        $("<optgroup label='"+webim.lancontent[ 'chatnow_selectcompany' ]+"'>" +
            "<option value=\"\" countrynum=\"\">"+webim.lancontent[ 'chatnow_selectcountry' ]+"</option>" +
            "<option value=CN countrynum=86>China (Mainland)</option>" +
            "<option value=CA countrynum=1>Canada</option>" +
            "<option value=HK countrynum=852>Hong Kong,China</option>" +
            "<option value=IN countrynum=91>India</option>" +
            "<option value=ID countrynum=62>Indonesia</option>" +
            "<option value=KR countrynum=82>South Korea</option>" +
            "<option value=MY countrynum=60>Malaysia</option>" +
            "<option value=SG countrynum=65>Singapore</option>" +
            "<option value=TW countrynum=886>Taiwan,China</option>" +
            "<option value=UK countrynum=44>United Kingdom</option>" +
            "<option value=US countrynum=1>United States</option>" +
            "</optgroup>" +
            "<optgroup label='All Countries &amp; Territories (A to Z)'>" +
            "<option value=AF countrynum=93>Afghanistan</option>" +
            "<option value=AL countrynum=355>Albania</option>" +
            "<option value=DZ countrynum=213>Algeria</option>" +
            "<option value=AS countrynum=684>American Samoa</option>" +
            "<option value=AD countrynum=376>Andorra</option>" +
            "<option value=AO countrynum=244>Angola</option>" +
            "<option value=AI countrynum=1-264>Anguilla</option>" +
            "<option value=AQ countrynum=672>Antarctica</option>" +
            "<option value=AG countrynum=1-268>Antigua and Barbuda</option>" +
            "<option value=AR countrynum=54>Argentina</option>" +
            "<option value=AM countrynum=374>Armenia</option>" +
            "<option value=AW countrynum=297>Aruba</option>" +
            "<option value=AU countrynum=61>Australia</option>" +
            "<option value=AT countrynum=43>Austria</option>" +
            "<option value=AZ countrynum=994>Azerbaijan</option>" +
            "<option value=BS countrynum=1-242>Bahamas</option>" +
            "<option value=BH countrynum=973>Bahrain</option>" +
            "<option value=BD countrynum=880>Bangladesh</option>" +
            "<option value=BB countrynum=1-246>Barbados</option>" +
            "<option value=BY countrynum=375>Belarus</option>" +
            "<option value=BE countrynum=32>Belgium</option>" +
            "<option value=BZ countrynum=501>Belize</option>" +
            "<option value=BJ countrynum=229>Benin</option>" +
            "<option value=BM countrynum=1-441>Bermuda</option>" +
            "<option value=BT countrynum=975>Bhutan</option>" +
            "<option value=BO countrynum=591>Bolivia</option>" +
            "<option value=BA countrynum=387>Bosnia and Herzegovina</option>" +
            "<option value=BW countrynum=267>Botswana</option>" +
            "<option value=BV countrynum=>Bouvet Island</option>" +
            "<option value=BR countrynum=55>Brazil</option>" +
            "<option value=IO countrynum=1-284>British Indian Ocean Territory</option>" +
            "<option value=BN countrynum=673>Brunei Darussalam</option>" +
            "<option value=BG countrynum=359>Bulgaria</option>" +
            "<option value=BF countrynum=226>Burkina Faso</option>" +
            "<option value=BI countrynum=257>Burundi</option>" +
            "<option value=KH countrynum=855>Cambodia</option>" +
            "<option value=CM countrynum=237>Cameroon</option>" +
            "<option value=CA countrynum=1>Canada</option>" +
            "<option value=CV countrynum=238>Cape Verde</option>" +
            "<option value=KY countrynum=1-345>Cayman Islands</option>" +
            "<option value=CF countrynum=236>Central African Republic</option>" +
            "<option value=TD countrynum=235>Chad</option>" +
            "<option value=CL countrynum=56>Chile</option>" +
            "<option value=CN countrynum=86>China (Mainland)</option>" +
            "<option value=CX countrynum=61>Christmas Island</option>" +
            "<option value=CC countrynum=61>Cocos (Keeling) Islands</option>" +
            "<option value=CO countrynum=57>Colombia</option>" +
            "<option value=KM countrynum=269>Comoros</option>" +
            "<option value=CG countrynum=242>Congo</option>" +
            "<option value=ZR countrynum=243>Congo, The Democratic Republic Of The</option>" +
            "<option value=CK countrynum=682>Cook Islands</option>" +
            "<option value=CR countrynum=506>Costa Rica</option>" +
            "<option value=CI countrynum=225>Cote D'Ivoire</option>" +
            "<option value=HR countrynum=385>Croatia (local name: Hrvatska)</option>" +
            "<option value=CU countrynum=53>Cuba</option>" +
            "<option value=CY countrynum=357>Cyprus</option>" +
            "<option value=CZ countrynum=420>Czech Republic</option>" +
            "<option value=DK countrynum=45>Denmark</option>" +
            "<option value=DJ countrynum=253>Djibouti</option>" +
            "<option value=DM countrynum=1-767>Dominica</option>" +
            "<option value=DO countrynum=1-809>Dominican Republic</option>" +
            "<option value=TP countrynum=670>East Timor</option>" +
            "<option value=EC countrynum=593>Ecuador</option>" +
            "<option value=EG countrynum=20>Egypt</option>" +
            "<option value=SV countrynum=503>El Salvador</option>" +
            "<option value=GQ countrynum=240>Equatorial Guinea</option>" +
            "<option value=ER countrynum=291>Eritrea</option>" +
            "<option value=EE countrynum=372>Estonia</option>" +
            "<option value=ET countrynum=251>Ethiopia</option>" +
            "<option value=FK countrynum=500>Falkland Islands (Malvinas)</option>" +
            "<option value=FO countrynum=298>Faroe Islands</option>" +
            "<option value=FJ countrynum=679>Fiji</option>" +
            "<option value=FI countrynum=358>Finland</option>" +
            "<option value=FR countrynum=33>France</option>" +
            "<option value=FX countrynum=33>France Metropolitan</option>" +
            "<option value=GF countrynum=594>French Guiana</option>" +
            "<option value=PF countrynum=689>French Polynesia</option>" +
            "<option value=TF countrynum=>French Southern Territories</option>" +
            "<option value=GA countrynum=241>Gabon</option>" +
            "<option value=GM countrynum=220>Gambia</option>" +
            "<option value=GE countrynum=995>Georgia</option>" +
            "<option value=DE countrynum=49>Germany</option>" +
            "<option value=GH countrynum=233>Ghana</option>" +
            "<option value=GI countrynum=350>Gibraltar</option>" +
            "<option value=GR countrynum=30>Greece</option>" +
            "<option value=GL countrynum=299>Greenland</option>" +
            "<option value=GD countrynum=1-473>Grenada</option>" +
            "<option value=GP countrynum=590>Guadeloupe</option>" +
            "<option value=GU countrynum=1-671>Guam</option>" +
            "<option value=GT countrynum=502>Guatemala</option>" +
            "<option value=GN countrynum=224>Guinea</option>" +
            "<option value=GW countrynum=245>Guinea-Bissau</option>" +
            "<option value=GY countrynum=592>Guyana</option>" +
            "<option value=HT countrynum=509>Haiti</option>" +
            "<option value=HM countrynum=>Heard and Mc Donald Islands</option>" +
            "<option value=HN countrynum=504>Honduras</option>" +
            "<option value=HK countrynum=852>Hong Kong,China</option>" +
            "<option value=HU countrynum=36>Hungary</option>" +
            "<option value=IS countrynum=354>Iceland</option>" +
            "<option value=IN countrynum=91>India</option>" +
            "<option value=ID countrynum=62>Indonesia</option>" +
            "<option value=IR countrynum=98>Iran (Islamic Republic of)</option>" +
            "<option value=IQ countrynum=964>Iraq</option>" +
            "<option value=IE countrynum=353>Ireland</option>" +
            "<option value=IM countrynum=>Isle of Man</option>" +
            "<option value=IL countrynum=972>Israel</option>" +
            "<option value=IT countrynum=39>Italy</option>" +
            "<option value=JM countrynum=1-876>Jamaica</option>" +
            "<option value=JP countrynum=81>Japan</option>" +
            "<option value=JO countrynum=962>Jordan</option>" +
            "<option value=KZ countrynum=7>Kazakhstan</option>" +
            "<option value=KE countrynum=254>Kenya</option>" +
            "<option value=KI countrynum=686>Kiribati</option>" +
            "<option value=KS countrynum=>Kosovo</option>" +
            "<option value=KW countrynum=965>Kuwait</option>" +
            "<option value=KG countrynum=996>Kyrgyzstan</option>" +
            "<option value=LA countrynum=856>Lao People's Democratic Republic</option>" +
            "<option value=LV countrynum=371>Latvia</option>" +
            "<option value=LB countrynum=961>Lebanon</option>" +
            "<option value=LS countrynum=266>Lesotho</option>" +
            "<option value=LR countrynum=231>Liberia</option>" +
            "<option value=LY countrynum=218>Libyan Arab Jamahiriya</option>" +
            "<option value=LI countrynum=423>Liechtenstein</option>" +
            "<option value=LT countrynum=370>Lithuania</option>" +
            "<option value=LU countrynum=352>Luxembourg</option>" +
            "<option value=MO countrynum=853>Macau,China</option>" +
            "<option value=MG countrynum=261>Madagascar</option>" +
            "<option value=MW countrynum=265>Malawi</option>" +
            "<option value=MY countrynum=60>Malaysia</option>" +
            "<option value=MV countrynum=960>Maldives</option>" +
            "<option value=ML countrynum=223>Mali</option>" +
            "<option value=MT countrynum=356>Malta</option>" +
            "<option value=MH countrynum=692>Marshall Islands</option>" +
            "<option value=MQ countrynum=596>Martinique</option>" +
            "<option value=MR countrynum=222>Mauritania</option>" +
            "<option value=MU countrynum=230>Mauritius</option>" +
            "<option value=YT countrynum=269>Mayotte</option>" +
            "<option value=MX countrynum=52>Mexico</option>" +
            "<option value=FM countrynum=691>Micronesia</option>" +
            "<option value=MD countrynum=373>Moldova</option>" +
            "<option value=MC countrynum=377>Monaco</option>" +
            "<option value=MN countrynum=976>Mongolia</option>" +
            "<option value=MNE countrynum=382>Montenegro</option>" +
            "<option value=MS countrynum=1-664>Montserrat</option>" +
            "<option value=MA countrynum=212>Morocco</option>" +
            "<option value=MZ countrynum=258>Mozambique</option>" +
            "<option value=MM countrynum=95>Myanmar</option>" +
            "<option value=NA countrynum=264>Namibia</option>" +
            "<option value=NR countrynum=674>Nauru</option>" +
            "<option value=NP countrynum=977>Nepal</option>" +
            "<option value=NL countrynum=31>Netherlands</option>" +
            "<option value=AN countrynum=599>Netherlands Antilles</option>" +
            "<option value=NC countrynum=687>New Caledonia</option>" +
            "<option value=NZ countrynum=64>New Zealand</option>" +
            "<option value=NI countrynum=505>Nicaragua</option>" +
            "<option value=NE countrynum=227>Niger</option>" +
            "<option value=NG countrynum=234>Nigeria</option>" +
            "<option value=NU countrynum=683>Niue</option>" +
            "<option value=NF countrynum=672>Norfolk Island</option>" +
            "<option value=KP countrynum=850>North Korea</option>" +
            "<option value=MP countrynum=1670>Northern Mariana Islands</option>" +
            "<option value=NO countrynum=47>Norway</option>" +
            "<option value=OM countrynum=968>Oman</option>" +
            "<option value=Other countrynum=>Other Country</option>" +
            "<option value=PK countrynum=92>Pakistan</option>" +
            "<option value=PW countrynum=680>Palau</option>" +
            "<option value=PS countrynum=970>Palestine</option>" +
            "<option value=PA countrynum=507>Panama</option>" +
            "<option value=PG countrynum=675>Papua New Guinea</option>" +
            "<option value=PY countrynum=595>Paraguay</option>" +
            "<option value=PE countrynum=51>Peru</option>" +
            "<option value=PH countrynum=63>Philippines</option>" +
            "<option value=PN countrynum=872>Pitcairn</option>" +
            "<option value=PL countrynum=48>Poland</option>" +
            "<option value=PT countrynum=351>Portugal</option>" +
            "<option value=PR countrynum=1-787>Puerto Rico</option>" +
            "<option value=QA countrynum=974>Qatar</option>" +
            "<option value=RE countrynum=262>Reunion</option>" +
            "<option value=RO countrynum=40>Romania</option>" +
            "<option value=RU countrynum=7>Russian Federation</option>" +
            "<option value=RW countrynum=250>Rwanda</option>" +
            "<option value=KN countrynum=1>Saint Kitts and Nevis</option>" +
            "<option value=LC countrynum=1>Saint Lucia</option>" +
            "<option value=VC countrynum=1>Saint Vincent and the Grenadines</option>" +
            "<option value=WS countrynum=685>Samoa</option>" +
            "<option value=SM countrynum=378>San Marino</option>" +
            "<option value=ST countrynum=239>Sao Tome and Principe</option>" +
            "<option value=SA countrynum=966>Saudi Arabia</option>" +
            "<option value=SN countrynum=221>Senegal</option>" +
            "<option value=SRB countrynum=381>Serbia</option>" +
            "<option value=SC countrynum=248>Seychelles</option>" +
            "<option value=SL countrynum=232>Sierra Leone</option>" +
            "<option value=SG countrynum=65>Singapore</option>" +
            "<option value=SK countrynum=421>Slovakia (Slovak Republic)</option>" +
            "<option value=SI countrynum=386>Slovenia</option>" +
            "<option value=SB countrynum=677>Solomon Islands</option>" +
            "<option value=SO countrynum=252>Somalia</option>" +
            "<option value=ZA countrynum=27>South Africa</option>" +
            "<option value=KR countrynum=82>South Korea</option>" +
            "<option value=ES countrynum=34>Spain</option>" +
            "<option value=LK countrynum=94>Sri Lanka</option>" +
            "<option value=SH countrynum=290>St. Helena</option>" +
            "<option value=PM countrynum=508>St. Pierre and Miquelon</option>" +
            "<option value=SD countrynum=249>Sudan</option>" +
            "<option value=SR countrynum=597>Suriname</option>" +
            "<option value=SJ countrynum=>Svalbard and Jan Mayen Islands</option>" +
            "<option value=SZ countrynum=268>Swaziland</option>" +
            "<option value=SE countrynum=46>Sweden</option>" +
            "<option value=CH countrynum=41>Switzerland</option>" +
            "<option value=SY countrynum=963>Syrian Arab Republic</option>" +
            "<option value=TW countrynum=886>Taiwan,China</option>" +
            "<option value=TJ countrynum=992>Tajikistan</option>" +
            "<option value=TZ countrynum=255>Tanzania</option>" +
            "<option value=TH countrynum=66>Thailand</option>" +
            "<option value=MK countrynum=389>The former Yugoslav Republic of Macedonia</option>" +
            "<option value=TG countrynum=228>Togo</option>" +
            "<option value=TK countrynum=690>Tokelau</option>" +
            "<option value=TO countrynum=676>Tonga</option>" +
            "<option value=TT countrynum=1-868>Trinidad and Tobago</option>" +
            "<option value=TN countrynum=216>Tunisia</option>" +
            "<option value=TR countrynum=90>Turkey</option>" +
            "<option value=TM countrynum=993>Turkmenistan</option>" +
            "<option value=TC countrynum=1-649>Turks and Caicos Islands</option>" +
            "<option value=TV countrynum=688>Tuvalu</option>" +
            "<option value=UG countrynum=256>Uganda</option>" +
            "<option value=UA countrynum=380>Ukraine</option>" +
            "<option value=AE countrynum=971>United Arab Emirates</option>" +
            "<option value=UK countrynum=44>United Kingdom</option>" +
            "<option value=US countrynum=1>United States</option>" +
            "<option value=UM countrynum=>United States Minor Outlying Islands</option>" +
            "<option value=UY countrynum=598>Uruguay</option>" +
            "<option value=UZ countrynum=998>Uzbekistan</option>" +
            "<option value=VU countrynum=678>Vanuatu</option>" +
            "<option value=VA countrynum=39>Vatican City State (Holy See)</option>" +
            "<option value=VE countrynum=58>Venezuela</option>" +
            "<option value=VN countrynum=84>Vietnam</option>" +
            "<option value=VG countrynum=1284>Virgin Islands (British)</option>" +
            "<option value=VI countrynum=1340>Virgin Islands (U.S.)</option>" +
            "<option value=WF countrynum=681>Wallis And Futuna Islands</option>" +
            "<option value=EH countrynum=685>Western Sahara</option>" +
            "<option value=YE countrynum=967>Yemen</option>" +
            "<option value=YU countrynum=381>Yugoslavia</option>" +
            "<option value=ZM countrynum=260>Zambia</option>" +
            "<option value=ZW countrynum=263>Zimbabwe</option>" +
            "</optgroup>").appendTo($("#chat_info_country"));

        //获取国家
        $.ajax({
            type : "get",
            url  : 'http://www.aksoherb.com/index.php?r=inquiry/getcountry',
            async : false,
            dataType:"json",
            success : function(res){
                if(res.countrycode != ""){
                    $("#chat_info_country").val(res.countrycode);
                }
            }
        });

        // 页面字段赋值
        for ( key in webim.chat_info )
        {
            if ( webim.chat_info[ key ] )
            {
                if( key == 'chat_info_allcountry' || key == "chat_info_ip"){
                    continue;
                }
                // console.log( key + "=" + webim.chat_info[ key ] );

                var select = webim.chat_info[ key ];

                // select框需要转换一下显示的内容
                if ( $( '#' + key )[ 0 ].tagName == "SELECT" )
                {
                    $('#' + key ).val(select);
                    select = $( '#' + key ).find(
                        "option[value=" + select + "]" ).html()
                }

                // 隐藏输入框框，显示span
                $( '#' + key ).val( webim.chat_info[ key ] ).hide();
                $( '#' + key + "_span" ).html( select ).show();
                if(webim.config.device == 1){
                    $( '#' + key + "_title" ).show();
                    if(!webim.chat_info[ "chat_info_name" ]){
                        $( '#chat_info_sex').show();
                    }
                }
            }
        }

        layer.open( {
            type    : 1,
            shade   : 0.3,
            fix     : true, //不固定
            area    : webim.config.area.length >0 ? webim.config.area : [502, ''],
            title   : webim.config.title_info,
            content : $( webim.config.chat_info_selector ),
            device  : webim.config.device
        } );
        $( webim.config.selector).attr("disabled",false);
        $("#ECER_MIN_BAR").css("pointer-events","auto");
        $( "#chat_info_email" ).focus();
    },

    init_msg : function ()
    {
        var sign = hex_md5("f2ea43ef1e6f67f2d1c23f4a7f2317d8" + webim.buyer_id + webim.seller_id);
        $.ajax({
            type : "post",
            url  : webim.imapi+"/send_msg_data?sign="+sign,
            data : JSON.stringify({App_id:webim.params.config.appid,From_User_ID:webim.buyer_id,To_Session_ID:webim.seller_id,Msg_Type:4,Msg_Data:"Connection established，now we can chat！"}),
            async : false,
            success : function(res){
            }
        });
    },
    // pop_info点击触发
    webim_start_chat : function ()
    {
        $( webim.config.selector).attr("disabled",false);
        $("#ECER_MIN_BAR").css("pointer-events","auto");
        if( !webim.get_pop_info_flag() ){
            if ( !webim.set_chat_info())
            {
                return false;
            }
        }
        //设置按钮为等待连接
        $("#chat_info_start").hide();
        $("#chat_info_waiting").show();
        webim.buyer_id = webim.getCookie( 'buyer_id' );
        if ( webim.buyer_id == null || webim.buyer_id == "")
        {
            if( webim.params.config.appid == 10003){
                var sign = hex_md5("f2ea43ef1e6f67f2d1c23f4a7f2317d8"+webim.chat_info.chat_info_email+"#buyer");
                $.ajax({
                    type : "post",
                    url  : webim.imapi+"/hys/im_open_login_svc/account_import?sign="+sign,
                    data : JSON.stringify({User_Name:webim.chat_info.chat_info_email+"#buyer",App_id:webim.params.config.appid,Nick:webim.chat_info.chat_info_name,Email_Address:webim.chat_info.chat_info_email}),
                    async : false,
                    success : function(res){
                        var data = JSON.parse(res);
                        if(data.error_code == 0){
                            webim.buyer_id = data.user_id;
                            webim.setCookie( "buyer_id", webim.buyer_id );
                            webim.pop_chat2();
                            webim.init_msg();
                        }else{
                            alert(data.error_msg);
                        }
                    }
                });
            }else{
                $.ajax({
                    type : "post",
                    url  : '../index.php-r=inquiry-getbuyer.htm'/*tpa=http://www.aksoherb.com/index.php?r=inquiry/getbuyer*/,
                    data : { name:webim.chat_info.chat_info_email+"#buyer",nick:webim.chat_info.chat_info_name ,appid:webim.params.config.appid,email:webim.chat_info.chat_info_email  },
                    async : false,
                    dataType:"json",
                    success : function(res){
                        if(res.result == 1){
                            webim.buyer_id = res.data.imid;
                            webim.setCookie( "buyer_id", webim.buyer_id );
                            webim.pop_chat2();
                            webim.init_msg();
                        }else{
                            alert(data.msg);
                        }
                    }
                });
            }
        }else{
            webim.pop_chat2();
        }
    },

    // pop_info修改触发
    webim_modify_info : function ()
    {
        // 页面字段赋值
        for ( key in webim.chat_info )
        {
            if ( key == "chat_info_email" ){
                continue;
            }
            if ( webim.chat_info[ key ] )
            {
                // console.log( key + "=" + webim.chat_info[ key ] );

                $( '#' + key ).show();
                $( '#' + key + "_span" ).hide();
                $( '#' + key + "_title" ).hide();
            }
        }
    },

    get_pid : function ()
    {

    },

    // 注入session_id到cookie
    get_session_id : function ()
    {
        webim.session_id = webim.getCookie( 'session_id' );
        if ( webim.session_id == null || webim.session_id == "" || webim.session_id.length != 36 )
        {
            webim.session_id = Math.uuid();
            webim.setCookie( "session_id", webim.session_id );
        }

        return webim.session_id;
    },

    // 获取买家id，直接导致chat now按钮是否展示
    get_seller_id : function ( fun )
    {
        webim.pinfo.uid =  webim.getCookie("uid") == null ? 0 :  webim.getCookie("uid");
        webim.pinfo.pid =  webim.getCookie("pid") == null ? 0 :  webim.getCookie("pid");
        // console.log( "function get_seller_id" );
        if ( typeof(webim_config.getseller) == "function" )
        {
            webim.seller_id = webim_config.getseller();
            fun();
        }
        else
        {
            g_getseller = webim.getCookie("seller_id");
            webim.pinfo.type = webim.getCookie("type");

            if(typeof(webim_config.getseller) == "undefined" || g_getseller == "" || g_getseller == null || webim.pinfo.type == null || webim.pinfo.type == "undefined"){
                var uid = webim.pinfo.uid;
                if(typeof(uid)  != "undefined" && parseInt(uid) >0 ){
                    webim_config.getseller = webim_config.getseller+"?"+uid;
                }

                $.ajax({
                    type : "get",
                    url : webim_config.getseller,
                    data : "",
                    async : false,
                    success : function(data){
                        g_getsellerret = data.trim();
                        getsellerretArr = g_getsellerret.split(",");
                        g_getseller      = getsellerretArr[0];
                        webim.pinfo.type = getsellerretArr[1];
                        webim.setCookie("type",webim.pinfo.type,24*7);
                        if(getsellerretArr[2] && getsellerretArr[2] == 2){
                            webim.is_new = 2;
                        }
                    }
                });
            }else{
                $.ajax({
                    type : "get",
                    url : webim_config.getseller,
                    data : "",
                    async : false,
                    success : function(data){
                        g_getsellerret = data.trim();
                        getsellerretArr = g_getsellerret.split(",");
                        if(getsellerretArr[2] && getsellerretArr[2] == 2){
                            webim.is_new = 2;
                        }
                    }
                });
            }
            var getseller = function()
            {
                if ( g_getseller != null )
                {
                    if (g_getseller != "")
                    {
                        webim.seller_id = g_getseller;
                        fun();
                    }
                }
                else
                    setTimeout( arguments.callee, 100 );
            }

            getseller();
        }
    },

    get_pop_info_flag : function()
    {
        if(webim.getCookie('chat_ecer_account') == 1){
            //如果行业站注册买家不弹出信息修改框
            return true;
        }
        var popinfoflag = webim.getCookie("pop_info_flag");
        if( typeof(popinfoflag) != "undefined" && popinfoflag != null && popinfoflag == 1){
            return true;
        }else{
            return false;
        }
    },

    getapiDomain : function()
    {
        if(window.location.host == "m.jpbrandoor.com" ||
            window.location.host == "www.jpbrandoor.com" ||
            window.location.host == "m.manometerthermometer.com" ||
            window.location.host == "www.manometerthermometer.com"){
            webim.imapi    = "https://imtestapi."+uurl+":8401";
        }
    },

    web_css : function(button)
    {
        $(button).css({
            "border": "1px solid #ff9c00",
            "font-weight": "bold",
            "line-height": "21px",
            "margin": "-26px 0px 0px 135px",
            "border-radius": "4px",
            "padding": "1px 10px",
            "color": "#ff9c60",
            "float": "left",
            "background": "none",
            "cursor": "pointer"
        });
        $(button).find("span").css({
            "display": "inline-block",
            "width": "30px",
            "height": "20px",
            "float": "left",
            "background": "url(/images/img.png) 0px -32px no-repeat"
        });
    }
};


if (navigator.userAgent.match(/Google Page Speed Insights/i)==null &&
    navigator.userAgent.match(/Chrome-Lighthouse/i)==null)
{

    if ( typeof(webim_config) == "object" )
    {
        for ( key in webim_config )
        {
            webim.config[ key ] = webim_config[ key ];
        }
    }
}

$(document).ready(function(){
    webim.get_seller_id( function ()
    {
        if ( webim.config.device == 1 )
        {
            // 如果是移动版
            webim.config.pop_info_url = "http://www.aksoherb.com/webim/pop_info_mobile2.html";
            webim.config.pop_chat_url = "pop_chat_mobile2.html"/*tpa=http://www.aksoherb.com/webim/pop_chat_mobile2.html*/;
        }
        else
        {   webim.config.pop_info_url = "pop_info2.html"/*tpa=http://www.aksoherb.com/webim/pop_info2.html*/;
            webim.config.pop_chat_url = "pop_chat2.html"/*tpa=http://www.aksoherb.com/webim/pop_chat2.html*/;
        }

        //设置appid
        if (webim.pinfo.type == "4" || webim.pinfo.type == "6") {
            webim.params.config.appid = 10004;
            webim.params.appid = 10004;
            //宜选通
        } else {
            //贸易通
            webim.params.config.appid = 10003;
            webim.params.appid = 10003;
        }

        //如果是新版
        if(webim.is_new == 2) {
            //获取api的域名
            webim.getapiDomain();
            if (webim.config.device == 1) {
                webim.defaultShowMinBar = false;
                webim.openOnMsg = false;
                webim.minBtn = false;
                webim.showMinBar = false;
                $(webim.config.selector).html("<i class='ecert8 icon-kefu'></i><span>Chat Now</span><i id='unreadcnt'></i>");
            }

            //行业站转入的聊天
            var urlParams = GetRequest(window.location.href);
            if(urlParams && ( urlParams['chatavtype'] == 1 || urlParams['chatavtype'] == 2 )){
                //音视频类型
                webim.chat_type  = parseInt(urlParams['chatavtype']);
                if(urlParams['nick'] != undefined && urlParams['nick'] != ""){
                    webim.chat_info.chat_info_name  = urlParams['nick'];
                }
                if(urlParams['pid'] != undefined && parseInt(urlParams['pid']) != 0){
                    webim.pinfo.pid  = parseInt(urlParams['pid']);
                }
                //从ecer转入
                webim.is_ecerurl = 1;
                if((urlParams['telephone'] != undefined && urlParams['telephone'] != "") ||
                    (urlParams['email'] != undefined && urlParams['email'] != "")){
                    //ecer同步过来的帐号
                    webim.ecer_account = 1;
                    webim.setCookie( "ecer_account", webim.ecer_account);
                    webim.chat_info.chat_info_telephone = urlParams['telephone'];
                    webim.chat_info.chat_info_email     = urlParams['email'];
                    var is_newbuyer = 0;
                    if(webim.getCookie('chat_info_telephone') != "" && (webim.getCookie('chat_info_telephone') != webim.chat_info.chat_info_telephone)){
                        is_newbuyer = 1;
                    }
                    if(webim.getCookie('chat_info_email') != "" && (webim.getCookie('chat_info_email') != webim.chat_info.chat_info_email)){
                        is_newbuyer = 1;
                    }
                    if(is_newbuyer == 1){
                        //如果登录信息有改动，清空当前的缓存信息
                        webim.delCookie( "buyer_id");
                        webim.delCookie( "chat_info_telephone");
                        webim.delCookie( "chat_info_email");
                        webim.delCookie( "chat_info_name");
                    }
                }
            }

            //初始化聊天的登陆名和买家id
            webim.params.loginname = "";
            if(webim.getCookie('chat_info_email')){
                webim.params.loginname = webim.getCookie('chat_info_email') + "#buyer";
            }else{
                if(webim.getCookie('chat_info_telephone')){
                    webim.params.loginname = webim.getCookie('chat_info_telephone') + "#buyer";
                }
            }
            webim.params.loginid = webim.getCookie('buyer_id');

            loadScript(webim.jsserver + "/" +webim.params.config.jsfile, function () {
                // 加载完JS，然后初始化IM，假装这个时候客户还没注册
                if (webim.params.loginname != "" && webim.params.loginid != "" && webim.get_pop_info_flag()) {
                    var config = {
                        appId: webim.params.config.appid,
                        defaultShowMinBar: webim.defaultShowMinBar,
                        openOnMsg: webim.openOnMsg,
                        loginName: webim.params.loginname,
                        loginId: parseInt(webim.params.loginid),
                        activeId: webim.seller_id,
                        showCloseBtn: webim.closeBtn,
                        showMinBtn: webim.minBtn,
                        defaultOpenMinBar: true,
                        showMinBar: webim.showMinBar,
                        extraInfo: JSON.stringify({pid: webim.pinfo.pid}),
                        onMsg: function (unReadMsg) {
                            var unRendMsgCnt = 0;
                            (unReadMsg || []).forEach(function (c) {
                                if (c.formUserId == webim.seller_id) {
                                    unRendMsgCnt += c.total;
                                }
                            });
                            if (unRendMsgCnt > 0) {
                                $("#unreadcnt").show();
                                $("#unreadcnt").text(unRendMsgCnt);
                                $(".msgNumber").show();
                                $(".msgNumber").text(unRendMsgCnt);
                            } else {
                                $("#unreadcnt").hide();
                                $(".msgNumber").hide();
                            }
                        },
                        onMounted: function() {
                            if(webim.is_ecerurl && webim.chat_type > 0) {
                                window.ECERIM.chatAV(webim.chat_type);
                            }
                        }
                    }

                    window.ECERIM.init({
                        showCloseBtn: webim.closeBtn,
                        showMinBtn: webim.minBtn,
                        onReady: function() {
                            setTimeout(function(){
                                window.ECERIM.update(config);
                            }, 300)
                        }
                    })
                } else {
                    //从ecer转过来的
                    if(webim.ecer_account){
                        //如果有帐号，则直接注册，音视频
                        loadScript(webim.config.path + "md5.js", function () {
                            webim.ecer_account_import();
                        })
                    }else {
                        // 加载完JS，然后初始化IM，假装这个时候客户还没注册
                        window.ECERIM.init({
                            appId: webim.params.config.appid,
                            defaultShowMinBar: webim.defaultShowMinBar,
                            openOnMsg: webim.openOnMsg,
                            showCloseBtn: webim.closeBtn,
                            showMinBtn: webim.minBtn,
                            defaultOpenMinBar: true,
                            showMinBar: webim.showMinBar,
                            extraInfo: JSON.stringify({pid: webim.pinfo.pid}),
                        });
                        webim.chatnow();
                    }
                }
            });
        }
    } );
    $.ajaxSetup( { cache : true } );
    $.getScript( webim.config.path + "uuid.js", function ()
    {
        webim.get_session_id();
    } );
    $.getScript( webim.config.path + "md5.js" );
    if(webim.is_ecerurl && !webim.ecer_account) {
        loadScript( webim.config.path + "layer/layer.js", function ()
        {
            layer.config( { "path" : webim.config.path + "layer/" } );
        } );
    }else{
        $.getScript( webim.config.path + "layer/layer.js", function ()
        {
            layer.config( { "path" : webim.config.path + "layer/" } );
        } );
    }

    $.ajaxSetup( { cache : false } );
})

function focusNextInput(thisInput){
    var inputs = $("#pop_info").find("input:visible");
    for(var i = 0;i<inputs.length;i++){
        // 如果是最后一个，则焦点回到第一个
        if(i==(inputs.length-1)){
            webim.webim_start_chat();
        }else if(thisInput == inputs[i]){
            inputs[i+1].focus();
            break;
        }
    }
}