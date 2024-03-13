import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link, NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    active,
    activeAdmin,
    href,
    primary = false,
    primary_admin = false,
    normal = false,
    home = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    post = false,
    small = false,
    medium = false,
    large = false,
    noMargin = false,
    hover = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    transparent,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    //Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        primary_admin,
        home,
        outline,
        normal,
        text,
        rounded,
        disabled,
        noMargin,
        post,
        small,
        medium,
        large,
        transparent,
    });

    if (to) {
        if (active) {
            Comp = NavLink;
            props.className = (nav) => cx(classes, 'wrapper-btn', { active: nav.isActive });
        } else if (activeAdmin) {
            Comp = NavLink;
            props.className = (nav) => cx(classes, 'wrapper-btn', { activeAdmin: nav.isActive });
        } else {
            Comp = Link;
        }
        props.to = to;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    home: PropTypes.bool,
    post: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    medium: PropTypes.bool,
    large: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};

export default Button;
