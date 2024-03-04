import axios from "axios";
const url = 'http://localhost:3000/api/login'

const login = async (credentials) =>{
    console.log("incoming credentials = ",credentials)
    const response = await axios.post(url,credentials)
    console.log("response data = ",response.data)
    return response.data
}

export default {login}