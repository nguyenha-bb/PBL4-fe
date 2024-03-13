import classNames from 'classnames/bind';
import styles from './Popper.module.scss';
import PropTypes from 'prop-types';
import React from 'react';

const cx = classNames.bind(styles);

const Popper = React.forwardRef(({ className, children }, ref) => (
    <div className={cx('wrapper', className)} ref={ref}>
        {children}
    </div>
));
Popper.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Popper;
