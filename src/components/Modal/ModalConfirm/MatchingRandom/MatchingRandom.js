import classNames from 'classnames/bind';
import styles from './MatchingRandom.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { Age, Female, FriendPlus, Zodiac } from '~/components/Icon/Icon';
import { handleCreateNotificationMatching, handleGetInfoByID } from '~/services/userService';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function MatchingRandom({fromId, matchId, socket, onlineUsers, hide}) {
    const [user, setUser] = useState();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                let data = await handleGetInfoByID(matchId);
                console.log('match randommmmmmmm');
                // data = data.userData;
                
                if (data && data.userData.errCode === 0) {
                    console.log('Get info user successfully');
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
        }
        fetchApi();
    }, [])

    const handleRequestMatching = async () => {
        // console.log('requestttttttttt');
        // console.log(socket);
        // socket.emit("test", 'bicute');
        const notifData = await handleCreateNotificationMatching(matchId, fromId);
        console.log(notifData);
        if(notifData.errCode == 0) {
            console.log('add notif success!');
            socket.emit("create-notif-matching", {
                fromId: fromId,
                matchId: matchId,
                idNotificationMatching: notifData.data,
            })
            socket.emit("send-request-matching", {
                fromId: fromId,
                matchId: matchId
            });
            hide();
        }
        else {
            console.log(notifData.errMessage);
        }
        
        // console.log('hihi');
        // socket.on('hello', (response) => {
        //     console.log(response);
        // });
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}></div>
            <div className={cx('content')}>
                <img src={user && images[user.avatar]} alt="" />
                <div className={cx('info')}>
                    <div>
                        <div className={cx('fullname')}>{user && user.fullName}</div>
                        <div className={cx('nickname')}>@{user && user.userName}</div>
                    </div>

                    <Button onClick={handleRequestMatching} large normal leftIcon={<FriendPlus />} className={cx('btn-request')}>
                        Request
                    </Button>
                </div>
                <div className={cx('detail-info')}>
                    <div className={cx('zodiac')}>
                        <Zodiac /> {user && user.avatar}
                    </div>
                    <div className={cx('gender')}>
                        <Female /> {user && user.gender ? 'Female' : 'Male'} 
                    </div>
                    <div className={cx('age')}>
                        <Age /> {user && user.age}
                    </div>
                </div>
                <div className={cx('bio')}>
                    Bio:{' '}
                    <span className={cx('bio-content')}>
                        {user && user.bio}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default MatchingRandom;
