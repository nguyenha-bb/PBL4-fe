import classNames from 'classnames/bind';
import styles from './A_CreateZodiacMessage.module.scss';
import { BackIcon, PlusIcon } from '~/components/Icon/Icon';
import ZodiacMessage from '~/components/Modal/ModalConfirm/ZodiacMessage';
import { useEffect, useState } from 'react';
import { handleGetListZodiac } from '~/services/zodiacService';
import { handleCreateZodiacMessage, handleGetIdZodiacMessage } from '~/services/zodiac_messageService';
import { Link, useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import Modal from '~/components/Modal/Modal';
import ConfirmAdmin from '~/components/Modal/ModalConfirm/ConfirmAdmin';
import { mydate } from '~/utils/date';
import { handleGetIdZodiac } from '~/services/userService';

const cx = classNames.bind(styles);

function A_CreateZodiacMessage({ onlineUsers, socket }) {
    console.log('onlineUsers', onlineUsers);
    const navigate = useNavigate();
    const [isShowing, setShowing] = useState(false);
    const [isShowingModal, setShowingModal] = useState(false);
    const [zodiacList, setZodiacList] = useState([]);
    const [zodiacMessageList, setZodiacMessageList] = useState([]);
    const [idZodiacList, setIdZodiacList] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const zodiacData = await handleGetListZodiac();
                if (zodiacData.errCode === 0) {
                    setZodiacList(zodiacData.listZodiac);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const uniqueIdZodiacs = [];
                const uniqueIdZodiacSet = new Set();

                for (const item of onlineUsers) {
                    if (item.userID !== 0) {
                        const idZodiacObject = await handleGetIdZodiac(item.userID);
                        const idZodiac = idZodiacObject.idZodiac.idZodiac;

                        const uniqueKey = `${item.userID}_${idZodiac}`;

                        if (!uniqueIdZodiacSet.has(uniqueKey)) {
                            uniqueIdZodiacSet.add(uniqueKey);
                            uniqueIdZodiacs.push({ userID: item.userID, idZodiac });
                        }
                    }
                }

                setIdZodiacList(uniqueIdZodiacs);
            } catch (err) {
                console.log(err);
            }
        };

        fetchApi();
    }, [onlineUsers]);

    useEffect(() => {
        let list = [];
        zodiacList?.map((item) => {
            list = [
                ...list,
                {
                    idZodiac: item.idZodiac,
                    content: 'Xin chao ngay moi!',
                },
            ];
        });
        setZodiacMessageList(list);
    }, [zodiacList]);

    const handleGetMessageList = (idZodiac, content) => {
        setZodiacMessageList((prev) => {
            const res = prev.map((item) => {
                if (item.idZodiac == idZodiac) {
                    item.content = content;
                }
                return item;
            });
            return res;
        });
        setShowing(!isShowing);
    };

    const handleOnSubmit = async () => {
        const newZodiacMessageList = [];

        try {
            await Promise.all(
                zodiacMessageList.map(async (item) => {
                    try {
                        var date = mydate(new Date());
                        await handleCreateZodiacMessage(item.idZodiac, item.content, date);

                        const zodiacs = idZodiacList.filter((zodiac) => zodiac.idZodiac === item.idZodiac);

                        if (zodiacs.length > 0) {
                            try {
                                for (const zodiac of zodiacs) {
                                    const res = await handleGetIdZodiacMessage(item.idZodiac, date, zodiac.userID);

                                    newZodiacMessageList.push({
                                        idUser: zodiac?.userID,
                                        idNoti: res?.idNoti,
                                        zodiac: item.idZodiac,
                                        timePost: date,
                                        isRead: 0,
                                    });
                                }
                            } catch (err) {
                                console.log(err);
                            }
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }),
            );

            if (socket && newZodiacMessageList.length !== 0) {
                socket.emit('create-zodiac-message', newZodiacMessageList);
            }

            navigate(routes.adminShowMessage);
        } catch (error) {
            console.error('Error in handleOnSubmit:', error);
        }
    };

    const handleToggleModal = () => {
        setShowingModal(!isShowingModal);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('container')}>
                            <div className={cx('header')}>
                                <div className={cx('back-icon')}>
                                    <BackIcon />
                                </div>
                                <Link to={routes.adminShowMessage}>
                                    <h2 className={cx('title')}>Back</h2>
                                </Link>
                            </div>

                            <Modal
                                title="Create zodiac message"
                                texttype
                                admin
                                isShowing={isShowingModal}
                                hide={handleToggleModal}
                            >
                                <ConfirmAdmin hide={handleToggleModal} handleOK={handleOnSubmit}>
                                    Bạn có chắc chắn tạo các thông điệp này không?
                                </ConfirmAdmin>
                            </Modal>

                            <div className={cx('content-container')}>
                                <header className={cx('content-header')}>Create Zodiac Message</header>
                                <div className={cx('list-zodiac')}>
                                    {zodiacList.map((item, index) => (
                                        <ZodiacMessage
                                            handleGetMessageList={handleGetMessageList}
                                            key={index}
                                            idZodiac={item.idZodiac}
                                            zodiacName={item.nameZodiac}
                                            content="Xin chao ngay moi!"
                                        />
                                    ))}
                                </div>
                                <div onClick={handleToggleModal} className={cx('container-btn')}>
                                    <div className={cx('btn-info')}>
                                        <PlusIcon />
                                        <button type="button" className={cx('btn-submit')}>
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default A_CreateZodiacMessage;
