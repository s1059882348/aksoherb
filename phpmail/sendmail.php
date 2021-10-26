<?php
    //引入PHPMailer的核心文件
    require './class.phpmailer.php';
    require './class.smtp.php';
 
    //实例化PHPMailer核心类
    $mail = new PHPMailer();
    
    //$mail->SMTPDebug = 1;
    //是否启用smtp的debug进行调试

    $mail->isSMTP();
    //使用smtp鉴权方式发送邮件

    $mail->SMTPAuth = true;
    //smtp需要鉴权 这个必须是true

    $mail->Host = 'smtp.163.com';
    //链接qq域名邮箱的服务器地址
 

    $mail->SMTPSecure = 'ssl';
    //设置使用ssl加密方式登录鉴权

    $mail->Port = 465;
    //设置ssl连接smtp服务器的远程服务器端口号
    
    $mail->CharSet = 'UTF-8';
    //设置发送的邮件的编码

    $mail->FromName = 'wangrain';
    //设置发件人昵称 

    $mail->Username = 'wangrain2021@163.com';
    //smtp登录的账号

    $mail->Password = 'TVISKJXPPFQFXNCC';
    //smtp登录的密码 使用生成的授权码16位

    $mail->From = 'wangrain2021@163.com';
    //设置发件人邮箱地址 同登录账号
    
    $mail->isHTML(true);
    //邮件正文是否为html编码

    $mail->addAddress("aksoherb@hotmail.com");
    //设置收件人邮箱地址，要发送多个则多次调用方法即可


    $mail->Subject = 'Test Mail Subject';
    //添加该邮件的主题

    $mail->Body = "Test Mail Body";
    //添加邮件正文

    //发送邮件 返回状态
    if(!$mail->send()){
       echo '邮件发送失败'.'</br>';
       echo '错误原因'.$mail->ErrorInfo;
     }else{
        echo '邮件发送成功';
        
     }

?>