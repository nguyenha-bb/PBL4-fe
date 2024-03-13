import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Search from '../Search';
import { HandHeart, Logout, Messenger, NotifIcon, Setting, User, UserGroup } from '~/components/Icon/Icon';
import images from '~/assets/images';
import Button from '~/components/Button';
import routes from '~/config/routes';
import Tippy from '@tippyjs/react';
import NotiItem from '~/components/Popper/NotiItem';
import { Link } from 'react-router-dom';
import { handleGetCountNotReadNotificationMatching, handleGetInfoByID, handleLogoutApi } from '~/services/userService';
import { handleGetNotificationByReceiverId } from '~/services/notificationMessageService';
import { Fragment, useEffect, useState } from 'react';
import { handleGetNotificationMatching } from '~/services/userService';
import NotiZodiac from '~/components/Popper/NotiZodiac/NotiZodiac';
import { useAppContext } from '~/components/AppContext/AppContext';

const cx = classNames.bind(styles);
function Sidebar({ user, socket, onlineUsers }) {
    const [infoUser, setInfoUser] = useState({});
    // const { isShowing, toggle } = useModal();
    const [reLoadPage, setReloadPage] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [countNotificationMatching, setCountNotificationMatching] = useState();
    const [notifList, setNotifList] = useState([]);
    const [indexNotif, setIndexNotif] = useState(0);
    // const [isReadNotificationMatching, setReadNotificationMatching] = useState(true);
    useEffect(() => {
        const fetchApi = async () => {
            let notifData = {};
            try {
                // handleGetNotificationMatching(user.idUser)
                //     .then(data => {
                //         console.log(data);
                //         notifData = data;
                //     });
                notifData = await handleGetNotificationMatching(user?.idUser);
                console.log(notifData);
                if (notifData.errCode == 0 && notifData.errMessage == 'OK') {
                    // notifList = notifData.data;
                    // console.log(notifList);
                    setNotifList(notifData.data);
                } else {
                    console.log(notifData.errMessage);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchApi();
    }, [countNotificationMatching, user.idUser]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if (user.idUser) {
                    const notifData = await handleGetCountNotReadNotificationMatching(user?.idUser);
                    console.log(notifData);
                    console.log('check notif counttttttttttttt');
                    console.log(notifData.data);
                    if (notifData.errCode == 0) {
                        setCountNotificationMatching(notifData.data);
                    } else {
                        console.log(notifData.errMessage);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchApi();
    }, [user.idUser, countNotificationMatching]);

    useEffect(() => {
        if (socket === null) return;
        socket.off('receive-notif-matching');
        socket.on('receive-notif-matching', (data) => {
            console.log('receive-notif-matchingggggggggggggggg');
            console.log(data);
            setCountNotificationMatching((prev) => prev + 1);
        });
    }, []);

    const renderPreview = () => {
        // }
        // catch(error) {
        //     console.log(error);
        // }
        return (
            <div class={cx('container-tippy')}>
                {notifList.slice(0, 4 * indexNotif + 4).map((item, index) => (
                    <NotiItem
                        socket={socket}
                        idNotificationMatching={item.idNotificationMatching}
                        idAcc1={item.idAcc1}
                        idAcc2={item.idAcc2}
                        handleReadNotificationMatching={handleReadNotificationMatching}
                        key={index}
                    />
                ))}
                {notifList.length > 4 && notifList.length > 4 * indexNotif ? (
                    <div
                        className={cx('more-notif')}
                        onClick={() => {
                            setIndexNotif((prev) => prev + 1);
                        }}
                    >
                        Xem thêm
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    };

    const handleReadNotificationMatching = () => {
        // setReadNotificationMatching(!isReadNotificationMatching);
        if (countNotificationMatching > 0) {
            setCountNotificationMatching((prev) => prev - 1);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log('user?.idUser ', user?.idUser);
                const response = await handleGetInfoByID(user?.idUser);
                setInfoUser(response?.userData?.user);

                const notifications = await handleGetNotificationByReceiverId(user?.idUser);
                setNotificationCount(notifications?.notificationMessageInfo?.statusNotificationMessage);
            } catch (error) {
                console.error('Error fetching user information: ' + error);
            }
        };

        fetchData();
    }, [user?.idUser, reLoadPage]);

    useEffect(() => {
        if (socket === null) return;
        socket.off('receive-notification');
        socket.on('receive-notification', async (data) => {
            // handlePostNotificationMessageInfo(data.idConversation, data.senderID, data.receiverID, 1);
            setReloadPage(!reLoadPage);
        });
    }, [socket, reLoadPage]);

    console.log('notificationCount', notificationCount);

    const handleLogoutAccout = async () => {
        await handleLogoutApi();
    };

    console.log('user: ', user);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('grid')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('row')}>
                            <div className={cx('col l-8 m-8 c-8')}>
                                <Search user={user} />
                            </div>
                            <div className={cx('col l-2 m-2 c-2')}>
                                <NotiZodiac user={user} socket={socket} />
                            </div>
                            <div className={cx('col l-2 m-2 c-2')}>
                                <div className={cx('icon-header')}>
                                    {countNotificationMatching ? (
                                        <span className={cx('count-circle')}>{countNotificationMatching}</span>
                                    ) : (
                                        ''
                                    )}
                                    <Tippy
                                        offset={[10, 9]}
                                        // visible
                                        interactive
                                        placement="bottom"
                                        content={renderPreview()}
                                    >
                                        <div>
                                            <UserGroup />
                                        </div>
                                    </Tippy>
                                </div>
                            </div>
                        </div>

                        <div className={cx('row')}>
                            <div className={cx('col l-12 m-12 c-12')}>
                                <div className={cx('infor')}>
                                    <img src={images[infoUser.avatar]} alt="Cancer" />
                                    <span className={cx('name')}>{user.fullName}</span>
                                    <span className={cx('nickname')}>@{user.userName}</span>
                                </div>
                            </div>
                        </div>

                        <div className={cx('action-container')}>
                            <div className={cx('row')}>
                                <div className={cx('col l-12 m-12 c-12')}>
                                    <div className={cx('button-action')}>
                                        <Button active to={routes.matching} normal large text leftIcon={<HandHeart />}>
                                            Matching
                                        </Button>

                                        <Button active to={routes.messages} normal large text leftIcon={<Messenger />}>
                                            Message
                                            <span className={cx('notification-count')}>
                                                {notificationCount !== 0 && '(' + notificationCount + ')'}
                                            </span>
                                        </Button>

                                        <Button
                                            active
                                            to={`/api/profile/@${user.userName}`}
                                            normal
                                            large
                                            text
                                            leftIcon={<User />}
                                        >
                                            My blog
                                        </Button>

                                        <Button
                                            active
                                            to={routes.settingProfile}
                                            normal
                                            large
                                            text
                                            leftIcon={<Setting />}
                                        >
                                            Settings
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('logout')}>
                            <div className={cx('row')}>
                                <Link to="/">
                                    <div className={cx('col l-12 m-12 c-12')}>
                                        <Logout onClick={() => handleLogoutAccout()} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
