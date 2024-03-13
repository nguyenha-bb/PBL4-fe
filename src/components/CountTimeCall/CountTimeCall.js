import classNames from 'classnames/bind';
import styles from './CountTimeCall.module.scss';
import images from '~/assets/images';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function CountTimeCall({ socket }) {
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecond((prevSecond) => (prevSecond + 1) % 60);

            if (second === 59) {
                setMinute((prevMinute) => (prevMinute + 1) % 60);

                if (minute === 59) {
                    setHour((prevHour) => prevHour + 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={cx('container')}>
            {String(hour).padStart(2, '0')} : {String(minute).padStart(2, '0')} : {String(second).padStart(2, '0')}
        </div>
    );
}

export default CountTimeCall;
