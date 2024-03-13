import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function AccountItem({ searchResult }) {
    return searchResult?.map((item) => (
        <a href={`/api/profile/@${item?.userName}`} className={cx('wrapper')} key={item.idUser}>
            <img src={images[item?.avatar]} alt="" className={cx('image-search')} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{item?.fullName}</span>
                </h4>
                <span className={cx('username')}>{item?.userName}</span>
            </div>
        </a>
    ));
}

export default AccountItem;
