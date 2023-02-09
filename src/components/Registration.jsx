import HeaderLog from "./HeaderLog";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Registration(){
    const navigate = useNavigate()

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassWord] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost/mock-questions/src/backend/Registration.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `firstname=${firstName}&lastname=${lastName}&email=${email}&password=${password}&confirm=${confirmPassword}`,
        })
          .then((response) => response.json())
          .then((data) => {
            if(data.message === 'VALID'){
                navigate("/")
            }
            else{
                alert(data.message)
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    };

    return (
        <>
            <HeaderLog value="REGISTRATION"/>
            <div className="hero">
                <form className="sign-divs">
                    <div className="name-div">
                        <div className="firstname-div">
                            <input
                            type="text"
                            id="firstname"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            />
                        </div>
                        <div className="lastname-div">
                            <input
                            type="text"
                            id="lastname"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="email-div">
                        <input
                        type="email"
                        id="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="password-div">
                        <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassWord(event.target.value)}
                        />
                    </div>
                    <div className="confirm-div">
                        <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Re-enter Password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </div>
                    <div className="btn-design">
                        <button onClick={handleSubmit}>Register</button>
                    </div>
                </form>
            </div>
        </>
    );
}