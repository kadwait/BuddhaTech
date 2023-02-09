<?php
include 'Connection.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$checkQUery = "SELECT * FROM user";
$val = mysqli_query($conn,$checkQUery);

$json = array();
while($row = mysqli_fetch_assoc($val)){
    $json[] = $row;
}

echo json_encode(array("users" => $json));
?>