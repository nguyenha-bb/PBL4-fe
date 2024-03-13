import classNames from 'classnames/bind';
import styles from './AdminSidebar.module.scss';
import { AdminAccount, Logout, Messenger, Report, UserGroup } from '~/components/Icon/Icon';
import Button from '~/components/Button';
import routes from '~/config/routes';
import { handleLogoutApi } from '~/services/userService';

const cx = classNames.bind(styles);
function AdminSidebar() {
    const handleLogoutAccout = async () => {
        try {
            await handleLogoutApi();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {/* <div className={cx('grid')}> */}
            <div className={cx('col l-12 m-12 c-12')}>
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('container', 'header')}>
                            <div className={cx('header-container')}>
                                <AdminAccount />
                                <h2>Admin</h2>
                            </div>
                        </div>
                    </div>
                    <div className={cx('container')}>
                        <div className={cx('action-container')}>
                            <div className={cx('row')}>
                                <div className={cx('col l-12 m-12 c-12')}>
                                    <div className={cx('button-action')}>
                                        <Button
                                            activeAdmin
                                            to={routes.adminShowUser}
                                            transparent
                                            normal
                                            large
                                            text
                                            leftIcon={<UserGroup />}
                                            className={cx('btn-sidebar')}
                                        >
                                            User
                                        </Button>

                                        <Button
                                            activeAdmin
                                            to={routes.adminShowMessage}
                                            transparent
                                            normal
                                            large
                                            text
                                            leftIcon={<Messenger />}
                                            className={cx('btn-sidebar')}
                                        >
                                            Message
                                        </Button>

                                        <Button
                                            activeAdmin
                                            transparent
                                            to={routes.adminShowReport}
                                            normal
                                            large
                                            text
                                            leftIcon={<Report />}
                                            className={cx('btn-sidebar')}
                                        >
                                            Report
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('logout')}>
                            <div className={cx('row')}>
                                <a href="/">
                                    <div className={cx('col l-12 m-12 c-12')}>
                                        <Logout onClick={handleLogoutAccout} />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSidebar;
