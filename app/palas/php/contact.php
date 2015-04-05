
<?php

// grab recaptcha library
require_once "recaptchalib.php";

if(!$_POST) exit();



///////////////////////////////////////////////////////////////////////


// Enter your email address below.
$to_address = "email_address@gmail.com"; 

// Enter your secret key (google captcha)
$secret = "6Ld41gITAAAAAFjfJWE_Kj4qxE0cOoGmeq8TVw2e";
 

//////////////////////////////////////////////////////////////////////




// Security - Verify if data has been entered
if ( empty($_POST['val_email']) && empty($_POST['val_message']) && empty($_POST['val_subject']) ) {
	$required_data = false;
} else {
  $required_data = true;
}


// Test Data
function test_data($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

// Data
$name = test_data($_POST["val_fname"]) . " " . test_data($_POST["val_lname"]);
$email = test_data($_POST["val_email"]);
$comment = test_data($_POST["val_message"]) . " [contact form]";
$subject = test_data($_POST["val_subject"]);



// Message Content
$body = "You have been contacted by $name." .  "\r\n" . "\r\n";
$content = $comment . "\r\n" . "\r\n";
$reply = "You can contact $name at: $email.";

$message = wordwrap($body . $content . $reply, 70);


// Headers
$headers = "From: $name <$email>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";
$headers .= "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8" . "\r\n";
$headers .= "Content-Transfer-Encoding: quoted-printable" . "\r\n";




// Google CAPTCHA
$resp = null; // empty response
$reCaptcha = new ReCaptcha($secret); // check secret key


// if submitted check response
if ($_POST["g-recaptcha-response"]) {
    $resp = $reCaptcha->verifyResponse(
        $_SERVER["REMOTE_ADDR"],
        $_POST["g-recaptcha-response"]
    );
}


// if everything is ok, send email
if ($resp != null && $resp->success && $required_data != false) {

    // Please ensure that PHP mail() function is correctly configured on your server.
  	if ( mail($to_address, $subject, $message, $headers) ) {
  		$result = array ('response'=>'success');
  	} else {
  		$result = array ('response'=>'error');
  	}
	
} else {
	$result = array ('response'=>'error');
}


// Send result to display the message
echo json_encode($result);

?>
