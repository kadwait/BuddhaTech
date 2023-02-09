<?php
include 'Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $subject_id = $_POST['subject_id'];
    $question = $_POST['question'];
    $answer[0] = $_POST['answerOne'];
    $answer[1] = $_POST['answerTwo'];
    $answer[2] = $_POST['answerThree'];
    $answer[3] = $_POST['correct'];

    $sql = "INSERT INTO questions (question, subject_id) VALUES ('$question', '$subject_id')";
    $result = mysqli_query($conn, $sql);
    if (!$result) {
        echo json_encode(['error' => 'Error inserting question: ' . mysqli_error($conn)]);
        mysqli_close($conn);
        return;
    }
    $last_id = mysqli_insert_id($conn);

        for($i = 0; $i<=2; $i++){
        $sql1 = "INSERT INTO answers (question_id, answer, answer_status) VALUES ('$last_id', '$answer[$i]', 'INCORRECT')";
        $result1 = mysqli_query($conn, $sql1);
        }
        $sql2 = "INSERT INTO answers (question_id, answer, answer_status) VALUES ('$last_id', '$answer[3]', 'CORRECT')";
        $result2 = mysqli_query($conn, $sql2);
        if (!$result1 || !$result2) {
            echo json_encode(['error' => 'Error inserting answer: ' . mysqli_error($conn)]);
            mysqli_close($conn);
            return;
        }
      

    echo json_encode(['message' => 'Data inserted successfully']);
    mysqli_close($conn);
}
?>