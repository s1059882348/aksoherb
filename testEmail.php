<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2021/4/23
 * Time: 15:17
 */

if(!$_POST['email']){
    echo json_encode(array('error_code'=>1,'error_msg'=>"邮箱地址必填！"));exit;
}

echo postmail_test('suyi1059882348@qq.com',$_POST['subject'],$_POST['message'].'<br /> 邮箱：'.$_POST['email']);exit;

function postmail_test($to,$subject = '',$body = ''){
    //$to 表示收件人地址 $subject 表示邮件标题 $body表示邮件正文
//    error_reporting(E_STRICT);
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
    $mail->Host       = 'mail.sohu.com';      // SMTP 服务器
    $mail->Port       = 465;                   // SMTP服务器的端口号       587/465/25
    $mail->Username   = 'sunnyjia@sohu.com';  // SMTP服务器用户名，账号就是qq邮箱号
    $mail->Password   = 'K98GQHXE35AZJ';            // SMTP服务器密码  那个授权码
    $mail->SetFrom('sunnyjia@sohu.com', 'blue');   // 发件人的邮箱地址和昵称
    $mail->Subject    = $subject;
    $mail->AltBody    = 'To view the message, please use an HTML compatible email viewer!'; // optional, comment out and test
    $mail->MsgHTML($body);
    $address = $to;
    $mail->AddAddress($address, '');
//    $mail->AddAttachment("images/403.jpg");      // attachment 附件
    $mail->IsHTML(true); //是否使用HTML格式
    if(!$mail->Send()) {
        return json_encode(array('error_code'=>1,'error_msg'=>'Mailer Error: ' . $mail->ErrorInfo));
    } else {
        return json_encode(array('error_code'=>0,'error_msg'=>"Message sent!恭喜，邮件发送成功！"));
    }
}
?>