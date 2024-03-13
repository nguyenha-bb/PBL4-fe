import classNames from 'classnames/bind';
import styles from './ZodiacMessageLarge.module.scss';
import { Fragment, useState } from 'react';
import Modal from '../../Modal';

const cx = classNames.bind(styles);

function ZodiacMessageLarge({ idZodiac, name, content, hide, handleGetMessageList}) {
    const [zodiacName, setZodiacName] = useState(name)
    const [zodiacMessage, setZodiacMessage] = useState(content);
    const [isDisable, setIsDisable] = useState(false);

    const handleChangeContent = (event) => {
        if (event.target.value === '') setIsDisable(true);
        else setIsDisable(false);
        setZodiacMessage(event.target.value);
    };
    const handleOnClick = () => {
        if(!isDisable) {
            hide(zodiacMessage);
            handleGetMessageList(idZodiac, zodiacMessage);
        }
    }

    return (
        <div className={cx('wrapper-container')}>
            <div className={cx('content-header')}>
                <header className={cx('content-title')}>Zodiac Message</header>
            </div>
            <div className={cx('content')}>
                <div className={cx('item-field')}>
                    <div className={cx('item-heading')}>Zodiac</div>
                    <input type="text" value={zodiacName} readOnly className={cx('item-input')}/>
                </div>
                <div className={cx('item-field')}>
                    <div className={cx('item-heading')}>Content</div>
                    <textarea rows="10" value={zodiacMessage} onChange={(e) => handleChangeContent(e)} className={cx('item-input')}/>
                </div>
                <div onClick={handleOnClick} className={cx('item-btn', isDisable && 'disabled')}>
                    <button className={cx('btn-submit')}>OK</button>
                </div>
            </div>
        </div>
    );
}

export default ZodiacMessageLarge;
