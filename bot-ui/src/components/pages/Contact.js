import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";


function Contact() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Nav.Link variant="primary" onClick={handleShow}>Contact</Nav.Link>
        <Modal
            size="lg"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Contact Us</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Your Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email address..." />
                        
                    </Form.Group>

                    <Form.Group controlId="feedbackMessage">
                        <Form.Label>Your Message</Form.Label>
                        <Form.Control as="textarea" rows={10} placeholder="Enter your message..." />
                    </Form.Group>
                    <Form.File id="attachment" label="Screenshot or attachment?" custom />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
  }

  export default Contact;



