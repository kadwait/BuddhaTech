import { useLocation,useNavigate,Link } from "react-router-dom"

export default function SideBar(){



    return(
        <div className="side-bar">
            <div><Link to="/admin" className="divst">Subjects</Link></div>
            <div><Link to="/createQuestion" className="divst">Questions</Link></div>
            <div><Link to="/addSubject" className="divst">Add Subjects</Link></div>
        </div>
    )
}