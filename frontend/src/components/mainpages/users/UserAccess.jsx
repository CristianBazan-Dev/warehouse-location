import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";

function Login(props) {
  const state = useContext(GlobalState);
  const [isRegister, setIsRegister] = state.isRegister;
  const [login, setLogin] = useState([]);
  const [register, setRegister] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    if(isRegister){
      setRegister({ ...register, [name]: value });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      alert("login")
      const res = await axios.post("users/login", {...login});
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };



  const handleRegister = async(e) => {
    e.preventDefault() 
    try{
      const res = await axios.post("users/register", {...register})
      localStorage.setItem('firstLogin', true)
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg)
    }
  };


  return (
    <div>
      {isRegister ? "Register" : "Login"}
      <form
        action=""
        onSubmit={isRegister ? handleRegister : handleLogin}
        className="w-full max-w-xs m-auto relative top-10"
      >
        {isRegister && (
          <>
            <div className="mb-4">
              <label
                className="block text-gray-200 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Name
              </label>
              <input
                type="text"
                className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                name="name"
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-200 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Last name
              </label>
              <input
                type="text"
                className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                name="lastName"
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="username"
          >
            E-mail
          </label>
          <input
            type="text"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Password
          </label>
          <input
            type="password"
            className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            name="password"
            onChange={handleChange}
          />
        </div>

        <button  className="bg-indigo-500 px-3 block py-2 w-full ">
          {isRegister ? "Submit" : "Login "}
        </button>
      </form>
    </div>
  );
}

export default Login;
