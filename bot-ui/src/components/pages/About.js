import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


function About() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Nav.Link variant="primary" onClick={handleShow}>About</Nav.Link>
        <Modal
            size="lg"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>About Us</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>What is BotSense? </h3>
                <p> 
                    BotSense is a project of the Software Engineering Capstone class, Spring 
                    2021 at Kennesaw State University. BotSense uses a machine learning 
                    classification algorithm to separate bot-like from human-like activity, and
                    notifies the user accordingly, allowing them to unfollow or block unwanted accounts.
                </p>

                <h3>What is a Twitter bot? </h3> 
                <p> 
                    Given this wide range of behaviors, there is no universally 
                    agreed-upon definition of bot. We define a social bot as a social 
                    media account controlled at least in part through software. 
                    Deceptive bots take on inauthentic personas and are controlled 
                    by unknown entities. Social media APIs provide methods to 
                    execute actions programmatically. 
                </p>

                <h3>What does the result mean?</h3>
                <p> 
                    The "result" shown next to the user name is based on a comparison
                    of many models trained on different kinds of bots and on user 
                    accounts. "Is a Bot" result means more bot-like activity. 
                    "Is NOT a Bot" result means most human-like activity. 
                </p>

                <h3>Why do I have to login to Twitter?</h3>
                <p> 
                    When a BotSense user check a Twitter user's bot status, 
                    this service uses Twitter's REST API in order to obtain 
                    data about that account. And after bot-score analysis, 
                    application user will receive the result. In order to use 
                    Twitter's API, the user must have a Twitter account and be 
                    logged in. The application user also needs permission to 
                    make API request to fetch user profiles and activity from accounts.
                </p>       

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
  }

  export default About;



