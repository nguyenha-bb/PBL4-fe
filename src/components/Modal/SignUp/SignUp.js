import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import Button from '~/components/Button';
import { Eye, Facebook, Gmail, NotEye } from '~/components/Icon/Icon';
import { useReducer, useState } from 'react';
import Login from '../Login';
import reducer from './reducer';
import { initialState } from './reducer';
import { handleSignupApi } from '~/services/userService';
import { mydate } from '~/utils/date';

const cx = classNames.bind(styles);

function SignUp() {
    const [isShowLogin, setIsShowLogin] = useState(false);

    function toggleLogin() {
        setIsShowLogin(!isShowLogin);
    }

    const [isTogglePassword, setTogglePassword] = useState(false);

    function handleTogglePassword() {
        setTogglePassword(!isTogglePassword);
    }

    const [isTogglePasswordRepeat, setTogglePasswordRepeat] = useState(false);

    function handleTogglePasswordRepear() {
        setTogglePasswordRepeat(!isTogglePasswordRepeat);
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const { username, password, repeatpassword, fullname, date, gender } = state;
    // Các hàm xử lý sự kiện
    const handleOnChangeUsername = (event) => {
        dispatch({ type: 'SET_USERNAME', payload: event.target.value });
    };

    const handleOnChangePassword = (event) => {
        dispatch({ type: 'SET_PASSWORD', payload: event.target.value });
    };

    const handleOnChangeRepeatPassword = (event) => {
        dispatch({ type: 'SET_REPEAT_PASSWORD', payload: event.target.value });
    };

    const handleOnChangeFullName = (event) => {
        dispatch({ type: 'SET_FULL_NAME', payload: event.target.value });
    };

    const handleOnChangeDate = (event) => {
        dispatch({ type: 'SET_DATE', payload: event.target.value });
    };

    const handleOnChangeGender = (event) => {
        dispatch({ type: 'SET_GENDER', payload: event.target.value });
    };

    const [signupError, setSignupError] = useState('');
    const handleSignup = async () => {
        try {
            let data = await handleSignupApi(username, password, repeatpassword, fullname, date, gender, mydate(new Date()));
            console.log(data);
            if (data && data.errCode === 0) {
                console.log('sign up success');
            } else {
                console.log('data.message ' + data.message);
            }
            setSignupError(data.message);
        } catch (e) {
            console.log('error message', e.response);
        }
    };

    return (
        <div>
            {isShowLogin ? (
                <Login />
            ) : (
                <div className={cx('wrapper-form')}>
                    <div className={cx('modal-header')}>
                        <h2 className={cx('header-title')}>Sign Up</h2>
                    </div>
                    <div className={cx('sigup-container')}>
                        <div className={cx('left-side')}>
                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Username or gmail</span>
                                <div className={cx('input')}>
                                    <input
                                        type="text"
                                        name="username"
                                        value={username}
                                        onChange={(event) => handleOnChangeUsername(event)}
                                    />
                                </div>
                            </div>

                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Password</span>
                                <div className={cx('input')}>
                                    <input
                                        type={isTogglePassword ? 'text' : 'password'}
                                        name="password"
                                        value={password}
                                        onChange={(event) => handleOnChangePassword(event)}
                                    />
                                    {isTogglePassword ? (
                                        <Eye className={cx('eye')} onClick={() => handleTogglePassword()} />
                                    ) : (
                                        <NotEye className={cx('eye')} onClick={() => handleTogglePassword()} />
                                    )}
                                </div>
                            </div>

                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Repeat Password</span>
                                <div className={cx('input')}>
                                    <input
                                        type={isTogglePasswordRepeat ? 'text' : 'password'}
                                        name="reapeatpassword"
                                        value={repeatpassword}
                                        onChange={(event) => handleOnChangeRepeatPassword(event)}
                                    />
                                    {isTogglePasswordRepeat ? (
                                        <Eye className={cx('eye')} onClick={() => handleTogglePasswordRepear()} />
                                    ) : (
                                        <NotEye className={cx('eye')} onClick={() => handleTogglePasswordRepear()} />
                                    )}{' '}
                                </div>
                            </div>
                        </div>

                        <div className={cx('right-side')}>
                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Fullname</span>
                                <div className={cx('input')}>
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={fullname}
                                        onChange={(event) => handleOnChangeFullName(event)}
                                    />
                                </div>
                            </div>

                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Date of birth</span>
                                <div className={cx('input')}>
                                    <input
                                        type="date"
                                        name="date"
                                        value={date}
                                        className={cx('input-date')}
                                        onChange={(event) => handleOnChangeDate(event)}
                                    />
                                </div>
                            </div>

                            <div className={cx('wrapper')}>
                                <span className={cx('title-input')}>Gender</span>
                                <div className={cx('input')}>
                                    <select
                                        className={cx('selection-options')}
                                        value={gender}
                                        onChange={(event) => handleOnChangeGender(event)}
                                        name="gender"
                                    >
                                        <option value="0">Male</option>
                                        <option value="1">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('signup-error')}>
                        <span className={cx('signup-error-message')}>{signupError}</span>
                    </div>
                    <div className={cx('footer')}>
                        <Button home small normal onClick={() => handleSignup()}>
                            OK
                        </Button>

                        <div className={cx('request')}>
                            Have an account ?
                            <span className={cx('signup-request')} onClick={toggleLogin}>
                                Log in
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignUp;
