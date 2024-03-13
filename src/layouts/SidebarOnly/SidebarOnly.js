import classNames from 'classnames/bind';
import styles from './SidebarOnly.module.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { handleGetInfo } from '~/services/userService';

import Modal from '~/components/Modal/Modal';
import RequestFriend from '~/components/Modal/ModalConfirm/RequestFriend';
import { UserGroup } from '~/components/Icon/Icon';
import ConfirmMatching from '~/components/Modal/ModalConfirm/ConfirmMatching';
import NotificationMessage from '~/components/Modal/ModalConfirm/NotificationMessage';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SidebarOnly({ children, socket }) {
    const [user, setUser] = useState({});
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isShowRequest, setShowRequest] = useState(false);
    const [fromId, setFromId] = useState();
    const [matchId, setMatchId] = useState();
    const [isShowNotifMatching, setShowNotifMatching] = useState(false);
    const [isShowDenyMatching, setShowDenyMatching] = useState(false);
    const [idNotificationMatching, setIdNotificationMatching] = useState();
    const navigate = useNavigate();
    // const [isCreateConversation, setCreateConversation] = useState(false);
    // const [socket, setSocket] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await handleGetInfo();
                console.log(response);
                console.log('npppp ' + response.userData.user[0]);
                setUser(response.userData.user[0]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (socket === null) return;
        console.log(user);
        if (user.idUser) {
            socket.emit('addNewUser', user.idUser);
            socket.on('getOnlineUsers', (response) => {
                setOnlineUsers(response);
            });
        }
    }, [user]);

    useEffect(() => {
        if (socket === null) return;
        socket.on('receive-notif-matching', (response) => {
            console.log('receiveeeeeeeeee', response);
            setIdNotificationMatching(response.idNotificationMatching);
        });
        socket.on('receive-request-matching', (response) => {
            console.log(response);
            setShowRequest(!isShowRequest);
            setFromId(response.fromId);
            setMatchId(response.matchId);
        });
    }, []);

    useEffect(() => {
        if (socket === null) return;
        if (user) {
            // socket.off('receive-call');
            socket.on('receive-call', (data) => {
                console.log('receive-call');
                console.log(data);
                navigate(`/api/call/${data.idConver}/${data.from}`, { state: { to: true } });
            });
        }
    }, [user]);

    // if(socket != null) {
    //     socket.on('receive-request-matching', (response) => {
    //         console.log(response);
    //         setShowRequest(!isShowRequest);
    //         setFromId(response.fromId);
    //         setMatchId(response.matchId);
    //     })
    // }
    useEffect(() => {
        if (socket === null) return;
        socket.on('move-to-new-conversation', (data) => {
            console.log(data);
            setShowNotifMatching(true);
        });
    }, []);

    useEffect(() => {
        if (socket === null) return;
        socket.on('send-deny-matching', (data) => {
            console.log(data);
            setShowDenyMatching(true);
        });
    }, []);

    const handleToggleShowRequest = () => {
        setShowRequest(!isShowRequest);
    };

    const handleToggleShowNotifMatching = () => {
        setShowNotifMatching(!isShowNotifMatching);
    };

    const handleToggleShowDenyMatching = () => {
        setShowDenyMatching(!isShowDenyMatching);
    };

    console.log('OnlineUser', onlineUsers);

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { socket, onlineUsers, user });
        }
        return child;
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('grid')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('row')}>
                            <div className={cx('col l-3 m-3 c-3')}>
                                <Sidebar socket={socket} onlineUsers={onlineUsers} user={user} />
                            </div>
                            <div className={cx('col l-9 m-9 c-9')}>{childrenWithProps}</div>
                        </div>
                        <div className={cx('matching')}>
                            {isShowRequest && (
                                <Modal
                                    background
                                    leftIcon={<UserGroup />}
                                    title={'Request matching'}
                                    isShowing={isShowRequest}
                                    hide={handleToggleShowRequest}
                                >
                                    <RequestFriend
                                        idNotificationMatching={idNotificationMatching && idNotificationMatching}
                                        timeData={{ minutes: 5, seconds: 0 }}
                                        hide={handleToggleShowRequest}
                                        fromId={fromId && fromId}
                                        socket={socket}
                                        matchId={matchId && matchId}
                                    />
                                </Modal>
                            )}

                            {isShowNotifMatching && (
                                <Modal
                                    background
                                    leftIcon={<UserGroup />}
                                    title={'Notification'}
                                    isShowing={isShowNotifMatching}
                                    hide={handleToggleShowNotifMatching}
                                >
                                    <ConfirmMatching
                                        hide={handleToggleShowNotifMatching}
                                        fromId={fromId && fromId}
                                        socket={socket}
                                        onlineUsers={onlineUsers}
                                        matchId={matchId && matchId}
                                    />
                                </Modal>
                            )}

                            {isShowDenyMatching && (
                                <Modal
                                    background
                                    leftIcon={<UserGroup />}
                                    title={'Notification'}
                                    isShowing={isShowDenyMatching}
                                    hide={handleToggleShowDenyMatching}
                                >
                                    <NotificationMessage
                                        hide={handleToggleShowDenyMatching}
                                        socket={socket}
                                        onlineUsers={onlineUsers}
                                        title={'Rất tiếc! Bạn đã bị từ chối matching!'}
                                    />
                                </Modal>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

SidebarOnly.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SidebarOnly;
