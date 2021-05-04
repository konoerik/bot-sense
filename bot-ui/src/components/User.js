import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";

function User(props) {

    const [bot, setBot] = useState(':False');
    const [blocked, setBlocked] = useState(false);
    const [unfollowed, setUnfollowed] = useState(false);

    console.log(bot, blocked, unfollowed);

    isUserBot(props.user);
    props.user.bot = bot.split(":")[1].trim();

    function isUserBot(user) {
        // console.log("Checking <" + user.screen_name + "> for bot status...");
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
                .then(json => setBot(json))
                .then(user.bot = bot.split(":")[1].trim());
                
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

    // const defaultUserTemplate = (
    //     <label id={props.user.id} className="chFriends" htmlFor={props.user.id}>
    //             {props.user.screen_name}
    //         </label>
    // );

    // const strikedUserTemplate = (
    //     <s><label id={props.user.id} className="chFriends" htmlFor={props.user.id}>
    //             {props.user.screen_name}
    //         </label></s>
    // );

    
    if (props.user.bot === props.bot) {
        return (
            <Card style={{ width: '100%' }}>
            
                <Card.Header>
                    <Card.Link href={"https://twitter.com/" + props.user.screen_name} target="_blank">@{props.user.screen_name}</Card.Link> | {props.user.name}</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md="auto">
                            <Card.Img src={props.user.profile_image_url_https} alt="img" width="48" height="48"></Card.Img>
                        </Col>
                        <Col>
                            <Card.Text>{bot}</Card.Text>
                        </Col>
                        <Button 
                            variant={bot.split(":")[1].trim() === "True" ?  "warning" : "outline-primary"} 
                            onClick={unfollowUser} 
                            disabled={unfollowed}
                            hidden={props.friendsOrFollowers === "followers"}
                        >
                            Unfollow?
                        </Button>
                        <Button 
                            variant={bot.split(":")[1].trim() === "True" ?  "danger" : "outline-primary"}
                            onClick={blockUser} 
                            disabled={blocked}
                        >
                            Block?
                        </Button>
                    </Row>
                </Card.Body>
        
        </Card>
        );
    }

    else {
        return <Card hidden="True"></Card>
    }};

  export default User;