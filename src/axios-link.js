import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'https://dirtyburger-20376.firebaseio.com/'
});

export default instance;