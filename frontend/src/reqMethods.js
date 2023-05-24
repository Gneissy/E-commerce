import axios from "axios";

const MAIN_API_URL = "http://localhost:3001/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDAzYTUxOTVhMTk0OTFlNDk3NTMyZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NDk1OTE4OCwiZXhwIjoxNjg1MDQ1NTg4fQ.-qw_asgJ6SpmaKEXtByJacr5Ntv6TxV5cJeiQOQBDQM";


// For public requests
const publicRequest = axios.create({ baseURL: MAIN_API_URL });

// For user requests
const userRequest = axios.create({
    baseURL: MAIN_API_URL,
    header: {token: `Bearer ${TOKEN}`}
});

export { publicRequest, userRequest };
