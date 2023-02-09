<?php
include 'Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $first_name = $_POST['firstname'];
    $last_name = $_POST['lastname'];
    $user_role = "2";
    $email = $_POST['email'];
    $user_name = $_POST['firstname'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm'];

    $sql = "SELECT * FROM user WHERE username = '$user_name'";
    $data = mysqli_query($conn, $sql);

    $sql1 = "SELECT * FROM user WHERE email = '$email'";
    $data1 = mysqli_query($conn, $sql);

    if($password != $confirm_password){
        echo json_encode(['message' => 'Password do not match']);
    }
    elseif(mysqli_num_rows($data) > 0){
      echo json_encode(['message' => 'User name already exists']);
    }else if(mysqli_num_rows($data1) > 0){
      echo json_encode(['message' => 'Email already exists']);
    }else{
        $sql = "INSERT INTO user (email, password, firstname, lastname, username, user_role) VALUES ('$email', '$password', '$first_name', '$last_name', '$user_name', '$user_role')";

        if (mysqli_query($conn, $sql)) {
          echo json_encode(['message' => 'Data inserted successfully']);
          $to = $email;
          $subject = "Email Verification";
          $message = "Please click the link to verify your email: http://localhost/Mock_questions/user_verification.php?email=$email";
$headers = "From: mock_questions@gmail.com" . "\r\n";
          if (mail($to, $subject, $message, $headers)) {
            echo json_encode(['message' => "VALID"]);
          } else {
            echo json_encode(['message' => "Failed to send email"]);
          }
        } else {
          echo json_encode(['error' => 'Error inserting data: ' . mysqli_error($conn)]);
        }

    }

    mysqli_close($conn);
}
?>