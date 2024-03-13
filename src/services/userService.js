import axios from '../axios';

axios.defaults.withCredentials = true;
console.log('hahah');
const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
};
const handleLoginApi = (username, password) => {
    return axios.post('api/login', { config, withCredentials: true, username, password });
};

const handleLogoutApi = () => {
    return axios.post('api/logout');
};

const handleGetInfo = () => {
    return axios.get('api/matching', { config, withCredentials: true });
};

const handleGetUserBySearch = (idUser, nickname) => {
    return axios.get('api/get-user-by-search', {
        withCredentials: true,
        config,
        params: {
            idUser,
            nickname,
        },
    });
};

const handleGetInfoByID = (idUser) => {
    return axios.get('api/get-user', { config, withCredentials: true, params: { idUser } });
};

const handleGetInfoByUsername = (nickname) => {
    return axios.get('api/get-user-by-username', { config, withCredentials: true, params: { nickname } });
};
const handleFetchChatUser = () => {
    return axios.get('api/user-chat', { config, withCredentials: true });
};

const handleGetAccById = (idConversation) => {
    return axios.get('/api/user-list', {
        config,
        withCredentials: true,
        params: { config, idConversation },
    });
};

const handlePostFile = (direct, file, timeSend, idConversation, isFile, fileName) => {
    return axios.post(
        '/api/save-file',

        { withCredentials: true, direct, file, timeSend, idConversation, isFile, fileName },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    );
};

const getFile = (filename) => {
    return axios.get('/api/get-file', { config, withCredentials: true, filename });
};

const handleSignupApi = (username, password, repeatpassword, fullname, date, gender, timeRegister) => {
    return axios.post('api/signup', {
        config,
        withCredentials: true,
        username,
        password,
        repeatpassword,
        fullname,
        date,
        gender,
        timeRegister,
    });
};

const handleEditProfile = (username, fullname, bio, birth, gender) => {
    return axios.post('api/setting/editprofile', {
        config,
        withCredentials: true,
        username,
        fullname,
        bio,
        birth,
        gender,
    });
};

const getProfileSetting = () => {
    return axios.get('api/setting/editprofile', { config, withCredentials: true });
};

const handleChangePassword = (currentpassword, newpassword, retypepassword) => {
    return axios.post('api/setting/changepassword', {
        config,
        withCredentials: true,
        currentpassword,
        newpassword,
        retypepassword,
    });
};

const handleRandomMatching = (idUser, onlineUsers) => {
    return axios.get('/api/random-matching', { config, withCredentials: true, params: { idUser, onlineUsers } });
};

const handleGetNotificationMatching = (idUser) => {
    return axios.get('/api/get-notification-matching', { config, withCredentials: true, params: { idUser } });
};

const handleCreateNotificationMatching = (idAcc1, idAcc2) => {
    return axios.post('/api/create-notification-matching', { config, withCredentials: true, idAcc1, idAcc2 });
};

const handleSetDenyNotificationMatching = (idNotificationMatching) => {
    return axios.post('/api/deny-notification-matching', {
        withCredentials: true,
        idNotificationMatching,
    });
};

const handleSetReadNotificationMatching = (idNotificationMatching) => {
    return axios.post('/api/read-notification-matching', {
        withCredentials: true,
        idNotificationMatching,
    });
};

const handleGetCountNotReadNotificationMatching = (idAcc1) => {
    return axios.get('/api/get-count-not-read-notification-matching', {
        config,
        withCredentials: true,
        params: { idAcc1 },
    });
};

const handleGetDetailNotificationMatching = (idNotificationMatching, idAcc1, idAcc2) => {
    return axios.get('/api/get-detail-notification-matching', {
        config,
        withCredentials: true,
        params: { idNotificationMatching, idAcc1, idAcc2 },
    });
};

//ADMIN

const handleGetIdZodiac = (idUser) => {
    return axios.get('/api/admin/get-idZodiac-by-idUser', { config, withCredentials: true, params: { idUser } });
};

const handleGetAllUserByAdmin = (page) => {
    return axios.get('/api/admin/get-list-user', { config, withCredentials: true, params: { page } });
};

const handleDeleteUserByAdmin = (idUser) => {
    return axios.post('/api/admin/delete-user', {
        idUser,
        withCredentials: true,
    });
};

const handleCheckFriendRelation = (idAcc1, idAcc2) => {
    return axios.get('/api/check-friend-relation', {
        withCredentials: true,
        params: { idAcc1, idAcc2 },
    });
};

const handleEditProfileBrief = (username, fullname, bio) => {
    return axios.post('/api/setting/editprofile-brief', {
        withCredentials: true,
        username,
        fullname,
        bio,
    });
};

export {
    handleLoginApi,
    handleLogoutApi,
    handleGetInfo,
    handleGetUserBySearch,
    handleGetInfoByID,
    handleGetInfoByUsername,
    handleFetchChatUser,
    handleGetAccById,
    // handlePostMessage,
    handlePostFile,
    handleSignupApi,
    getFile,
    handleEditProfile,
    getProfileSetting,
    handleChangePassword,
    handleRandomMatching,
    handleGetNotificationMatching,
    handleCreateNotificationMatching,
    handleSetDenyNotificationMatching,
    handleSetReadNotificationMatching,
    // handleSetMatchNotificationMatching,
    handleGetCountNotReadNotificationMatching,
    handleGetDetailNotificationMatching,
    handleGetIdZodiac,
    handleGetAllUserByAdmin,
    handleDeleteUserByAdmin,
    handleCheckFriendRelation,
    handleEditProfileBrief,
};
