import axios from '../axios';

axios.defaults.withCredentials = true;

const handleLoadMessage = (idConversation, idUser) => {
    return axios.get('/api/user-load-message', {
        withCredentials: true,
        params: { idConversation, idUser },
    });
};

const handlePostMessage = (direct, messageText, timeSend, idConversation, isFile, fileName) => {
    return axios.post('/api/save-message', {
        withCredentials: true,
        direct,
        messageText,
        timeSend,
        idConversation,
        isFile,
        fileName,
    });
};

const handleGetMessageById = (idMessage) => {
    return axios.get('/api/get-message-by-idMessage', {
        withCredentials: true,
        params: { idMessage },
    });
};

const handleGetIdMaxMessage = () => {
    return axios.get('/api/get-max-idMessage', {
        withCredentials: true,
    });
};

export { handleLoadMessage, handlePostMessage, handleGetMessageById, handleGetIdMaxMessage };
