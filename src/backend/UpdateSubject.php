<?php
include 'Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $subject_id = $_POST['subject_id'];
    $subject_name = $_POST['subject_name'];

    function update($conn, $table_name, $data, $sub_id){
        $para = [];
        foreach($data as $key => $value){
            $para[] = $key . "='" . $value . "'";
        }

        $para_string = implode(',', $para);
        $sub_id = "";
        $sql = "UPDATE $table_name SET $para_string WHERE subject_id = '$sub_id'";
        if (mysqli_query($conn, $sql)) {
            echo json_encode(['message' => 'Data inserted successfully']);
          } else {
            echo json_encode(['error' => 'Error inserting data: ' . mysqli_error($conn)]);
        }
        mysqli_close($conn);
    }
    update($conn, 'user', $data, '');
}
?>