import SideBar from "./SideBar"
import NormalHeader from "./NormalHeader"
import React,{ useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AddSubject(){

    const [subject,setSubject] = useState()
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost/mock-questions/src/backend/InsertSubject.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `subject=${subject}`,
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
            <NormalHeader />
            <main>
                <div className="wrapper">
                    <SideBar />
                    <div className="main-content">
                        <div className="child-div">
                            <div className="sub-cons">ADD - SUBJECTS</div>
                            <form onSubmit={handleSubmit}>
                                <div className="subject-div">
                                    <input
                                    type="text"
                                    id="subject"
                                    placeholder="Subject"
                                    value={subject}
                                    onChange={(event) => setSubject(event.target.value)}
                                    />
                                </div>
                                <div className="btn-desig">
                                    <button type="submit">Submit</button>
                                </div>          
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}