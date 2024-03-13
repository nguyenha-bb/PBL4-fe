import axios from '../axios';

axios.defaults.withCredentials = true;

const handleGetPost = (idAccPost) => {
    return axios.get('/api/get-post', { withCredentials: true, params: { idAccPost } });
};

const handleGetInfoDetailPost = (idAccPost, idPost) => {
    return axios.get('/api/get-info-detail-post', { withCredentials: true, params: { idAccPost, idPost } });
};

const handleCreatePost = (idAccPost, content) => {
    return axios.post('/api/create-post', { withCredentials: true, idAccPost, content });
};

const handleUpdatePost = (idAccPost, idPost, content) => {
    return axios.put('/api/update-post', { withCredentials: true, idAccPost, idPost, content });
};

const handleDeletePost = (idAccPost, idPost) => {
    return axios.delete('/api/delete-post', { withCredentials: true, params: { idAccPost, idPost } });
};

export { handleGetPost, handleGetInfoDetailPost, handleCreatePost, handleUpdatePost, handleDeletePost };
