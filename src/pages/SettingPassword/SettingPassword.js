import classNames from 'classnames/bind';
import styles from './SettingPassword.module.scss';
import { Eye, NotEye } from '~/components/Icon/Icon';
import { useState } from 'react';
import { handleChangePassword } from '~/services/userService';

const cx = classNames.bind(styles);

function SettingPassword() {
    const [isShowCurrentPassword, setShowCurrentPassword] = useState(false);
    const [isShowNewPassword, setShowNewPassword] = useState(false);
    const [isShowRetypePassword, setShowRetypePassword] = useState(false);
    const [updateInfoError, setUpdateInfoError] = useState('');
    const handleToggleCurrentPassword = () => {
        setShowCurrentPassword(!isShowCurrentPassword);
    };
    const handleToggleNewPassword = () => {
        setShowNewPassword(!isShowNewPassword);
    };
    const handleToggleRetypePassword = () => {
        setShowRetypePassword(!isShowRetypePassword);
    };

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const handleOnChangeCurrentPassword = (event) => {
        setCurrentPassword(event.target.value);
        console.log(event.target.value);
    };
    const handleOnChangeNewPassword = (event) => {
        setNewPassword(event.target.value);
        console.log(event.target.value);
    };
    const handleOnChangeRetypePassword = (event) => {
        setRetypePassword(event.target.value);
        console.log(event.target.value);
    };
    const handleOnSubmit = async () => {
        try {
            let data = await handleChangePassword(currentPassword, newPassword, retypePassword);
            console.log(data);
            if (data && data.errCode === 0) {
                console.log('Update password successfully!');
            } else {
                console.log('data.message ' + data.message);
            }
            setUpdateInfoError(data.message);
        } catch (e) {
            console.log('error message', e.response);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('container')}>
                    <div className={cx('title')}>Change password</div>
                    <form className={cx('form-setting')} name="settingPassword" method="POST" action="">
                        <div className={cx('form-item')}>
                            <div className={cx('name-item')}>
                                <label htmlFor="currentpassword">Current password</label>
                            </div>
                            <div className={cx('body-item')}>
                                <div className={cx('input-container')}>
                                    <input
                                        type={isShowCurrentPassword ? 'text' : 'password'}
                                        name="currentpassword"
                                        id="currentpassword"
                                        className={cx('input-item')}
                                        placeholder="Enter current password"
                                        value={currentPassword}
                                        onChange={(e) => handleOnChangeCurrentPassword(e)}
                                    />
                                    {isShowCurrentPassword ? (
                                        <Eye className={cx('eye')} onClick={() => handleToggleCurrentPassword()} />
                                    ) : (
                                        <NotEye className={cx('eye')} onClick={() => handleToggleCurrentPassword()} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={cx('form-item')}>
                            <div className={cx('name-item')}>
                                <label htmlFor="newpassword">New password</label>
                            </div>
                            <div className={cx('body-item')}>
                                <div className={cx('input-container')}>
                                    <input
                                        type={isShowNewPassword ? 'text' : 'password'}
                                        name="newpassword"
                                        id="newpassword"
                                        className={cx('input-item')}
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => handleOnChangeNewPassword(e)}
                                    />
                                    {isShowNewPassword ? (
                                        <Eye className={cx('eye')} onClick={() => handleToggleNewPassword()} />
                                    ) : (
                                        <NotEye className={cx('eye')} onClick={() => handleToggleNewPassword()} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={cx('form-item')}>
                            <div className={cx('name-item')}>
                                <label htmlFor="retypepassword">Re-type password</label>
                            </div>
                            <div className={cx('body-item')}>
                                <div className={cx('input-container')}>
                                    <input
                                        type={isShowRetypePassword ? 'text' : 'password'}
                                        name="retypepassword"
                                        id="retypepassword"
                                        className={cx('input-item')}
                                        placeholder="Re-type new password"
                                        value={retypePassword}
                                        onChange={(e) => handleOnChangeRetypePassword(e)}
                                    />
                                    {isShowRetypePassword ? (
                                        <Eye className={cx('eye')} onClick={() => handleToggleRetypePassword()} />
                                    ) : (
                                        <NotEye className={cx('eye')} onClick={() => handleToggleRetypePassword()} />
                                    )}
                                </div>
                                <div className={cx('desc-item')}>
                                    Your password must be at least 6 characters and should include a combination of
                                    numbers, letters and special characters (!$@%).
                                </div>
                            </div>
                        </div>

                        <div className={cx('update-error')}>
                            <span className={cx('update-error-message')}>{updateInfoError}</span>
                        </div>

                        <div className={cx('submit-contaniner')}>
                            <button type="button" className={cx('submit-btn')} onClick={handleOnSubmit}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SettingPassword;
