import React, { useState } from "react";

function Form(props) {

    const [users, setUsers] = useState([{'screen_name': 'default'}]);
    // const [users, setUsers] = useState([]);

    function isUserBot(user) {
        console.log("Checking following user for bot status...");
        console.log(user);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ screen_name: user.screen_name, 
                                   followers_count: user.followers_count, 
                                   verified: user.verified,
                                   friends_count: user.friends_count,
                                   listed_count: user.listed_count,
                                   statuses_count: user.statuses_count 
                                })
        };

        fetch("http://localhost:5000/api/v1/predict", requestOptions)
            .then(response => response.json())
            .then(res => console.log(res));
    }


    function getFriends(e) {
        setUsers([]);
        
        fetch("http://localhost:5000/api/v1/friendsList")
            .then(response => response.json())
            .then(res => setUsers(res))
            .then(isUserBot(users[0]))
            .then(props.addFriend(users[0].screen_name));
            // .then(friends => props.showFriends(friends));

        // console.log("I will try to update this...")
        // console.log(users);
        // props.addFriend(users[0].screen_name);

        // For each friend in the list, check if is a bot
        // then call addFriend with info and status
    }

    function getFollowers(e) {
        fetch("http://localhost:5000/api/v1/followersList")
            .then(response => response.json())
            .then(res => setUsers(res));
            // .then(followers => props.showFriends(followers));

        console.log("I will try to update this...")
        console.log(users);
        props.addFriend(users[0].screen_name);
    }

    

    return (
        <form>
            <div>
                <input  type="text" className="nameInput" id="name" placeholder="Input username..."></input>
                <button className="chUser" type="button" href="https://twitter.com/">Check User </button> 
            </div>
            <div>
            <button 
                className="chFriends" 
                type="button" 
                onClick={getFollowers}
                >
                    Check Followers
            </button>
            <button 
                className="chFriends" 
                type="button" 
                onClick={getFriends}
                >
                    Check Friends
            </button>
            </div>
        </form>
    );
  }

  export default Form;