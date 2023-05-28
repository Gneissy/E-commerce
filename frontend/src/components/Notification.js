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
//TODO Not sure about shifting upwards, check later on
//? Documentation for this component:

//? Example states:
//? const [notifications, setNotifications] = useState([]); 
//? const [notification, setNotification] = useState();

//? Example implementations:
//? <div className = "notification-container">
//?    {notifications.map((notification, index) => (
//?        <Notification key={index} text={notification} />
//?    ))}
//? </div>
//? <div className = "notification-container">
//?   {notification && <Notification text={notification} />}
//? </div>


export default Notification;