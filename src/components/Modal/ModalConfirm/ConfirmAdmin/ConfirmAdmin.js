import classNames from 'classnames/bind';
import styles from './ConfirmAdmin.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ConfirmAdmin({ hide, children, user, handleOK }) {
    const handleOnClickYes = () => {
        handleOK();
        hide()
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>{children}</div>
            <div className={cx('footer')}>
                <Button medium className={cx('btn-yes')} onClick={handleOnClickYes}>
                    Yes
                </Button>
                <Button onClick={hide} medium className={cx('btn-no')}>
                    No
                </Button>
            </div>
        </div>
    );
}

export default ConfirmAdmin;
