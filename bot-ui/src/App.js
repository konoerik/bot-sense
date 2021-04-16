import React from "react";

function App() {

    function handleClick(e) {
        e.preventDefault();
        console.log("Click");

        fetch("http://localhost:5000/api/v1/auth")
            .then(response => response.json())
            // .then(res => console.log(res));
            .then(res => localStorage.setItem('authURL', res));

        window.open(localStorage.getItem('authURL'));

        // After authentication, can collect some data from user, populate info etc.

    }

    function sendVerifier(e) {
        e.preventDefault();
        console.log("Clicked!");

        const verifier = window.location.href.split('oauth_verifier=')[1];
        console.log(verifier);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ 'x': 1, 'y': 2, 'oauth_verifier': verifier })
        };

        fetch("http://localhost:5000/api/v1/authver", requestOptions)
            .then(response => response.json())
            .then(res => console.log(res));
    }

    function getFriendsList(e) {
        e.preventDefault();

        fetch("http://localhost:5000/api/v1/friendsList")
            .then(response => response.json())
            .then(res => console.log(res));
    }

    return (
    <div className="botsense-main">
        <div className="navBar" >
            <nav class="navbar bg-dark navbar-expand-lg navbar-dark" >
                <a className= "nav-link" href="http://localhost:3000"> Home  </a>
                <a className="nav-link"  href="help.html">   Help  </a>
                <a className="nav-link"  href="" onClick={handleClick}>    Login  </a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent"></div>
            </nav>
        </div>
        <div className="t2"><h2>BotSense® is a KSU Project</h2> </div>
        <div className ="expPrg"> 
            <p>
                BotSense checks the activity of a Twitter account and gives it a score. 
                Higher scores mean more bot-like activity. Use of this service requires Twitter authentication and permissions. 
                If you have questions or need help, please click on "Help" button in the navigation bar. 
                BotSense is a project of the College of Computing and Software Engineering at Kennesaw State University.
            </p>
        </div>
        <form>
            <div>
                <input  type="text" className="nameInput" id="name" placeholder="Enter a @userName"></input>
                <button className="chUser" type="button" href="https://twitter.com/">Check User </button> 
                <button 
                    className="chFriends" 
                    type="button" 
                    onClick={getFriendsList}
                    >
                        Check Friends
                </button>
                
            </div>
        </form>
    </div>
  );
}

export default App;
