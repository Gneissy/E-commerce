import "./Notification.css";

function Notification({ text }){
    return(
            <div className = "notification">
                <p> {text} </p>
                <span className = "notification-progress"></span>
            </div>
    );
}

//! While using this component, wrap it with a div with "notification-container" class, in App.js
//? Shifting upwards is default browser behaviour for absolute positioning.


                        //* DOCUMENTATION FOR THIS COMPONENT
// Why am i explaining
//? Bcz why not. I'll forget it after 2 seconds x)

//* How it works:
//? This state is handled with Redux, in "/store/slices/notificationSlice.js" file.
//? Dispatch adds a notification string into the "notification" array state.
//? In App.js, this array is mapped into <Notification /> components, and displayed.

//* To get it from Redux store:
//? const notifications = useSelector(function(state){ return state.notifications; });

//* Example implementation on App.js:
//? <div className = "notification-container">
//?    {notifications.map((notification, index) => (
//?        <Notification key={index} text={notification} />
//?    ))}
//? </div>

//* Example dispatch, here whatever inside pharantesis is my action.payload, meaning the message inside notification card.
//? dispatch(addNotification(`Welcome ${res.data.username}`)); 


//* A complete component example, see all you need to use:
//? import { useDispatch } from "react-redux"
//? import { addNotification } from "../store/index";

//? function Component(){
//?    const dispatch = useDispatch();
//?    const handleClick = function(){
//?        dispatch(addNotification("This is the notification message"));
//?    }
//?    return (
//?        <button onClick = {handleClick}> Click to see a notification </button>
//?    );
//? }

//? export default Component;







export default Notification;