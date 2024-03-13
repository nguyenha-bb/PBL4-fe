import axios from '../axios';

axios.defaults.withCredentials = true;

const handleGetListZodiacMessage = (page) => {
    return axios.get('/api/admin/get-all-zodiac-message', {
        withCredentials: true,
        params: { page },
    });
};

const handleGetListNotiZodiacMessage = (idUser, page) => {
    return axios.get('/api/get-list-zodiac-message', {
        withCredentials: true,
        params: { idUser, page },
    });
};

const handleFilterListZodiacMessage = async (timeFrom, timeTo, pageNumber) => {
    return axios.get('/api/admin/filter-zodiac-message', {
        withCredentials: true,
        params: { timeFrom, timeTo, pageNumber },
    });
};

const handleGetZodiacMessageDetail = (id) => {
    return axios.get('/api/admin/get-detail-zodiac-message', {
        withCredentials: true,
        params: { id },
    });
};

const handleCreateZodiacMessage = (idZodiac, content, datetime) => {
    return axios.put('/api/admin/create-zodiac-message', {
        withCredentials: true,
        idZodiac,
        content,
        datetime,
    });
};

const handleGetIdZodiacMessage = (idZodiac, datetime, idUser) => {
    return axios.get('/api/admin/get-id-zodiac-message', {
        withCredentials: true,
        params: { idZodiac, datetime, idUser },
    });
};

export {
    handleGetListZodiacMessage,
    handleFilterListZodiacMessage,
    handleGetListNotiZodiacMessage,
    handleGetZodiacMessageDetail,
    handleCreateZodiacMessage,
    handleGetIdZodiacMessage,
};
