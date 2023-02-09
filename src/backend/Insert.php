<?php
include 'Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = $_POST['data'];
    
    $sql = "INSERT INTO user_role (role) VALUES ('$data')";
  
    if (mysqli_query($conn, $sql)) {
      echo json_encode(['message' => 'Data inserted successfully']);
    } else {
      echo json_encode(['error' => 'Error inserting data: ' . mysqli_error($conn)]);
    }
  
    mysqli_close($conn);
  }
?>
