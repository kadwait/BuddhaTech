import React, {useState,useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NormalHeader from "./NormalHeader";

export default function Subject(props){

    const navigate = useNavigate()
    const location = useLocation()
    const [subject,setSubject] = useState("")
    useEffect(() => {
        async function fetchData() {
        const response = await fetch('http://localhost/mock-questions/src/backend/SubjectList.php');
        const json = await response.json();
        setSubject(json.subjects);
        }
        fetchData();
    }, []);

    const dataVal = subject
    let mapData;

    if(dataVal){
        mapData = dataVal.map((item) => {
            return (
                <div className="each-subject" key={item.subject_id}>
                    <div className="name-area"><p>{item.subject_name}</p></div>
                    <div className="area">
                        <div className="marks">
                            <p>FM:100</p>
                            <p>PM:40</p>
                        </div>
                        <button onClick={() => mapQuestions(item.subject_id)}>Start Test</button>
                    </div>
                </div>
            )
        })
    }

    function mapQuestions(subject_id){
        navigate("/question", {
            state: {
                id:subject_id,
                user_name: location.state.user_name,
                user_logged: location.state.user_logged
            },
        });
    }

    function logout(){
        navigate("/")
    }

    const normalRender = (
        <>
            <NormalHeader user={typeof location !== undefined ? location.state.user_name : "USERNAME"}/>
            <main className="container-subject">
                <div className="con-subject">
                    {subject && mapData}
                </div>
            </main>
        </>
    )

    let showRender = (
        <div>No Access</div> 
    )
    if(typeof location !== undefined){
        if(location && location.state && location.state.user_name){
            showRender = normalRender
        }
    }

    return showRender
}