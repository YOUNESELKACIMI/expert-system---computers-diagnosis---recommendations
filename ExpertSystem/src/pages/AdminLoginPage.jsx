import React, { useState } from 'react';
import loginService from '../services/login';
import symptomsServices from '../services/symptoms';
const AdminLoginPage = ({ setIsAdmin }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful authentication
    console.log("setted username is = ",username)
    console.log("setted password is = ",password)
    const userObject = {
      username,
      password
    }
    loginService
      .login(userObject)
      .then(returnedUser=>{
        window.localStorage.setItem("loggedAdmin",JSON.stringify(returnedUser))
        symptomsServices.setToken(returnedUser.token)
        setAuthenticated(true);
        setIsAdmin(true);
      })
      .catch(error=>{
        console.log("error : ",error.message)
      })

  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-200 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-8 text-white">Welcome Back, Admin!</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-12 py-8 mb-8">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;
