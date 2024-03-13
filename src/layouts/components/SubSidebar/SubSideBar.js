import classNames from 'classnames/bind';
import styles from './SubSidebar.module.scss';
import Search from '../Search';
import { HandHeart, Logout, Messenger, NotifIcon, Setting, User, UserGroup } from '~/components/Icon/Icon';
import images from '~/assets/images';
import Button from '~/components/Button';
import routes from '~/config/routes';
import Tippy from '@tippyjs/react';
import NotiItem from '~/components/Popper/NotiItem';
import { PopperWrapper } from '~/components/Popper';
import { useModal } from '~/hooks';
import { Link, NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);
function Sidebar() {
    const { isShowing, toggle } = useModal();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('grid')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('title')}>
                            <div className={cx('row')}>Settings</div>
                        </div>

                        <div className={cx('body')}>
                            <div className={cx('row')}>
                                <NavLink
                                    className={(nav) => cx('wrapper-btn', { active: nav.isActive })}
                                    to={routes.settingProfile}
                                >
                                    Edit profile
                                </NavLink>
                                <NavLink
                                    className={(nav) => cx('wrapper-btn', { active: nav.isActive })}
                                    to={routes.settingPassword}
                                >
                                    Change password
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
