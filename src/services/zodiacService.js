import axios from '../axios';

axios.defaults.withCredentials = true;

const handleGetListZodiac = () => {
    return axios.get('/api/admin/get-list-zodiac', {
        withCredentials: true,
    });
};

const handleGetZodiacDetail = (id) => {
    return axios.get('/api/admin/get-zodiac-info-detail', {
        withCredentials: true,
        params: {id}
    });
};

export { handleGetListZodiac, handleGetZodiacDetail };
