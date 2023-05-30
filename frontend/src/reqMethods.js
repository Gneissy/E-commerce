import axios from "axios";

const MAIN_API_URL = "https://e-commerce-backend-server.onrender.com/api"; // For backend deployment
// const MAIN_API_URL = "http://localhost:3001/api"; // For local study

// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDAzYTUxOTVhMTk0OTFlNDk3NTMyZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NTAxNTk1OCwiZXhwIjoxNjg1MTAyMzU4fQ.rZTnOiZ1DKgb1sn_F0U8gtY29OodEta0hQXx2cHrVvo";

const user = JSON.parse(localStorage.getItem('serteserUser'));
// console.log(user); // The big user object
const TOKEN = user?.accessToken;
// console.log(TOKEN); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... like output

// For public requests
const publicRequest = axios.create({ baseURL: MAIN_API_URL });

// For user requests
const userRequest = axios.create({
    baseURL: MAIN_API_URL,
    header: {token: `Bearer ${TOKEN}`}
});

export { publicRequest, userRequest };
