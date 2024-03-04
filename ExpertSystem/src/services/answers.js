import axios from "axios";
const url = "http://localhost:3001/answers";

const postAnswers = async (answerObject) => {
  const response = await axios.post(url, answerObject);
  return response.data;
};


export default { postAnswers};
