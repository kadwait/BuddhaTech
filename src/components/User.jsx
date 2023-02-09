import NormalHeader from "./NormalHeader"
import { useLocation } from "react-router-dom"
import React,{useState, useEffect} from "react"

export default function User(){

    const [firstName,setFirstName] = useState()
    const [lastName,setLastName] = useState()
    const [email,setEmail] = useState()

    const location = useLocation()
    const [noraml,setNoraml] = useState()

    console.log(firstName)

    useEffect(() => {
        fetch('http://localhost/mock-questions/src/backend/SelectUser.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `user_name=${location.state.user_name}`,
        })
          .then((response) => response.json())
          .then((data) => {
            setFirstName(data.users[0].firstname)
            setLastName(data.users[0].lastname)
            setEmail(data.users[0].email)
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }, []);

    const handleSubmit = (e) => {
            e.preventDefault();
            fetch('http://localhost/mock-questions/src/backend/InsertUser.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: `first_name=${firstName}&last_name=${lastName}&email=${email}`,
            })
              .then((response) => response.json())
              .then((data) => {
                alert(data.message)
              })
              .catch((error) => {
                console.error('Error:', error);
              });
        };



    return(
        <>
            <NormalHeader user={typeof location !== undefined ? location.state.user_name : "GUEST"}/>
            <main className="main-rec">
                <div className="content-rec">
                    <div className="man"></div>
                    <div className="formcon">
                        <div className="user-up">Update Profile</div>
                        <form onSubmit={handleSubmit}>
                            <div className="first-div">
                                <input
                                type="text"
                                id="firstname"
                                placeholder="Firstname"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                />
                            </div>
                            <div className="last-div">
                                <input
                                type="text"
                                id="lastname"
                                placeholder="Lastname"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                                />
                            </div>
                            <button className="btnst">Save</button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}