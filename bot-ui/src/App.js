import React, { useState } from "react";
import SideBar from "./components/SideBar";
import Greeting from "./components/Greeting";
import User from "./components/User";
import MainArea from "./components/MainArea";
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

function App(props) {

    const [users, setUsers] = useState([]);
    console.log(users);

    const usersList = users.map(user => (
        <User 
            user={user}
        />
      ));

    function updateUsers(newUsers) {
        setUsers(newUsers);
    };

    return (
        <Container>
            <Row>
                <h1 >BotSense® is a KSU Project</h1>
            </Row>
            <Row>
                <SideBar />
                <Col>
                    <Row>
                        <Card>
                            <Card.Body>
                                BotSense checks the activity of a Twitter account and gives it a score. 
                                Higher scores mean more bot-like activity. Use of this service requires Twitter authentication and permissions. 
                                If you have questions or need help, please click on "Help" button in the navigation bar. 
                                BotSense is a project of the College of Computing and Software Engineering at Kennesaw State University.
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row>
                        <MainArea updateUsers={updateUsers}/>
                        {/* {usersList} */}
                    </Row>
                    <Row md="auto">
                        <Col>{usersList}</Col>
                    </Row>
                    
                </Col>
            </Row>
        </Container>
  );
}

export default App;
