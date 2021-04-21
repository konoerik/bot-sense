import React from "react";

function Greeting() {

    return (
        <div className="navBar" >
            <div className="t2"><h2>BotSense® is a KSU Project</h2> </div>
                <div className ="expPrg"> 
                    <p>
                        BotSense checks the activity of a Twitter account and gives it a score. 
                        Higher scores mean more bot-like activity. Use of this service requires Twitter authentication and permissions. 
                        If you have questions or need help, please click on "Help" button in the navigation bar. 
                        BotSense is a project of the College of Computing and Software Engineering at Kennesaw State University.
                    </p>
                </div>  
        </div>
    );
  }

  export default Greeting;



