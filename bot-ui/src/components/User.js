import React from "react";

function User(props) {

    function unfollowUser() {
        console.log("Unfollow -> " + props.name);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ screen_name: props.name })
        };

        fetch("http://localhost:5000/api/v1/unfollowUser", requestOptions)
            .then(response => response.json())
            .then(res => console.log(res));
    }

    return (
        <li className="user stack-small">            
            <label id={props.id} className="chFriends" htmlFor={props.id}>
                {props.name}
            </label>
            <button type="button" className="chFriends" onClick={unfollowUser}>
                Unfollow
            </button>
            <button type="button" className="chFriends">
                Block
            </button>
        </li>
    );
  }

  export default User;