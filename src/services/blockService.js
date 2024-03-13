import axios from '../axios';

axios.defaults.withCredentials = true;

const handlePostBlockInfo = (idBlock, idBlocked, idConversation) => {
    return axios.post('/api/block-conversation', {
        withCredentials: true,
        idBlock,
        idBlocked,
        idConversation,
    });
};

const handleDeleteBlockInfo = (idSession, idConversation) => {
    return axios.delete('/api/delete-block-conversation', {
        withCredentials: true,
        params: {
            idSession: idSession,
            idConversation: idConversation,
        },
    });
};

const handleGetBlockInfo = (idConversation) => {
    return axios.get('/api/get-block-conversation', {
        withCredentials: true,
        params: { idConversation },
    });
};

export { handlePostBlockInfo, handleDeleteBlockInfo, handleGetBlockInfo };
