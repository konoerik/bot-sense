import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

function MainArea(props) {

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
        props.setFriendsOrFollowers("friends");
    };

    async function getFollowers() {
        const 
            response = await fetch("http://localhost:5000/api/v1/followersList"),
            followers = await response.json();

        props.updateUsers(followers);
        props.setFriendsOrFollowers("followers");
    };

    return (
        <InputGroup className="mb-3">
            <FormControl
                placeholder="username..."
                aria-label="username..."
                aria-describedby="basic-addon2"
                onChange={handleChange}
                onSubmit={getUser}
            />
            <InputGroup.Append>
                <Button variant="outline-primary" onClick={getUser}> Inspect User</Button>
                <Button variant="outline-primary" onClick={getFriends}>Check My Friends</Button>
                <Button variant="outline-primary" onClick={getFollowers}>Check My Followers</Button>
            </InputGroup.Append>
        </InputGroup>
    );
  }

  export default MainArea;