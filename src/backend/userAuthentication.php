<?php
include 'Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $user_name = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM user WHERE (username = '$user_name' OR email = '$user_name') AND password = '$password'";
    $data = mysqli_query($conn, $sql);

    if(mysqli_num_rows($data) > 0){
        $row = mysqli_fetch_assoc($data);
            if ($row['email_status'] == 'VERIFIED'){
                echo json_encode(['message' => 'VALID','user'=>$row['user_role']]);
            }
            else{
            echo json_encode(['message' => 'INVALID']);
            }
    }else{
        echo json_encode(['message' => 'INVALID']);
    }
}
?>

