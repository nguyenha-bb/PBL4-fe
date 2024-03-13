import axios from '../axios';

axios.defaults.withCredentials = true;

const handleCreateConversation = (idAcc1, idAcc2) => {
    return axios.post('/api/create-conversation', { withCredentials: true, idAcc1, idAcc2 });
};

const handlePutBlockConversation = (idConversation) => {
    return axios.put('/api/block-conversation', { withCredentials: true, idConversation });
};

const handleDeleteConversation = (idConversation) => {
    return axios.put('/api/delete-conversation', { withCredentials: true, idConversation });
};

const handleUpdateBlockStatusConversation = (idConversation) => {
    return axios.put('/api/update-block-conversation', { withCredentials: true, idConversation });
};

const handleGetConversationByID = (idConversation) => {
    return axios.get('/api/get-conversation', { withCredentials: true, params: { idConversation } });
};

const handleGetIdConversation = (idFrom, idTo) => {
    return axios.get('/api/get-id-conversation-by-user', { withCredentials: true, params: { idFrom, idTo } });
};

export {
    handlePutBlockConversation,
    handleDeleteConversation,
    handleUpdateBlockStatusConversation,
    handleGetConversationByID,
    handleCreateConversation,
    handleGetIdConversation,
};
