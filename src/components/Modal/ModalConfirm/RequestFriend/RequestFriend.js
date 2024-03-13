import classNames from 'classnames/bind';
import styles from './RequestFriend.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { Heart, HeartCrack } from '~/components/Icon/Icon';
import { Fragment, useEffect, useRef, useState } from 'react';
import {
    handleCheckFriendRelation,
    handleGetDetailNotificationMatching,
    handleGetInfoByID,
    handleSetDenyNotificationMatching,
    handleSetMatchNotificationMatching,
} from '~/services/userService';
import { handleCreateConversation } from '~/services/conversationService';
import { mydate } from '~/utils/date';
import { handlePostMessage } from '~/services/messageService';

const cx = classNames.bind(styles);

function RequestFriend({ idNotificationMatching, timeData, hide, fromId, socket, matchId }) {
    const [user, setUser] = useState();
    const [remainingMinutes, setRemainingMinutes] = useState(timeData.minutes);
    const [remainingSeconds, setRemainingSeconds] = useState(timeData.seconds);
    const [isDeny, setDeny] = useState();
    const [isMatch, setMatch] = useState();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                let data = await handleGetInfoByID(fromId);

                if (data && data.userData.errCode === 0) {
                    const temp = String(data.userData.user.birth);
                    const tempDate = new Date(temp);
                    const year = tempDate.getFullYear();
                    data.userData.user.age = new Date().getFullYear() - year;
                    setUser(data.userData.user);
                } else {
                    console.log('data.message ' + data.errMessage);
                }
            } catch (e) {
                console.log('error message', e.response);
            }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                let notifData = await handleGetDetailNotificationMatching(idNotificationMatching, matchId, fromId);
                if (notifData.errCode == 0) {
                    if (notifData.data.isDeny === 1) {
                        setDeny(notifData.data.isDeny);
                        setRemainingMinutes(0);
                        setRemainingSeconds(0);
                    }
                    let converData = await handleCheckFriendRelation(fromId, matchId);
                    if (converData.errCode === 1) {
                        setMatch(1);
                        setRemainingMinutes(0);
                        setRemainingSeconds(0);
                    }
                } else {
                    console.log(notifData.errMessage);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (remainingSeconds > 0) {
                setRemainingSeconds(remainingSeconds - 1);
            } else if (remainingMinutes > 0) {
                setRemainingMinutes(remainingMinutes - 1);
                setRemainingSeconds(59);
            } else {
                clearInterval(timer); // Dừng đếm ngược khi hết thời gian
            }
        }, 1000);

        return () => clearInterval(timer); // Hủy interval khi component unmount
    }, [remainingMinutes, remainingSeconds]);

    const handleAddConversation = async () => {
        try {
            const data = await handleCreateConversation(fromId, matchId);
            if (data.errCode == 0 && data.errMessage == 'OK') {
                const currentDate = new Date();
                const timeSend = mydate(currentDate);
                const text = 'Bạn đã bắt đầu cuộc trò chuyện này!';
                await handlePostMessage(1, text, timeSend, data.idConversation, 0, text);
                socket.emit('accept-request-matching', {
                    idConversation: data.idConversation,
                    fromId: fromId,
                    matchId: matchId,
                });
                hide();
            } else {
                console.log(data.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDenyMatching = async () => {
        try {
            const checkDeny = await handleSetDenyNotificationMatching(idNotificationMatching);
            if (checkDeny.errCode == 0) {
                socket.emit('deny-matching', {
                    fromId: fromId,
                    matchId: matchId,
                });
                hide();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-content')}>
                <div className={cx('info-user')}>
                    <img src={user && images[user.avatar]} alt="" />
                    <div className={cx('info-detail')}>
                        <span className={cx('fullname')}>{user && user.fullName}</span>
                        <span className={cx('nickname')}>@{user && user.userName}</span>
                    </div>
                </div>
                {/* <div className={cx('message-noti')}>{(minute !== 0 && second !== 0) ? `Thời gian hiệu lực: ${minute}:${second} s` : 'Đã hết thời gian hiệu lực'}</div> */}
                <div className={cx('message-noti')}>
                    {isMatch === 1
                        ? 'Bạn đã matching với user này'
                        : isDeny === 1
                        ? 'Bạn đã từ chối yêu cầu matching'
                        : remainingMinutes !== 0 || remainingSeconds !== 0
                        ? `Thời gian hiệu lực: ${remainingMinutes}:${String(remainingSeconds).padStart(2, '0')} s`
                        : 'Đã hết thời gian hiệu lực'}
                </div>
            </div>
            <div className={cx('bio-user')}>
                Bio: <span className={cx('bio-content')}>{user && user.bio}</span>
            </div>
            <div className={cx('footer')}>
                {/* <Fragment> */}
                <button
                    medium
                    leftIcon={<Heart />}
                    className={cx('btn-accept', 'btn', {
                        disable:
                            isDeny !== 1 && isMatch !== 1 && remainingMinutes !== 0 && remainingSeconds !== 0
                                ? false
                                : true,
                    })}
                    onClick={handleAddConversation}
                >
                    <Heart className={cx('icon-button')} />
                    Accept
                </button>
                <button
                    onClick={handleDenyMatching}
                    medium
                    leftIcon={<HeartCrack />}
                    noMargin
                    className={cx('btn-deny', 'btn', {
                        disable:
                            isDeny !== 1 && isMatch !== 1 && remainingMinutes !== 0 && remainingSeconds !== 0
                                ? false
                                : true,
                    })}
                >
                    <HeartCrack className={cx('icon-button')} />
                    Deny
                </button>
                {/* </Fragment> */}
            </div>
        </div>
    );
}

export default RequestFriend;
