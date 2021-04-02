import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
 <div>
   
   <div class="navBar">
    <nav class="navbar bg-dark navbar-expand-lg navbar-dark">
               
      <a class= "nav-link" href="#"> Home</a>
      <a class="nav-link" href="help.html"> Help</a>
      <a class="nav-link" href="https://twitter.com/"> Login</a>
      
         <div class="collapse navbar-collapse" id="navbarSupportedContent">
         </div>
     </nav>
    </div>

  <div class="t2"><h2>BotSense® is a KSU Project</h2> </div>
  
  <div class ="expPrg"> 
<p>BotSense checks the activity of a Twitter account and gives it a score. Higher scores mean more bot-like activity.
  Use of this service requires Twitter authentication and permissions.
  <p>If you have questions or need help, please click on "Help" button in the navigation bar.</p>
   BotSense is a project of the College of Computing and Software Engineering at Kennesaw State University.
   </p>
   
  </div>

 <div class ="btnSet">
  <input id="name" placeholder="Enter a @UserName." value=" "/>   
   <button class="chUser" href="https://twitter.com/"> Check User </button> 
   <button class="chFriends" href="https://twitter.com/">Check Friends</button>
  
 </div>
</div>,   

document.getElementById("root"));
