import axios from 'axios';


//FETCH API FROM COINGEEKO
export default axios.create({
    baseURL: 'https://api.coingecko.com/api/v3'
})