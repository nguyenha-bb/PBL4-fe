import classNames from 'classnames/bind';
import styles from './InputTag.module.scss';
import { Eye } from '../Icon/Icon';

const cx = classNames.bind(styles);

function InputTag({ title, type, not }) {
    not = false;
    return (
        <div className={cx('wrapper')}>
            <span className={cx('title-input')}>{title}</span>
            <div className={cx('input')}>
                <input type={type} name={type} />
                {type === 'password' && <Eye />}
            </div>
        </div>
    );
}

export default InputTag;
