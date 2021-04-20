import React, { useState } from "react";

function Navbar() {

    const [loggedUser, setLoggedUser] = useState({profile_image_url_https: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'}); 

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
        <div className="navBar" >
            <nav class="navbar bg-dark navbar-expand-lg navbar-dark" >
                <a className= "nav-link" href="http://localhost:3000"> Home  </a>
                <a className="nav-link"  href="help.html">   Help  </a>
                <button 
                    className="nav-link" 
                    type="button" 
                    onClick={setupAPI}
                    >
                        Login
                </button>
                <img src={loggedUser.profile_image_url_https} alt="img" height="48" width="48"></img>
                <div className="collapse navbar-collapse" id="navbarSupportedContent"></div>
            </nav>
        </div>
    );
  }

  export default Navbar;