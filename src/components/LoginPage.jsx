import React,{useState,useEffect,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderLog from "./HeaderLog";

export default function LoginPage(){

    const ReContext = React.createContext()

    const navigate = useNavigate()
    const [userName,setUserName] = useState("")
    const [userPassWord,setUserPassWord] = useState("")
    const [userLogged,setUserLogged] = useState(false)

    /*
    const [newVal,setNewVal] = useState();
    useEffect(() => {
        async function fetchData() {
        const response = await fetch('http://localhost/mock-questions/src/backend/userLists.php');
        const json = await response.json();
        setNewVal(json.users);
        }
        fetchData();
    }, []);*/

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost/mock-questions/src/backend/userAuthentication.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `username=${userName}&password=${userPassWord}`,
        })
          .then((response) => response.json())
          .then((data) => {
            if(data.message === 'VALID'){
                setUserLogged(true)
                console.log(data)
                if(data.user == 1){
                    navigate("/admin",{
                        state: {
                            user_name: userName,
                            user_logged: userLogged
                        }
                    })
                }
                else{
                    navigate("/subject",{
                        state: {
                            user_name: userName,
                            user_logged: userLogged
                        }
                    })
                }
            }
            else{
                setUserLogged(false)
                alert('Please fill the form correctly')
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    };

    function mapQuestions(subject_id){
        navigate("/question", {
            state: {
                id:subject_id
            },
        });
    }

    return(
        <ReContext.Provider value={{userLogged,setUserLogged}}>
            <>
            <HeaderLog value="WELCOME"/>
            <div className="hero">
                <form onSubmit={handleSubmit}>
                    <div className="username-div">
                        <input
                        type="text"
                        id="username"
                        placeholder="Username/Email"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                        />
                    </div>
                    <div>
                        <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={userPassWord}
                        onChange={(event) => setUserPassWord(event.target.value)}
                        />
                    </div>
                    <div className="btn-design">
                        <button type="submit">LOGIN</button>
                    </div>
                </form>
                <div className="small-text">FIRST TIME IN THIS WEBSITE</div>
                <Link to="/register" className="link">
                    <div className="sign-up">
                        <div className="container-sign">
                            <div>
                                <h3>SIGN IN WITH GOOGLE</h3>
                            </div>
                            <div>
                                <div className="gmail"></div>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="social">
                    <div className="img-hold"></div>
                </div>
            </div>
            </>
        </ReContext.Provider>
    );
}