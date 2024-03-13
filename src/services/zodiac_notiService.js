import axios from '../axios';

axios.defaults.withCredentials = true;

const handleGetDetailNotiZodiacMessage = (idNoti) => {
    return axios.get('/api/admin/get-detail-noti-message-zodiac', {
        withCredentials: true,
        params: { idNoti },
    });
};

const handleReadNotiZodiacMessage = (id) => {
    return axios.post('/api/read-zodiac-message', {
        withCredentials: true,
        id,
    });
};

export { handleGetDetailNotiZodiacMessage, handleReadNotiZodiacMessage };
