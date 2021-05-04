import React, { useState } from "react";
import SideBar from "./components/SideBar";
import User from "./components/User";
import MainArea from "./components/MainArea";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import logo from "./logo.png";
import Alert from "react-bootstrap/Alert";

function App(props) {

    const [users, setUsers] = useState([]);
    const [logStatus, setLogStatus] = useState(false);
    const [show, setShow] = useState(true);
    const [friendsOrFollowers, setFriendsOrFollowers] = useState("friends");
    // console.log("These are the users");
    // console.log(users);

    const usersList = users.map(user => (
        <User 
            user={user}
            bot={"True"}
            friendsOrFollowers={friendsOrFollowers}
        />
    ));

    const usersList2 = users.map(user => (
        <User 
            user={user}
            bot={"False"}
            friendsOrFollowers={friendsOrFollowers}
        />
    ));

    // console.log("All Users List");
    // console.log(usersList);

    function updateUsers(newUsers) {
        setUsers(newUsers);
    };

    function updateLogStatus(status) {
        setLogStatus(status);
    };

    function alertLogin() {
        // console.log(logStatus);
        if (logStatus === false) {
            return (
                <Alert variant="warning" >
                    Thank you for visiting, please log in to Twitter from side-bar to begin!
                </Alert>
            )
        } else {
            if (show) {
                return(
                    <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                        Logged in successfully!
                    </Alert>
                )
            };
        }
    };

    return (
        <Container>
            <Row>
                <Image src={logo} alt="logo" width="100%" rounded />         
            </Row>
            <Row>
                <SideBar updateLogStatus={updateLogStatus} />
                <Col>
                    <Row>
                        <Card>
                            <Card.Body>
                                <b>BotSense</b> checks the activity of a Twitter account and uses Machine Learning to classify it based on several metrics. 
                                The result "Is a Bot" means more bot-like activity. And, the result "Is Not a Bot" means more human-like activity. 
                                Use of this service requires Twitter authentication and permissions. 
                                
                                For more information, check out the <i>About</i> link. 
                                To get in contact with the team, use the <i>Contact</i> link to share your message.
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row>
                        <MainArea updateUsers={updateUsers} setFriendsOrFollowers={setFriendsOrFollowers}/>
                    </Row>
                </Col>
            </Row>
            <Row>
                <p></p>
            </Row>
            {alertLogin()}
            <Row md="auto">
                <Col>{usersList.concat(usersList2)}</Col>
            </Row>
        </Container>
  );
}

export default App;
