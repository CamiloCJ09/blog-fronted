import axios from "axios";
import authHeader from "./authHeader";


const URL_API = import.meta.env.VITE_URL_API;

interface Credentials {
  email: string;
  password: string;
}

interface UserCredentials extends Credentials  {
  name: string;
}

const login = (credentials: Credentials) => {
  try{
    return axios.post(`${URL_API}login`, credentials)
  }catch (error){
    console.log(error)
  }
};

const register = (credentials: UserCredentials) => {
  return axios.post(`${URL_API}users`, credentials, {
    headers: authHeader(),
  });
};

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

const authServices = {
  login,
  logout,
  register,
};

export default authServices;