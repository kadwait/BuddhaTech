import SideBar from "./SideBar";
import NormalHeader from "./NormalHeader";
import React,{ useState, useEffect} from "react";

export default function CreateQuestion(){

    const [subject,setSubject] = useState("")
    useEffect(() => {
        async function fetchData() {
        const response = await fetch('http://localhost/mock-questions/src/backend/SubjectList.php');
        const json = await response.json();
        setSubject(json.subjects);
        }
        fetchData();
    }, []);

    const bal = Object.values(subject)

    const [subjectId,setSubjectId] = useState()
    const [question,setQuestion]= useState()
    const [correct,setCorrect] = useState()
    const [optionOne,setOptionOne] = useState()
    const [optionTwo,setOptionTwo] = useState()
    const [optionThree,setOptionThree] = useState()

    console.log(bal)

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost/mock-questions/src/backend/InsertQuestion.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `subject_id=${subjectId}&question=${question}&correct=${correct}&answerOne=${optionOne}&answerTwo=${optionTwo}&answerThree=${optionThree}`,
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message)
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    };

    return (
        <>
            <NormalHeader/>
            <main>
                <div className="wrapper">
                    <SideBar />
                    <div className="main-content">
                        <div className="child-div">
                            <div className="sub-cons">Questions</div>
                            <div className="form-das">
                                <form className="dasst" onSubmit={handleSubmit}>
                                    <label htmlFor="subject">Subject:</label>
                                    <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
                                        {bal.map((item) => (
                                        <option key={item.subject_id} value={item.subject_id}>
                                            {item.subject_name}
                                        </option>
                                        ))}
                                    </select>
                                    <div className="question-div">
                                        <input
                                        type="text"
                                        id="question"
                                        placeholder="Question"
                                        value={question}
                                        onChange={(event) => setQuestion(event.target.value)}
                                        />
                                    </div>
                                    <div className="correct-div">
                                        <input
                                        type="text"
                                        id="correct"
                                        placeholder="Correct Answer"
                                        value={correct}
                                        onChange={(event) => setCorrect(event.target.value)}
                                        />
                                    </div>
                                    <div className="answer-divst">
                                        <input
                                        type="text"
                                        id="optionOne"
                                        placeholder="First Option"
                                        value={optionOne}
                                        onChange={(event) => setOptionOne(event.target.value)}
                                        />
                                        <input
                                        type="text"
                                        id="optionTwo"
                                        placeholder="Second Option"
                                        value={optionTwo}
                                        onChange={(event) => setOptionTwo(event.target.value)}
                                        />
                                        <input
                                        type="text"
                                        id="optionThree"
                                        placeholder="Third option"
                                        value={optionThree}
                                        onChange={(event) => setOptionThree(event.target.value)}
                                        />
                                    </div>
                                    <div className="btn-desig">
                                        <button>create</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>        
                </div>
            </main>
        </>
    )
}