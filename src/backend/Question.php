<?php
include 'Connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$subject_id = $_POST['subject_id'];

$checkQUery = "SELECT * FROM questions WHERE subject_id = '$subject_id' ORDER BY RAND()";
//$checkQUery = "SELECT * FROM questions ORDER BY RAND()";
$val = mysqli_query($conn,$checkQUery);

$output = array();

while($question = mysqli_fetch_assoc($val)){
    $question_id = $question['question_id'];
    $sql = "SELECT answer FROM answers WHERE question_id = '$question_id' ORDER BY RAND()";
    $data = mysqli_query($conn, $sql);
    $answers = array();
    while($row1 = mysqli_fetch_assoc($data)){
        $answers[] = $row1['answer'];
    }

    $sql1 = "SELECT answer FROM answers WHERE answer_status = 'CORRECT' AND question_id = '$question_id'";
    $answer= mysqli_query($conn, $sql1);
    $corr_answer = mysqli_fetch_assoc($answer)['answer'];

    $output[] = array(
        "question" => $question['question'],
        "answers" => $answers,
        "correct_answer" => $corr_answer
    );
}

echo json_encode(array("questions" => $output));

mysqli_close($conn);
?>
