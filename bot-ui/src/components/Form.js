import React, { useEffect, useState } from "react";

function Form(props) {

    const [name, setName] = useState('')

    function handleChange(e) {
        setName(e.target.value);
    }

    async function getUser() {

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ screen_name: name })
        };

        const 
            response = await fetch("http://localhost:5000/api/v1/getUser", requestOptions),
            user = await response.json();
        
        props.updateUsers(user);
    };

    async function getFriends() {
        const 
            response = await fetch("http://localhost:5000/api/v1/friendsList"),
            friends = await response.json();
        
        props.updateUsers(friends);
    };

    async function getFollowers() {
        const 
            response = await fetch("http://localhost:5000/api/v1/followersList"),
            followers = await response.json();

        props.updateUsers(followers);
    };



    // The reason why only last friend/follower makes it to the App.js list is due to rendering only happening once
    // TODO: Add check user button based on input, needs new API on INT to get by screen_name

    return (
        <form onSubmit={getUser}>
            <div>
                <input  
                    type="text" 
                    className="nameInput" 
                    id="name" 
                    value={name}
                    onChange={handleChange}
                /> 
                <button 
                    className="chUser" 
                    type="button" 
                    onClick={getUser}
                >
                    Check User 
                </button> 
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