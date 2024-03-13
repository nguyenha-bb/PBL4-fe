import axios from '../axios';

axios.defaults.withCredentials = true;

const handleGetImage = (imageName) => {
    return axios.get('/api/get-image', {
        withCredentials: true,
        params: { imageName },
    });
};

export { handleGetImage };
