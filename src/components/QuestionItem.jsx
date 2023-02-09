import AnswerItem from "./AnswerItem";

export default function QuestionItem(props){

    const renderAnswer = props.answers.map((item,index) => {
        return (
            <AnswerItem 
                key={index}
                item={item}
                parentKey={props.keyUsage}
                keyForUsage={index}
                function={(answer) => props.function(answer)}
                correct_answer={props.correct_answer}
                submitted_answer={props.submittedAnswer}
                checkAnswer={props.checkAnswer}
            />
        )  
    })

    const itemVar = (
        <div className="each-question">
                <h3>{props.question}</h3>
                <div className='answer-items'>
                    {renderAnswer}
                </div>
        </div>
    )

    return itemVar
}