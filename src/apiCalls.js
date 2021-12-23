import axios from 'axios'
const baseURL = "https://corona.askbhunte.com/api/v1/data/nepal";
// const baseURL = "http://202.45.145.25/api/v3/ext/municipality";

// const API = axios.create({ baseUrl: `https://corona.askbhunte.com/api/v1/` });
const head = localStorage.getItem('jwt') === undefined ? "" : localStorage.getItem('jwt');
let headers = {
   'Content-Type': 'application/json',
   'Accept': 'application/json',
   'authorization': 'Bearer ' + head,
   "Access-Control-Allow-Origin": "*",
};

const coronaInfo = () => axios.get(baseURL, { headers })
const userRegister = (info) => axios.post("http://localhost:8080/api/auth/register", { ...info }, { headers })
const getPerson = (info) => axios.get(`http://localhost:8080/api/users/${info.majorId}`, { headers })
const getPersonbyId = ({ id }) => axios.get(`http://localhost:8080/api/users/person/${id}`, { headers })
const personRegister = (info) => axios.post("http://localhost:8080/api/users", { ...info }, { headers })
const login = (info, dispatch) => {
   axios.post("http://localhost:8080/api/auth/login", { ...info }, { headers }).then(({ data }) => {
      localStorage.setItem('jwt', data.accessToken)
      localStorage.setItem('user', JSON.stringify(data.user))

      headers['authorization'] = "Bearer " + data.accessToken;
      // console.log('headers', headers)
      dispatch({ type: 'SET_USER', payload: data })
      // return data.user;
   }).catch((e) => {
      headers['authorization'] = null;
      return Error(e);
   });
}
const imgUpload = ({ type }, file) => axios.post(`http://localhost:8080/api/upload?type=${type}`, file, { headers })

const createPost = (info) => axios.post("http://localhost:8080/api/questions", { ...info }, { headers })
const getPosts = () => axios.get("http://localhost:8080/api/questions", { headers })
const getPostById = (id) => axios.get(`http://localhost:8080/api/questions/${id}/fetch`, { headers })
const getCommentsByPostId = (id) => {
   // console.log('comment id', id)
   return axios.get(`http://localhost:8080/api/questions/allQuestions?qid=${id}`, { headers })
}


const throwDownVote = (id) => axios.post(`http://localhost:8080/api/questions/downvote/${id}`, { headers })
const throwUpVote = (id) => axios.post(`http://localhost:8080/api/questions/upvote?id=${id}`, { headers })

const getRecords = ({ type, id }) => {
   return axios.get(`http://localhost:8080/api/records/majorId/${id}`, { headers })
}
const toDbRecords = (info) => axios.post("http://localhost:8080/api/records/", { ...info }, { headers })

// axios.get("https://jsonplaceholder.typicode.com/posts/1", axiosConfig).then((r) => console.log(r));
export {
   coronaInfo, userRegister, personRegister, getPerson, getPersonbyId,
   login, createPost, imgUpload, getPosts, throwDownVote,
   throwUpVote, getRecords, getPostById, getCommentsByPostId, toDbRecords
}

// JSONPlaceholder - Free Fake REST API
// https://jsonplaceholder.typicode.com
// JSONPlaceholder is a free online REST API that you can use whenever you need some fake data. It can be in a README on GitHub, for