<?php
if (empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(500);
<<<<<<< HEAD
    exit("Invalid input");
=======
    exit("Invalid form data.");
>>>>>>> 1d7955d89e4a30f8198504467853951cbee3eabc
}

// Sanitize input
$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$subject = strip_tags(htmlspecialchars($_POST['subject']));
$message = strip_tags(htmlspecialchars($_POST['message']));

<<<<<<< HEAD
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
=======
// Email configuration
$to = "veranziverah@gmail.com"; // Replace with your email
$subject = "$m_subject: $name";
$body = "You have received a new message from your website contact form.\n\n";
$body .= "Here are the details:\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Subject: $m_subject\n";
$body .= "Message: $message\n";

$header = "From: noreply@yourdomain.com\r\n"; // Use a valid email associated with your domain
$header .= "Reply-To: $email\r\n";
$header .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Attempt to send the email
if (!mail($to, $subject, $body, $header)) {
    http_response_code(500);
    exit("Email sending failed.");
}

http_response_code(200);
echo "Email sent successfully.";
>>>>>>> 1d7955d89e4a30f8198504467853951cbee3eabc
?>
