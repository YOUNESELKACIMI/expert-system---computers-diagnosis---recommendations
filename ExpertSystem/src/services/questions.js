import axios from "axios";
const url =  "http://localhost:3000/questions"

const getQuestions = async () => {
    const response = await axios.get(url)
    return response.data
}

export default {getQuestions}