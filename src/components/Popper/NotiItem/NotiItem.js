import classNames from 'classnames/bind';
import styles from './NotiItem.module.scss';
import images from '~/assets/images';
import Modal from '~/components/Modal/Modal';
import RequestFriend from '~/components/Modal/ModalConfirm/RequestFriend';
import { UserGroup } from '~/components/Icon/Icon';
import { useEffect, useState } from 'react';
import {
    handleGetDetailNotificationMatching,
    handleGetInfoByID,
    handleSetReadNotificationMatching,
} from '~/services/userService';
import { PopperWrapper } from '..';
import { formatTime, formatTimeMatching } from '~/utils/date';
import { useModal } from '~/hooks';

const cx = classNames.bind(styles);

function NotiItem({ idNotificationMatching, idAcc1, idAcc2, handleReadNotificationMatching, socket }) {
    const [user, setUser] = useState();
    const [notifInfo, setNotifInfo] = useState();
    const { isShowing, toggle } = useModal();
    useEffect(() => {
        const fetchApi = async () => {
            try {
                let data = await handleGetInfoByID(idAcc2);
                
                if (data && data.userData.errCode === 0) {
                    const temp = String(data.userData.user.birth);
                    const tempDate = new Date(temp);
                    const year = tempDate.getFullYear();
                    data.userData.user.age = new Date().getFullYear() - year;

                    let notifData = await handleGetDetailNotificationMatching(idNotificationMatching, idAcc1, idAcc2);
                    console.log(notifData);
                    if (notifData.errCode == 0) {
                        console.log('get detail notif matching success!');
                        console.log(notifData);
                        setUser(data.userData.user);
                        setNotifInfo(notifData.data);
                    } else {
                        console.log(notifData.errMessage);
                    }
                } else {
                    console.log('data.message ' + data.errMessage);
                }
            } catch (e) {
                console.log('error message', e.response);
            }
        };
        fetchApi();
    }, [idAcc1, idAcc2, idNotificationMatching])

    const handleReadNotif = async () => {
        try {
            if (notifInfo.isRead == 0) {
                const check = await handleSetReadNotificationMatching(idNotificationMatching);
                handleReadNotificationMatching();
                setNotifInfo((prev) => {
                    return { ...prev, isRead: 1 };
                });
            }
            toggle();
        } catch (err) {
            console.log(err);
        }
    };

    const handleOnClick = () => {
        // const time = formatTimeMatching(notifInfo.timeCreated);
        // console.log('time data:');
        // console.log(time);
        // setTimeLeft(time);
        toggle();
    };
    return (
        <PopperWrapper className={{
            primary: notifInfo && notifInfo.isRead == 0 && true,
            disable: notifInfo && notifInfo.isRead == 1 && true,
        }}>
            <div className={cx('wrapper', {
                readNotif: notifInfo && notifInfo.isRead == 1 && true,
            })}>
                <Modal
                    title={'Request'}
                    leftIcon={<UserGroup />}
                    primary
                    isShowing={isShowing}
                    hide={handleReadNotif}
                    background
                >
                    <RequestFriend idNotificationMatching={idNotificationMatching} timeData={notifInfo && formatTimeMatching(notifInfo.timeCreated)} isNotif={true} deny={notifInfo && notifInfo.isDeny} socket={socket} fromId={idAcc2} matchId={idAcc1} hide={handleReadNotif} />
                </Modal>
                <img src={user && images[user.avatar]} alt="" />
                <div className={cx('noti-container')} onClick={handleOnClick}>
                    {/* <div> */}
                        <span className={cx('nick-name')}>@{user && user.userName}</span>
                        <span className={cx('noti-content')}>muốn kết nối với bạn</span>
                        <div className={cx('time')}>{notifInfo && formatTime(notifInfo.timeCreated)}</div>
                    {/* </div> */}
                </div>
            </div>
        </PopperWrapper>
    );
}

export default NotiItem;
