import classNames from 'classnames/bind';
import styles from './A_ReadDetailZodiacMessage.module.scss';
import { BackIcon } from '~/components/Icon/Icon';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { handleGetZodiacMessageDetail } from '~/services/zodiac_messageService';
import { handleGetZodiacDetail } from '~/services/zodiacService';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function A_ReadDetailZodiacMessage() {
    const { id } = useParams();
    const [infoZodiacMessage, setInfoZodiacMessage] = useState();
    useEffect(() => {
        const fetchApi = async() => {
            try {
                const data = await handleGetZodiacMessageDetail(id);
                if(data.errCode === 0) {
                    const zodiacData = await handleGetZodiacDetail(data.message.idZodiac);
                    if(zodiacData.errCode === 0) {
                        data.message.nameZodiac = zodiacData.data.nameZodiac;
                        setInfoZodiacMessage(data.message);
                    }
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchApi();
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('container')}>
                            <div className={cx('header')}>
                                <div className={cx('back-icon')}><BackIcon/></div>
                                <Link to={routes.adminShowMessage}>
                                    <h2 className={(cx('title'))}>Back</h2>
                                </Link>
                            </div>

                            <div className={cx('content-container')}>
                                <div className={cx('wrapper-container')}>
                                    <div className={cx('content-header')}>
                                        <header className={cx('content-title')}>Zodiac Message</header>
                                    </div>
                                    <div className={cx('content')}>
                                        <div className={cx('item-field')}>
                                            <div className={cx('item-heading')}>Zodiac</div>
                                            <input type="text" value={infoZodiacMessage && infoZodiacMessage.nameZodiac} readOnly className={cx('item-input')}/>
                                        </div>
                                        <div className={cx('item-field')}>
                                            <div className={cx('item-heading')}>Content</div>
                                            <textarea rows="14" value={infoZodiacMessage && infoZodiacMessage.content} readOnly className={cx('item-input')}/>
                                        </div>
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

export default A_ReadDetailZodiacMessage;
