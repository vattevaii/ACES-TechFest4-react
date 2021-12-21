import axios from 'axios'

const API = axios.create('https://corona.askbhunte.com/api/v1/');

const coronaInfo = async () => {
   return await API.get("data/nepal");
}

export {
   coronaInfo
}