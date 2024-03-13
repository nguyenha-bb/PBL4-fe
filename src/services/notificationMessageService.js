import axios from '../axios';

axios.defaults.withCredentials = true;

const handlePostNotificationMessageInfo = (idConversation, senderID, receiverId, notificationCount) => {
    return axios.post('/api/notifications-message', {
        withCredentials: true,
        idConversation,
        senderID,
        receiverId,
        notificationCount,
    });
};

const handleUpdateNotificationMessageInfo = (senderID, receiverId, notificationCount) => {
    return axios.put('/api/update-notification-message-info', {
        withCredentials: true,
        senderID,
        receiverId,
        notificationCount,
    });
};

const handleGetNotificationMessageInfo = (idConversation, senderID) => {
    return axios.get('/api/get-notification-message-info', {
        withCredentials: true,
        params: { idConversation, senderID },
    });
};

const handleGetNotificationByReceiverId = (receiverId) => {
    return axios.get('/api/get-notification-message-info-by-receiverId', {
        withCredentials: true,
        params: { receiverId },
    });
};

const handleGetAllNotificationMessageInfo = () => {
    return axios.get('/api/getall-notification-message-info', {
        withCredentials: true,
    });
};

const handleDeleteNotificationMessageInfo = (idConversation, senderID) => {
    return axios.delete('/api/delete-notification-message-info', {
        withCredentials: true,
        params: { idConversation, senderID },
    });
};

export {
    handlePostNotificationMessageInfo,
    handleUpdateNotificationMessageInfo,
    handleGetNotificationMessageInfo,
    handleDeleteNotificationMessageInfo,
    handleGetAllNotificationMessageInfo,
    handleGetNotificationByReceiverId,
};
