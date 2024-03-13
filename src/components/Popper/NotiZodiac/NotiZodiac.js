import classNames from 'classnames/bind';
import styles from './NotiZodiac.module.scss';
import Tippy from '@tippyjs/react';
import { NotifIcon } from '~/components/Icon/Icon';
import NotiZodiacItem from '../NotiZodiacItem/NotiZodiacItem';
import { PopperWrapper } from '..';
import { useEffect, useState } from 'react';
import { handleGetListNotiZodiacMessage } from '~/services/zodiac_messageService';

const cx = classNames.bind(styles);

function NotiZodiac({ user, socket }) {
    const [listNotiZodiac, setListNotiZodiac] = useState([]);
    const [lisOldtNotiZodiac, setLisOldtNotiZodiac] = useState([]);
    const [reload, setReload] = useState(false);
    const [page, setPage] = useState(1);
    const [dataOfRequest, setDataOfRequest] = useState({
        prev: false,
        next: false,
        lastPage: 1,
    });
    const [currentNoti, setCurrentIdNoti] = useState(null);

    const fetchApi = async () => {
        try {
            var resListNoti, resListNoti_;
            resListNoti_ = await handleGetListNotiZodiacMessage(user?.idUser, 0);
            resListNoti = await handleGetListNotiZodiacMessage(user?.idUser, page);
            setLisOldtNotiZodiac(resListNoti.listMessage);

            setDataOfRequest({
                prev: resListNoti.prev,
                next: resListNoti.next,
                lastPage: page,
            });
            setListNotiZodiac(resListNoti_.listMessage);
        } catch (e) {
            console.log('error message', e.response);
        }
    };

    useEffect(() => {
        fetchApi();
    }, [user, reload]);

    const fetchCurrentData = async (currentNoti) => {
        try {
            setLisOldtNotiZodiac((prev) =>
                prev?.map((notification) =>
                    notification.idNoti === currentNoti ? { ...notification, isRead: 1 } : notification,
                ),
            );
            const resListNoti_ = await handleGetListNotiZodiacMessage(user?.idUser, 0);
            setListNotiZodiac(resListNoti_.listMessage);
        } catch (e) {
            console.log('error message', e.response);
        }
    };

    useEffect(() => {
        fetchCurrentData(currentNoti);
    }, [currentNoti]);

    const fetchMoreData = async (page) => {
        try {
            console.log('pageeee', page);
            const resListNoti = await handleGetListNotiZodiacMessage(user?.idUser, page);
            console.log('resListNoti', resListNoti);
            if (resListNoti.errCode === 0) {
                setLisOldtNotiZodiac((prev) => [...prev, ...resListNoti.listMessage]);

                setDataOfRequest({
                    prev: resListNoti.prev,
                    next: resListNoti.next,
                    lastPage: page,
                });
                setPage(page);
            }
        } catch (e) {
            console.log('error message', e.response);
        }
    };

    const handleLoadMore = () => {
        fetchMoreData(page + 1);
    };

    const fetchLittleData = async (page) => {
        try {
            const resListNoti = await handleGetListNotiZodiacMessage(user?.idUser, page);
            if (resListNoti?.errCode === 0) {
                setLisOldtNotiZodiac(resListNoti.listMessage);

                setDataOfRequest({
                    prev: resListNoti.prev,
                    next: resListNoti.next,
                    lastPage: page,
                });
                setPage(page);
            }
        } catch (e) {
            console.log('error message', e.response);
        }
    };
    const handleStopLoad = () => {
        fetchLittleData(1);
    };

    const handleReload = (value, notiId) => {
        setCurrentIdNoti(notiId);
    };

    useEffect(() => {
        if (socket === null) return;
        socket.off('receive-zodiac-message');
        socket.on('receive-zodiac-message', (data) => {
            data?.forEach((item) => {
                if (item.zodiac === user.idZodiac && item.idUser === user.idUser) {
                    setLisOldtNotiZodiac((prev) => [item, ...(prev || [])]);
                    setListNotiZodiac((prev) => [item, ...(prev || [])]);
                }
            });
        });
    }, [lisOldtNotiZodiac, socket, user]);

    const renderPreview = () => {
        return (
            <>
                {lisOldtNotiZodiac?.length && (
                    <PopperWrapper className={cx('noti-wrapper-scroll')}>
                        <NotiZodiacItem
                            onChangeStatusCreatePost={handleReload}
                            socket={socket}
                            listNotiZodiac={lisOldtNotiZodiac}
                            user={user.fullName}
                        />
                        {!(!dataOfRequest.prev && !dataOfRequest.next) && (
                            <div className={cx('noti-footer')}>
                                {(!dataOfRequest.prev || (dataOfRequest.prev && dataOfRequest.next)) && (
                                    <button className={cx('noti-btn-action', 'right')} onClick={handleLoadMore}>
                                        Xem thêm
                                    </button>
                                )}
                                {!dataOfRequest.next && (
                                    <button className={cx('noti-btn-action', 'right')} onClick={handleStopLoad}>
                                        Thu gọn
                                    </button>
                                )}
                            </div>
                        )}
                    </PopperWrapper>
                )}
            </>
        );
    };

    return (
        <div className={cx('icon-header')}>
            {listNotiZodiac?.filter((item) => item.isRead === 0).length !== 0 && (
                <span className={cx('count-circle')}>{listNotiZodiac?.filter((item) => item.isRead === 0).length}</span>
            )}
            <Tippy offset={[10, 9]} interactive placement="bottom" content={renderPreview()}>
                <div>
                    <NotifIcon />
                </div>
            </Tippy>
        </div>
    );
}

export default NotiZodiac;
