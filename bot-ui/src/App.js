import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Greeting from "./components/Greeting";
import User from "./components/User";
import Form from "./components/Form";
import { nanoid } from "nanoid"

function App(props) {

    const [friends, setFriends] = useState([]);
    // console.log(friends);

    // const friendsList = prop.friends.map(friend => (
    //   <User id={friend.id} name={friend.name} />
    // ));

    const friendsList = friends.map(friend => (
        <User 
            id={friend.id} 
            name={friend.name}
        />
      ));

    function addFriend(friend) {
        const newFriend = { id: "friend-" + nanoid(), name: friend };
        setFriends([...friends, newFriend]);
        console.log("Modified friendsList...");
        console.log(friendsList);
    };

    // function refreshFriendsView(friends) {
    //     console.log("Friends argument...");
    //     console.log(friends);

    //     friends.map(friend => (
    //         setFriendsList[...friendsList,
    //             <User 
    //                 id= {"friend-" + nanoid()}  
    //                 name={friend.screen_name}
    //             />]
    //     ));

    //     console.log("Friends list...");
    //     console.log(friendsList);
    // };
    // function showFriends(friends) {
    //     // console.log(friends);
    //     addFriend(friends[0].screen_name);
    // }

    // function showFollowers(followers) {
    //     showFriends(followers)
    // }

    return (
    <div className="botsense-main">
        <Navbar />
        <Greeting />
        <Form addFriend={addFriend}/>
        <ul>
            {friendsList}
        </ul>
    </div>
  );
}

export default App;
