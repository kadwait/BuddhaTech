<?php
include 'Connection.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

$user_name = $_POST['user_name'];


$checkQUery = "SELECT * FROM user WHERE email = '$user_name' OR username = '$user_name'";
$val = mysqli_query($conn,$checkQUery);

$json = array();
while($row = mysqli_fetch_assoc($val)){
    $json[] = $row;
}
echo json_encode(array("users" => $json));
}
?>