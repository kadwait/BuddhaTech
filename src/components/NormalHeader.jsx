import { useNavigate } from "react-router-dom"

export default function NormalHeader({user}){

    const navigate = useNavigate()
    function logout(){
        navigate("/")
    }

    function userPage(){
        navigate("/user",{
            state: {
                user_name: user
            }
        })
    }

    return (
        <header className="header-subject">
                <div className="left-section">
                    <div className="budhha-logo"></div>
                    <div className="subBtn"><p>Subjects</p></div>
                </div>
                <div className="right-section">
                    <span className="material-symbols-outlined">account_circle</span>
                    <h4 onClick={userPage}>{user}</h4>
                    <div onClick={logout} className="log-out">LOGOUT</div>
                </div>
        </header>
    )
}