import classNames from 'classnames/bind';
import styles from './A_DelUser.module.scss';
import Button from '~/components/Button';
import { handleDeleteUserByAdmin } from '~/services/userService';

const cx = classNames.bind(styles);

function A_DelUser({ hide, children, user, onChangeStatusDeleteUser }) {
    const handleDeleteUser = () => {
        onChangeStatusDeleteUser(false);
        handleDeleteUserByAdmin(user);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>{children}</div>
            <div className={cx('footer')}>
                <Button medium className={cx('btn-yes')} onClick={handleDeleteUser}>
                    Yes
                </Button>
                <Button onClick={hide} medium className={cx('btn-no')}>
                    No
                </Button>
            </div>
        </div>
    );
}

export default A_DelUser;
