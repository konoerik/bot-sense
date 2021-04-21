import React, { useState } from "react";

function User(props) {

    const [bot, setBot] = useState('');
    const [blocked, setBlocked] = useState(false);
    const [unfollowed, setUnfollowed] = useState(false);

    console.log(bot, blocked, unfollowed);

    isUserBot(props.user);

    function isUserBot(user) {
        console.log("Checking <" + user.screen_name + "> for bot status...");
        // console.log(user);

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
                .then(json => setBot(json));           
    }

    function unfollowUser() {
        console.log("Unfollow -> " + props.user.screen_name);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ screen_name: props.user.screen_name })
        };

        fetch("http://localhost:5000/api/v1/unfollowUser", requestOptions)
            .then(response => response.json())
            .then(json => console.log(json))
            .then(setUnfollowed(true));
    }

    function blockUser() {
        console.log("Block -> " + props.user.screen_name);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ screen_name: props.user.screen_name })
        };

        fetch("http://localhost:5000/api/v1/blockUser", requestOptions)
            .then(response => response.json())
            .then(json => console.log(json))
            .then(setBlocked(true));
    }

    const defaultUserTemplate = (
        <label id={props.user.id} className="chFriends" htmlFor={props.user.id}>
                {props.user.screen_name}
            </label>
    );

    const strikedUserTemplate = (
        <s><label id={props.user.id} className="chFriends" htmlFor={props.user.id}>
                {props.user.screen_name}
            </label></s>
    );

    // Add more fields under label, or restructure the whole
    return (
        <li className="user stack-small">            
            { (blocked || unfollowed) ? strikedUserTemplate : defaultUserTemplate}
            <button type="button" className="chFriends" onClick={unfollowUser} disabled={unfollowed}>
                Unfollow
            </button>
            <button type="button" className="chFriends" onClick={blockUser} disabled={blocked}>
                Block
            </button>
            <br></br>
            <a href={"https://twitter.com/" + props.user.screen_name}> {props.user.name} </a>
            {bot}
            <br></br>
            <img src={props.user.profile_image_url_https} alt="img" height="48" width="48"></img>
        </li>
    );
  }

  export default User;