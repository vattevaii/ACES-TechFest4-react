import axios from 'axios'
const coronaInfo = () => {
   axios.get('https://corona.askbhunte.com/api/v1/data/nepal')
}