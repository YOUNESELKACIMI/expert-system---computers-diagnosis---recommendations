import axios from "axios";
const url = "http://localhost:3000/api/symptoms";

const getSymptoms = async () => {
  const response = await axios.get(url);
  return response.data;
};


const updateSymptom = async (id, updatedSymptom) => {
  const response = await axios.put(`${url}/${id}`, updatedSymptom);
  return response.data;
};

let headerToken = null

const setToken = (newToken) =>{
  headerToken = `Bearer ${newToken}` 
}

const postSymptom = async (symptomObject) =>{
  const configHeaders = {
    headers: {authorization:headerToken}
  }
  console.log("symptom object = ",symptomObject)
  console.log("config headers = ",configHeaders)
  const response = await axios.post(url,symptomObject,configHeaders)
  return response.data
}

const deleteSymptom = async (id) =>{
  const configHeaders = {
    headers: {authorization:headerToken}
  }
  console.log("config headers = ",configHeaders)
  const response = await axios.delete(`${url}/${id}`,configHeaders)
  return response.data
}

export default { getSymptoms,postSymptom, updateSymptom ,deleteSymptom,setToken };
