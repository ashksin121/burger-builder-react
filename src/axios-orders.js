import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-fa346.firebaseio.com/'
});

export default instance;