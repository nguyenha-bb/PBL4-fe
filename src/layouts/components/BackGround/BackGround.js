import classNames from 'classnames/bind';
import styles from './BackGround.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Modal from '~/components/Modal/Modal';
import Login from '~/components/Modal/Login';
import { Fragment, useState } from 'react';
import MatchingRandom from '~/components/Modal/ModalConfirm/MatchingRandom';
import { handleRandomMatching } from '~/services/userService';
import NotificationMessage from '~/components/Modal/ModalConfirm/NotificationMessage';
import { UserGroup } from '~/components/Icon/Icon';

const cx = classNames.bind(styles);

function BackGround({ isMatching, isShowing, toggle, socket, onlineUsers, user }) {
    const [isShowingMatching, setIsShowingMatching] = useState(false);
    const [isShowNotifNoUserOnline, setShowNotifNoUserOnline] = useState(false);
    const [matchId, setMatchId] = useState();
    const handleMatching = async () => {
        try {
            const listOnlineUser = onlineUsers.filter(function (value, index, arr) {
                return value.userID !== user.idUser;
            });
            if (listOnlineUser.length === 0) {
                setShowNotifNoUserOnline(!isShowNotifNoUserOnline);
                return;
            }
            const randomUser = await handleRandomMatching(user.idUser, listOnlineUser);
            console.log(randomUser);
            if (randomUser.errCode === 0) {
                console.log(randomUser);
                setIsShowingMatching(!isShowingMatching);
                setMatchId(randomUser.dataUser.idUser);
            } else if (randomUser.errCode === 2) {
                setShowNotifNoUserOnline(!isShowNotifNoUserOnline);
            } else {
                console.log(randomUser.errMessage);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleToggleMatching = () => {
        setIsShowingMatching(!isShowingMatching);
    };
    const handleToggleNotif = () => {
        setShowNotifNoUserOnline(!isShowNotifNoUserOnline);
    };
    return (
        <div className={cx('wrapper')}>
            <img className={cx('full-screen-image')} src={images.bgImg} alt="" />
            <img className={cx('top-image')} src={images.globe} alt="" onClick={toggle} />
            <Modal isShowing={isShowing} hide={toggle}>
                <Login isShowing={isShowing} hide={toggle} />
            </Modal>
            <div className={cx('matching')}>
                {isMatching && (
                    <Fragment>
                        <Button primary small className={cx('btnMatching')} onClick={handleMatching}>
                            Matching
                        </Button>
                        <Modal background isShowing={isShowingMatching} hide={handleToggleMatching}>
                            <MatchingRandom
                                hide={handleToggleMatching}
                                matchId={matchId}
                                socket={socket}
                                onlineUsers={onlineUsers}
                                fromId={user.idUser}
                            />
                        </Modal>
                    </Fragment>
                )}
                {isShowNotifNoUserOnline && (
                    <Modal
                        background
                        leftIcon={<UserGroup />}
                        title={'Notification'}
                        isShowing={isShowNotifNoUserOnline}
                        hide={handleToggleNotif}
                    >
                        <NotificationMessage
                            hide={handleToggleNotif}
                            socket={socket}
                            onlineUsers={onlineUsers}
                            title={'Hiện tại không có user đang online tương thích với bạn!'}
                        />
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default BackGround;
