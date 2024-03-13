export const mydate = (currentDate) => {
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const timeSend = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return timeSend;
};

export const formatTime = (timeSend) => {
    const currentTime = new Date();
    const messageTime = new Date(timeSend);
    const timeDifference = (currentTime - messageTime) / 1000; // Chuyển đổi thành giây

    if (timeDifference < 60) {
        return 'just now';
    } else if (timeDifference < 3600) {
        const minutes = Math.floor(timeDifference / 60);
        return `${minutes}m ago`;
    } else if (timeDifference < 86400) {
        // Dưới 24 giờ
        const hours = Math.floor(timeDifference / 3600);
        return `${hours}h ago`;
    } else {
        const day = messageTime.getDate();
        const month = messageTime.getMonth() + 1;
        const hour = messageTime.getHours();
        const minute = messageTime.getMinutes();
        return `${day}/${month} ${hour}:${String(minute).padStart(2, '0')}`;
    }
};

export const formatTimeMatching = (timeInput) => {
    const currentTime = new Date();
    const notifTime = new Date(timeInput);
    const timeDifference = (currentTime - notifTime) / 1000; // Chuyển đổi thành giây
    if (Math.floor(timeDifference) <= 300) {
        const timeLeft = 300 - Math.floor(timeDifference);
        const minutes = Math.floor(timeLeft / 60);
        const seconds = Math.floor(timeLeft - minutes * 60);
        console.log('minute: ', minutes);
        console.log('seconds: ', seconds);
        return { minutes: minutes, seconds: seconds };
    } else {
        return { minutes: 0, seconds: 0 };
    }
};

export const formatTimeNotiZodiacMessage = (timePost) => {
    const currentTime = new Date();
    const messageTime = new Date(timePost?.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
    const timeDifference = (currentTime - messageTime) / 1000;

    if (timeDifference < 60) {
        return 'just now';
    } else if (timeDifference < 3600) {
        const minutes = Math.floor(timeDifference / 60);
        return `${minutes}m ago`;
    } else if (timeDifference < 86400) {
        const hours = Math.floor(timeDifference / 3600);
        return `${hours}h ago`;
    } else if (timeDifference < 2592000) {
        const days = Math.floor(timeDifference / 86400);
        return `${days}d ago`;
    } else if (timeDifference < 31536000) {
        const months = Math.floor(timeDifference / 2592000);
        return `${months}mo ago`;
    } else {
        const year = messageTime.getFullYear();
        const month = messageTime.getMonth() + 1;
        const day = messageTime.getDate();
        const hour = messageTime.getHours();
        const minute = messageTime.getMinutes();
        return `${day}/${month}/${year} ${hour}:${String(minute).padStart(2, '0')}`;
    }
};

export const isSameDay = (date) => {
    const currentDate = new Date();
    return (
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
    );
};

export const formatISODateToCustomFormat = (isoDateString) => {
    const date = new Date(isoDateString);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    return date.toLocaleString('en-US', options);
};

export const formatOnlyDate = (datetime) => {
    const dateObject = new Date(datetime.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
};
