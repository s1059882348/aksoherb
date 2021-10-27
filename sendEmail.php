<?php
/**
 * Created by PhpStorm.
 * User: weili
 * Date: 2021/4/24
 * Time: 下午5:41
 * Description:
 */

if(!$_POST['email']){
    echo json_encode(array('error_code'=>1,'error_msg'=>"邮箱地址必填！"));exit;
}
//echo postmail('aksoherb@hotmail.com',$_POST['subject'],$_POST['message'].'<br /> 邮箱：'.$_POST['email']);exit;
echo postmail('info@aksoherb.com',$_POST['subject'],$_POST['message'].'<br /> 邮箱：'.$_POST['email']);exit;

function postmail($to,$subject = '',$body = ''){
    //$to 表示收件人地址 $subject 表示邮件标题 $body表示邮件正文
    date_default_timezone_set('Asia/Shanghai');//设定时区东八区
    require_once('phpmail/class.phpmailer.php');
    include('phpmail/class.smtp.php');
    $mail             = new PHPMailer(); //new一个PHPMailer对象出来
    $mail->CharSet ="UTF-8";//编码类型，默认ISO-8859-1，有中文使用"UTF-8"
    $mail->IsSMTP(); // 设定使用SMTP服务
    $mail->SMTPDebug  = 0;                     // 启用SMTP调试功能 0不启动
    // 1 = errors and messages
    // 2 = messages only
    $mail->SMTPAuth   = true;                  // 启用 SMTP 验证功能
    $mail->SMTPSecure = "ssl";                 // 安全协议，可以注释掉
    $mail->Host       = 'smtp.163.com';      // SMTP 服务器
    $mail->Port       = 465;                   // SMTP服务器的端口号       587/465/25
    $mail->Username   = 'wangrain2021@163.com';  // SMTP服务器用户名，账号就是邮箱号
    $mail->Password   = 'TVISKJXPPFQFXNCC';            // SMTP服务器密码  授权码
    $mail->SetFrom('wangrain2021@163.com', 'blue');   // 发件人的邮箱地址和昵称
    $mail->Subject    = $subject;
    $mail->AltBody    = 'To view the message, please use an HTML compatible email viewer!'; // optional, comment out and test
    $mail->MsgHTML($body);
    $address = $to;
    $mail->AddAddress($address, '');
    $mail->IsHTML(true); //是否使用HTML格式
    if(!$mail->Send()) {
        return json_encode(array('error_code'=>1,'error_msg'=>'Mailer Error: ' . $mail->ErrorInfo));
    } else {
        return json_encode(array('error_code'=>0,'error_msg'=>"Message sent!恭喜，邮件发送成功！"));
    }
}
?>