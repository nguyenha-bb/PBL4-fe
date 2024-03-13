import axios from '../axios';

axios.defaults.withCredentials = true;

const handlePostDeleteInfo = (idDelete, idDeleted, idConversation, deleteAtId) => {
    return axios.post('/api/delete-conversation', {
        withCredentials: true,
        idDelete,
        idDeleted,
        idConversation,
        deleteAtId,
    });
};

const handleUpdateDeleteInfo = (idDelete, idDeleted, deleteAtId) => {
    return axios.put('/api/update-delete-conversation', {
        withCredentials: true,
        idDelete,
        idDeleted,
        deleteAtId,
    });
};

const handleGetDeleteInfo = (idConversation) => {
    return axios.get('/api/get-delete-conversation', {
        withCredentials: true,
        params: { idConversation },
    });
};

const handleGetAllIdConversationDeleted = (idConversation) => {
    return axios.get('/api/get-id-conversation', {
        withCredentials: true,
        params: { idConversation },
    });
};

const handleDeleteInfoDeleted = (idDelete, idDeleted) => {
    return axios.delete('/api/delete-info-deleted', {
        withCredentials: true,
        params: { idDelete, idDeleted },
    });
};

export {
    handlePostDeleteInfo,
    handleUpdateDeleteInfo,
    handleGetDeleteInfo,
    handleGetAllIdConversationDeleted,
    handleDeleteInfoDeleted,
};
