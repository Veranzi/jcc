<?php
if (empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(500);
    exit("Invalid input");
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$subject = strip_tags(htmlspecialchars($_POST['subject']));
$message = strip_tags(htmlspecialchars($_POST['message']));

$to = "info@jerusalemchurchofchrist.com"; // Updated email address
$emailSubject = "$subject: $name";
$emailBody = "You have received a new message from your website contact form.\n\n" . 
             "Here are the details:\n\n" . 
             "Name: $name\n\nEmail: $email\n\nSubject: $subject\n\nMessage: $message";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

if (mail($to, $emailSubject, $emailBody, $headers)) {
    echo "Success";
} else {
    http_response_code(500);
    echo "Error sending email";
}
?>
