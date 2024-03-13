import classNames from 'classnames/bind';
import styles from './NotiZodiacItem.module.scss';
import images from '~/assets/images';
import { formatTimeNotiZodiacMessage } from '~/utils/date';
import Modal from '~/components/Modal/Modal';
import ShowDetailZodiac from '~/components/Modal/ModalConfirm/ShowDetailZodiac';
import { useState } from 'react';
import { handleReadNotiZodiacMessage } from '~/services/zodiac_notiService';

const cx = classNames.bind(styles);

function NotiZodiacItem({ listNotiZodiac, user, onChangeStatusCreatePost }) {
    const [isShowing, setIsShowing] = useState(false);
    const [idPostShowing, setIdPostShowing] = useState('');

    const handleToggleModel = async (notiId) => {
        try {
            setIsShowing(!isShowing);
            if (!isShowing) handleReadNotiZodiacMessage(notiId);
            setIdPostShowing(notiId);
            onChangeStatusCreatePost(!isShowing, notiId);
        } catch (error) {
            console.console.log(error);
        }
    };

    console.log('listNotiZodiac', listNotiZodiac);
    return (
        listNotiZodiac?.length && (
            <>
                {listNotiZodiac?.map((item, index) => (
                    <div
                        className={cx('wrapper', item.isRead && 'asRead')}
                        key={index}
                        onClick={() => handleToggleModel(item.idNoti)}
                    >
                        <img alt="" src={images.admin} />
                        <div className={cx('noti-container')}>
                            <div>
                                <span className={cx('nick-name')}>@zodiacLazy</span>
                                <span className={cx('noti-content')}>
                                    đã có thông điệp tuần mới rồi nè <b>{user}</b> ơi!
                                </span>
                                <div className={cx('time')}>{formatTimeNotiZodiacMessage(item.timePost)}</div>
                            </div>
                        </div>
                    </div>
                ))}

                <Modal background hide={handleToggleModel} isShowing={isShowing}>
                    <ShowDetailZodiac idPostShowing={idPostShowing} />
                </Modal>
            </>
        )
    );
}

export default NotiZodiacItem;
