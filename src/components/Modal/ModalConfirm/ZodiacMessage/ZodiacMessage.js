import classNames from 'classnames/bind';
import styles from './ZodiacMessage.module.scss';
import { Fragment, useState } from 'react';
import Modal from '../../Modal';
import ZodiacMessageLarge from '../ZodiacMessageLarge';

const cx = classNames.bind(styles);

function ZodiacMessage({ handleGetMessageList, zodiacName, idZodiac, onclick, content }) {
    const [isShowing, setShowing] = useState(false);
    const [messageZodiac, setMesssageZodiac] = useState(content)


    const handleOnClick = () => {
        setShowing(!isShowing);
    }

    const handleOnGetMessageZodiac = (content) => {
        setShowing(!isShowing)
        setMesssageZodiac(content);
    }

    return (
        <Fragment>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <header className={cx('title')}>{zodiacName}</header>
                </div>
                <div className={cx('content')}>
                    <textarea onClick={handleOnClick} rows="8" cols="24" value={messageZodiac} readOnly className={cx('item-input')}/>
                </div>
            </div>
            
            <Modal
                primary
                closeAdmin
                isShowing={isShowing}
                background
                adminColor
                texttype
                hide={handleOnGetMessageZodiac}
            >
                <ZodiacMessageLarge handleGetMessageList={handleGetMessageList} idZodiac={idZodiac} name={zodiacName} content={messageZodiac} hide={handleOnGetMessageZodiac}/>
            </Modal>
        </Fragment>
    );
}

export default ZodiacMessage;
