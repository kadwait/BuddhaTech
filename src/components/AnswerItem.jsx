import React, { useState } from "react";

export default function AnswerItem(props) {
  
  const [heldOption, setHeldOption] = React.useState(false)

  React.useEffect(() => {
    if(props.parentKey === props.submitted_answer.parentKey){
        if(props.submitted_answer.keyUse === props.keyForUsage){
            setHeldOption(true)
        }
        else{
            setHeldOption(false)
        }
    }
    else{
        setHeldOption(false)
    }
},[props])   


  function handleChoose(){
    if(!props.checkAnswer.submit){
        props.function({
            keyUse: props.keyForUsage,
            value: props.item,
            parentKey: props.parentKey
        })
    }
  }

  let styleVar

    if(props.correct_answer === props.item && props.checkAnswer.submit){
        styleVar = {
            backgroundColor: '#94D7A2',
            border: 'none'
        }
    }
    else if(props.submitted_answer.keyUse === props.keyForUsage && props.checkAnswer.submit){
        styleVar = {
            backgroundColor: '#F8BCBC',
            color: '#969CBA',
            border: 'none' 
        }
    }
    else{
        if(props.checkAnswer.submit){
            styleVar = {
                backgroundColor: 'transparent',
                border: '1px solid #969CBA',
                color: '#969CBA'
            }
        }
        else{
            styleVar = {
                backgroundColor: heldOption ? '#D6DBF5' : 'transparent'
            }
        }
    }

    const itemVar = (
        <div className="answer-item" onClick={handleChoose} style={styleVar}>
            <p>{props.item}</p>
        </div>
    )

    return itemVar
}
