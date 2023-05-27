import react from "react";
import "./Notification.css";

function Notification({ text }){
    return(
        <div className = "notification">
            <p> {text} </p>
            <span className = "notification-progress"></span>
        </div>
    );
}

//! While using this component, wrap it with a div with "notification-container" class
// An example usage:
// "notifications" here is a state array contains individual nofitications

// <div className = "notification-container">
//    {notifications.map((notification, index) => (
//        <Notification key={index} text={notification} />
//    ))}
// </div>


export default Notification;