import classNames from 'classnames/bind';
import styles from './ShowDetailZodiac.module.scss';
import { useEffect, useState } from 'react';
import { handleGetDetailNotiZodiacMessage, handleReadNotiZodiacMessage } from '~/services/zodiac_notiService';
import { formatISODateToCustomFormat } from '~/utils/date';

const cx = classNames.bind(styles);

function ShowDetailZodiac({ idPostShowing }) {
    const [messageDetail, setShowMessageDetail] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                var response;
                if (idPostShowing) {
                    response = await handleGetDetailNotiZodiacMessage(idPostShowing);
                    // await handleReadNotiZodiacMessage(idPostShowing);
                    setShowMessageDetail(response.noti_zodiac[0]);
                }
            } catch (error) {
                console.error('Error fetching user information: ' + error);
            }
        };

        fetchData();
    }, [idPostShowing]);

    function capitalizeFirstLetter(str) {
        return str?.charAt(0).toUpperCase() + str?.slice(1);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <span className={cx('name-zodiac')}>
                    <b>Zodiac:</b> {capitalizeFirstLetter(messageDetail?.nameZodiac)}
                </span>
                <span className={cx('time-send')}>{formatISODateToCustomFormat(messageDetail?.timePost)}</span>
            </div>
            <div className={cx('content')}>
                <textarea value={messageDetail?.content} disabled />
            </div>
        </div>
    );
}

export default ShowDetailZodiac;
