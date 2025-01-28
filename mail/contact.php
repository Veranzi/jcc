<?php
// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get JSON input from the request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Extract form values
    $name = $data['name'];
    $email = $data['email'];
    $subject = $data['subject'];
    $message = $data['message'];

    // Email configuration
    $to = "veranziverah@gmail.com"; // Replace with your recipient email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Email body
    $emailBody = "Name: $name\n";
    $emailBody .= "Email: $email\n";
    $emailBody .= "Subject: $subject\n";
    $emailBody .= "Message: $message\n";

    // Send email
    if (mail($to, $subject, $emailBody, $headers)) {
        echo json_encode(["status" => "success", "message" => "Email sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to send email."]);
    }
} else {
    http_response_code(405); // Method not allowed
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
