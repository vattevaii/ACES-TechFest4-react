import axios from "axios";
const baseURL = "https://corona.askbhunte.com/api/v1/data/nepal";
// const baseURL = "http://202.45.145.25/api/v3/ext/municipality";

// const API = axios.create({ baseUrl: `https://corona.askbhunte.com/api/v1/` });
let headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Basic Auth",
  "Access-Control-Allow-Origin": "*",
};
const coronaInfo = () => axios.get(baseURL, { headers });
const userRegister = (info) =>
  axios.post("http://localhost:8080/api/auth/register", { ...info, headers });
const personRegister = (info) =>
  axios.post("http://localhost:8080/api/users", { ...info, headers });
const getPerson = (info) =>
  axios.get(`http://localhost:8080/api/users/${info.majorId}`, { headers });

const loginCall = async (userCredentials, dispatch) => {
  // dispatch({ type: "LOGIN_START" });

  try {
    console.log("login ");
    const { data } = await axios.post(
      "http://localhost:8080/api/auth/login",
      userCredentials
    );
    console.log(data);
    return data;
    // dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    throw Error(err.response.data.message);
    // dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.message });
  }
};

const signupCall = async (userInfo, dispatch) => {
  // dispatch({ type: "SIGNUP_START" });

  try {
    console.log("signup call", userInfo);
    const res = await axios.post(
      "http://localhost:8080/api/auth/register",
      userInfo
    );
    console.log("response data", res);
    return res.data;
    // dispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
  } catch (err) {
    console.log("hhere", err);
    throw Error(err);

    // dispatch({ type: "SIGNUP_FAILURE", payload: err.response.data.message });
  }
};

// axios.get("https://jsonplaceholder.typicode.com/posts/1", axiosConfig).then((r) => console.log(r));
export {
  coronaInfo,
  userRegister,
  personRegister,
  getPerson,
  signupCall,
  loginCall,
};

// JSONPlaceholder - Free Fake REST API
// https://jsonplaceholder.typicode.com
// JSONPlaceholder is a free online REST API that you can use whenever you need some fake data. It can be in a README on GitHub, for
