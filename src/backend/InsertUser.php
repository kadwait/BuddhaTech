<?php
include 'Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [
    'firstname' => $_POST['first_name'],
    'lastname' => $_POST['last_name'],
    ];

    function update($conn, $table_name, $data, $ema){
        $para = [];
        foreach($data as $key => $value){
            $para[] = $key . "='" . $value . "'";
        }
        $para_string = implode(',', $para);

        $sql2 = "UPDATE $table_name SET $para_string WHERE email = '$ema'";
        if (mysqli_query($conn, $sql2)) {
            echo json_encode(['message' => 'Data inserted successfully']);
          } else {
            echo json_encode(['error' => 'Error inserting data: ' . mysqli_error($conn)]);
        }
        mysqli_close($conn);
    }
}
    update($conn, 'user', $data, $_POST['email']);
?>