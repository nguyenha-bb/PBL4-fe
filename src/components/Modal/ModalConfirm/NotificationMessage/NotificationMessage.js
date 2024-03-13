import classNames from 'classnames/bind';
import styles from './NotificationMessage.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function NotificationMessage({ hide, fromId, socket, onlineUsers, matchId, title}) {

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>{title}</div>
            <div className={cx('footer')}>
                <Button onClick={hide} medium noMargin className={cx('btn-ok', 'btn')}>
                    OK
                </Button>
            </div>
        </div>
        
    );
}

export default NotificationMessage;
