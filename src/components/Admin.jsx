import React, {useState,useEffect} from "react"
import { useLocation,useNavigate,Link } from "react-router-dom"
import NormalHeader from "./NormalHeader"
import SideBar from "./SideBar"

export default function Admin(){


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
    const eachSubject = bal.map((item,index) => {
        return (
            <div className="each-con-sub" key={index}>
                <div className="name-sub">{item.subject_name}</div>
                <div className="up-sub">Update</div>
                <div className="up-del">Delete</div>
            </div>
        )
    })

    const normalRender = (
        <>
            <NormalHeader/>
            <main>
                <div className="wrapper">
                    <SideBar />
                    <div className="main-content">
                        <div className="child-div">
                            <div className="sub-cons">SUBJECTS</div>
                            {eachSubject}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )

    return normalRender
}