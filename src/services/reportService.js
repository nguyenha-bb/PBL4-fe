import axios from '../axios';

axios.defaults.withCredentials = true;

const handleGetListReport = (page) => {
    return axios.get('/api/admin/get-all-report', {
        withCredentials: true,
        params: { page },
    });
};

const handleGetReportDetail = (idPost) => {
    return axios.get('/api/admin/get-info-detail-post', {
        withCredentials: true,
        params: { idPost },
    });
};

const handleDenyReport = (idPost) => {
    return axios.put('/api/admin/deny-report', {
        withCredentials: true,
        idPost,
    });
};

const handleAcceptReport = (idPost) => {
    return axios.put('/api/admin/accept-report', {
        withCredentials: true,
        idPost,
    });
};

const handleAddReportToReport = (idPost, idUser, content, timeReport) => {
    return axios.post('/api/report', {
        withCredentials: true,
        idPost,
        idUser,
        content,
        timeReport,
    });
};

export { handleGetListReport, handleGetReportDetail, handleDenyReport, handleAcceptReport, handleAddReportToReport };
