import classNames from 'classnames/bind';
import styles from './ConfirmMatching.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { Heart, HeartCrack } from '~/components/Icon/Icon';
import { useEffect, useState } from 'react';
import { handleGetInfoByID } from '~/services/userService';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function ConfirmMatching({ hide, fromId, socket, onlineUsers, matchId }) {

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>Bạn đã được matching thành công! Chọn OK để di chuyển đến cuộc trò chuyện!</div>
            <div className={cx('footer')}>
                <Button medium className={cx('btn-ok', 'btn')} to={routes.messages}>
                    OK
                </Button>
                <Button onClick={hide} medium noMargin className={cx('btn-cancel', 'btn')}>
                    Cancel
                </Button>
            </div>
        </div>
        
    );
}

export default ConfirmMatching;
