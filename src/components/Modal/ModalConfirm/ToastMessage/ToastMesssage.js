import classNames from 'classnames/bind';
import styles from './ToastMessage.module.scss';
import Button from '~/components/Button';
import { Banning, Check, CloseIcon, Notif } from '~/components/Icon/Icon';

const cx = classNames.bind(styles);

function ToastMesssage({ hide, children, user, handleOK, title, content, iconToast, iconStatus }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('icon-status', {
                [iconStatus]: true
            })}>
                {iconStatus === "success" ? <Check/> : (iconStatus === "failed" ? <Banning/> : <Notif/>)}
            </div>
            <div className={cx('body')}>
                <div className={cx('title')}>{title}</div>
                <div className={cx('content')}>{content}</div>
            </div>
            <div className={cx('icon-close')}>
                <CloseIcon/>
            </div>
        </div>
    );
}

export default ToastMesssage;
