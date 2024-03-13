import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import { Eye, Facebook, Gmail, NotEye } from '~/components/Icon/Icon';
import SignUp from '../SignUp';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { handleLoginApi } from '~/services/userService';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const [isShowingSignUp, setIsShowingSignUp] = useState(false);

    function toggleSignUp() {
        setIsShowingSignUp(!isShowingSignUp);
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isShowPassword, setShowPassword] = useState(false);

    const handleOnChangeUsername = (event) => {
        setUsername(event.target.value);
        setLoginError('');
    };

    const handleOnChangePassword = (event) => {
        setPassword(event.target.value);
        setLoginError('');
    };

    const handleLogin = async () => {
        console.log('username: ' + username + ', password: ' + password);

        try {
            let data = await handleLoginApi(username, password);
            if (data && data.errCode === 0) {
                if (data.user.idRole === 0) navigate('/api/matching', { state: { data } });
                else navigate('/api/adminShowUser', { state: { data } });
            } else {
                console.log('data.message ' + data.message);
                setLoginError(data.message);
            }
        } catch (e) {
            console.log('error message', e.response);
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!isShowPassword);
    };
    return (
        <div>
            {isShowingSignUp ? (
                // <Modal title={'Sign up'} isShowing={isShowing} hide={toggleSignUp}>
                <SignUp />
            ) : (
                <div className={cx('wrapper-form')}>
                    <div className={cx('modal-header')}>
                        <h2 className={cx('header-title')}>Login</h2>
                    </div>
                    <div className={cx('wrapper')}>
                        <span className={cx('title-input')}>Username or gmail</span>
                        <div className={cx('input')}>
                            <input
                                type="text"
                                name="text"
                                value={username}
                                onChange={(event) => handleOnChangeUsername(event)}
                            />
                        </div>
                    </div>

                    <div className={cx('wrapper')}>
                        <span className={cx('title-input')}>Password</span>
                        <div className={cx('input')}>
                            <input
                                type={isShowPassword ? 'text' : 'password'}
                                name="password"
                                value={password}
                                onChange={(event) => handleOnChangePassword(event)}
                            />
                            {isShowPassword ? (
                                <Eye className={cx('eye')} onClick={() => handleTogglePassword()} />
                            ) : (
                                <NotEye className={cx('eye')} onClick={() => handleTogglePassword()} />
                            )}
                        </div>
                    </div>
                    {/* <span className={cx('forgot-password')}>Forgot password?</span> */}
                    <div className={cx('login-error')}>
                        <span className={cx('login-error-message')}>{loginError}</span>
                    </div>
                    <div className={cx('footer')}>
                        <Button
                            home
                            small
                            normal
                            onClick={() => {
                                handleLogin();
                            }}
                        >
                            OK
                        </Button>

                        <div className={cx('request')}>
                            Don’t have an account ?
                            <span className={cx('signup-request')} onClick={toggleSignUp}>
                                Sign Up
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
