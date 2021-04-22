import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

function SideBar() {

    const [loggedUser, setLoggedUser] = useState({
        profile_image_url_https: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
        screen_name: ''
    }); 

    async function authorizeAPI() {
        const 
            response = await fetch("http://localhost:5000/api/v1/auth"),
            authURL = await response.json();

        console.log("Authorization URL: " + authURL);
        window.open(authURL);

        return "Openned new window for authentication...";
    };

    async function checkAPI() {
        const response = await fetch("http://localhost:5000/api/v1/apiReady");
        console.log(response.status);
        return response;
    };

    async function getUserProfile() {
        const 
            response = await fetch("http://localhost:5000/api/v1/profile"),
            profile = await response.json();

        return profile;
    };

    async function setupAPI() {
        const 
            resp = await authorizeAPI(),
            ready = await checkAPI(),
            profile = await getUserProfile();
        
        setLoggedUser(profile);
        localStorage.setItem('user', loggedUser);
        console.log(loggedUser);
        console.log("END OF EXECUTION");
    };

    return (
        <Nav defaultActiveKey="/home" variant="tabs" className="flex-column">
            <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/help">Help</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={setupAPI}>Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href={"https://twitter.com/" + loggedUser.screen_name}>
                    <Image src={loggedUser.profile_image_url_https} rounded height="48" width="48" />
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
  }

  export default SideBar;