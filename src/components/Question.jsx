import React, {useEffect,useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionItem from "./QuestionItem";
import {nanoid} from 'nanoid'

export default function Question(){

    const navigate = useNavigate()

    const location = useLocation()

    const [data, setData] = useState([]);

    //const [selectedAnswer, setSelectedAnswer] = useState({});
    let currentId = ""

    useEffect(() => {
    fetch('http://localhost/mock-questions/src/backend/Question.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `subject_id=${currentId}`,
    })
      .then((response) => response.json())
      .then((data) => {
        const withKey = data.questions.map((item) => ({
            ...item,
            keys: nanoid(),
        }));
        setData(withKey);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }, []);

    /*
    const eachQuestions = data.map((item,ind) => {
        return (
            <div className="each-question" key={ind}>
                <h3>{item.question}</h3>
                <div className="answer-items">
                    {
                        item.answers.map((answer,index) =>{
                            return (
                                <AnswerItem 
                                    key={index}
                                    answer={answer}
                                    parentKey={ind}
                                    id={index}
                                    setSelectedAnswer={setSelectedAnswer}
                                    questionIndex={ind}
                                    selected={selectedAnswer[ind] === index}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    })*/

    const [matchAns, setMatchAns] = useState(false)

    const [totalMarks, setTotalMarks] = useState()

    const [checkSubmit, setCheckSubmit] = useState({
        correctAnswer: false,
        wrongAnswer:true,
        heldState: false,
        submit: false
    })

    const [arrAnswers, setArrAnswers] = useState([])

    const [submittedComponents, setSubmittedComponents] = useState(['Default Value']);

    function validAllQuestionAnswered(){
        let answerSubmittedCount = 0
        for(let s=0; s<data.length; s++){
            for(let t=0; t<arrAnswers.length; t++){
                if(data[s].keys === arrAnswers[t].parentKey){
                    answerSubmittedCount++
                }
            }
        }
        return answerSubmittedCount
    }

    function calculateTotalMarks(){
        let rightAnswers = 0
            for(let k=0; k<arrAnswers.length; k++){
                for(let m=0; m<data.length; m++){
                    if(data[m].keys === arrAnswers[k].parentKey){
                        if(data[m].correct_answer === arrAnswers[k].value){
                            rightAnswers++
                        }
                    }
                }
            }
        return rightAnswers
    }

    function handleSubmit() {

        if(validAllQuestionAnswered() === data.length){

            setMatchAns(true)
            setCheckSubmit(prevVal => {
                return {
                    ...prevVal,
                    submit: true
                 }
            })

            setTotalMarks(calculateTotalMarks())
        }
        else{
            alert("Answer all the questions.")
        }   
    }
    
    function handlePlayAgain(){
        setMatchAns(false)
        setTotalMarks()
        setCheckSubmit({})
        setArrAnswers([])
        setSubmittedComponents(['Deafult Value'])
        navigate("/subject", {
            state: {
                user_name: location.state.user_name,
                user_logged: location.state.user_logged
            },
        });
    }

    function selectAsAnswer(answer) {

        setArrAnswers((prevVal) => {

            let foundVal = false
            for(let i=0; i<submittedComponents.length; i++){
                if(submittedComponents[i] === answer.parentKey){
                    foundVal = true
                }
            }

            let varSt = []
            
            if(!foundVal){
                varSt = [...prevVal,answer]
                setSubmittedComponents(prevValSt => [...prevValSt,answer.parentKey])
            }
            else{
                const mapArray = arrAnswers.map((item) => {
                    if(item.parentKey === answer.parentKey){
                        return {
                            ...answer
                        }
                    }
                    else{
                        return {
                            ...item
                        }
                    }
                })
                varSt = mapArray
            }
            return varSt   
        })
    }

    function findAnswerToQuestion(questionId){
        let arrToRetrn
        for(let m=0; m<arrAnswers.length; m++){
            if(arrAnswers[m].parentKey === questionId){
                arrToRetrn = {...arrAnswers[m]}
                break;
            }
        }
        return arrToRetrn
    }

    const varst = data.map((item,index) => {
        const submittedAnswerObj = findAnswerToQuestion(item.keys)
        return (
            <QuestionItem
                key={item.keys}
                keyUsage={item.keys}
                question={item.question}
                answers={item.answers}
                correct_answer={item.correct_answer}
                function={selectAsAnswer}
                checkAnswer={matchAns ? checkSubmit : {}}
                submittedAnswer={submittedAnswerObj ? submittedAnswerObj : { }}
            />
        )
    })

    const onStartVar = (
        <div className="question-area">
            {varst}
            <div className="btn-con">
                {matchAns && <h3 className="score-notify">You scored {totalMarks}/{data.length} correct answers</h3>}
                <button className="check-answer" onClick={!checkSubmit.submit ? handleSubmit : handlePlayAgain}>
                    {!checkSubmit.submit ? 'Check answers' : 'Go Back'}
                </button>
            </div>
        </div>
    )

    let showRender = (
        <div>No Access</div>
    )
    if(typeof location !== undefined){
        if(location && location.state && location.state.user_name){
            currentId = location.state.id
            showRender = onStartVar
        }
    }

    return showRender
}