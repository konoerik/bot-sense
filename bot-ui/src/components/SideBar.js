import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Model from "./pages/Model";

function SideBar(props) {

    const [loggedUser, setLoggedUser] = useState({
        profile_image_url_https: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
        screen_name: ''
    });

    async function authorizeAPI() {
        const 
            response = await fetch("http://localhost:5000/api/v1/auth"),
            authURL = await response.json();

        console.log("Authorization URL: " + authURL);
        const newWindow = window.open(authURL);

        return newWindow;
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
            newWindowRsp = await authorizeAPI(),
            ready = await checkAPI(),
            profile = await getUserProfile();
            newWindowRsp.close();
        
        setLoggedUser(profile);
        props.updateLogStatus(true);
        localStorage.setItem('user', loggedUser);
        // console.log(loggedUser);
        // console.log("END OF EXECUTION");
    };

    return (        
        <Nav defaultActiveKey="/" variant="tabs" className="flex-column">            
            <Nav.Item>                
                <About />
            </Nav.Item>
            <Nav.Item>                
                <Contact />
            </Nav.Item>
            <Nav.Item>                
                <Model />
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={setupAPI} disabled={loggedUser.screen_name!==''}>Login</Nav.Link>
            </Nav.Item>
             <Nav.Item>
                <Nav.Link href={"https://twitter.com/" + loggedUser.screen_name} target="_blank">
                    <Image src={loggedUser.profile_image_url_https} rounded height="48" width="48" />
                </Nav.Link>
            </Nav.Item>       
        </Nav>
    );
  }

  export default SideBar;