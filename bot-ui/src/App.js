import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Greeting from "./components/Greeting";
import User from "./components/User";
import Form from "./components/Form";
import { nanoid } from "nanoid"

function App(props) {

    const [users, setUsers] = useState([]);
    console.log(users);

    // const friendsList = prop.friends.map(friend => (
    //   <User id={friend.id} name={friend.name} />
    // ));

    // const usersList = users.map(user => (
    //     <User 
    //         key={user.id}
    //         id={user.id} 
    //         name={user.screen_name}
    //     />
    //   ));

    const usersList = users.map(user => (
        <User 
            user={user}
        />
      ));

    // function addFriend(friend) {
    //     const newFriend = { id: "friend-" + nanoid(), name: friend };
    //     setFriends([...friends, newFriend]);
    // };


    function updateUsers(newUsers) {
        setUsers(newUsers);
    };

    return (
    <div className="botsense-main">
        <Navbar />
        <Greeting />
        <Form updateUsers={updateUsers}/>
        <ul>
            {usersList}
        </ul>
    </div>
  );
}

export default App;
