import classNames from 'classnames/bind';
import styles from './ProfileBrief.module.scss';
import images from '~/assets/images';
import { useState } from 'react';
import { handleEditProfileBrief } from '~/services/userService';
import { useAppContext } from '~/components/AppContext/AppContext';

const cx = classNames.bind(styles);

function ProfileBrief({ toggle, infoUser }) {
    const [username, setUsername] = useState(infoUser.userName);
    const [name, setName] = useState(infoUser.fullName);
    const [bio, setBio] = useState(infoUser.bio);
    const [updateInfoError, setUpdateInfoError] = useState('');

    const handleOnChangeUsername = (event) => {
        setUsername(event.target.value);
        console.log(event.target.value);
    };
    const handleOnChangeName = (event) => {
        setName(event.target.value);
        console.log(event.target.value);
    };
    const handleOnChangeBio = (event) => {
        setBio(event.target.value);
        console.log(event.target.value);
    };

    const handleOnSubmit = async () => {
        try {
            const check = await handleEditProfileBrief(username, name, bio);
            if (check.errCode === 0) {
                console.log(check);
                toggle();
            } else {
                setUpdateInfoError(check.message);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Edit profile</div>
            <form className={cx('form-setting')} name="settingProfile" method="POST" action="">
                <div className={cx('form-item')}>
                    <div className={cx('name-item')}>
                        <label for="avatar">Profile photo</label>
                    </div>
                    <div className={cx('avatar-container')}>
                        <img
                            name="avatar"
                            id="avatar"
                            className={cx('avatar-item')}
                            src={images[infoUser.avatar]}
                            alt="error"
                        />
                    </div>
                </div>
                <div className={cx('form-item')}>
                    <div className={cx('name-item')}>
                        <label for="username">Username</label>
                    </div>
                    <div className={cx('body-item')}>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className={cx('input-item')}
                            placeholder={`@${infoUser.userName}`}
                            value={`${infoUser.userName}`}
                            onChange={(e) => handleOnChangeUsername(e)}
                            disabled
                        />
                        <div className={cx('desc-item')}>www.website.com/api/profile/@{`${infoUser.userName}`}</div>
                        <div className={cx('desc-item')}>
                            Usernames can only contain letters, numbers, underscores, and periods. Changing your
                            username will also change your profile link.
                        </div>
                    </div>
                </div>
                <div className={cx('form-item')}>
                    <div className={cx('name-item')}>
                        <label for="name">Name
                            <span className={cx('required-input')}> *</span>
                        </label>
                    </div>
                    <div className={cx('body-item')}>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className={cx('input-item')}
                            // placeholder={`${infoUser.fullName}`}
                            // value={`${infoUser.fullName}`}
                            value={name && name}
                            onChange={(e) => handleOnChangeName(e)}
                        />
                    </div>
                </div>
                <div className={cx('form-item')}>
                    <div className={cx('name-item')}>
                        <label for="bio">Bio</label>
                    </div>
                    <div className={cx('body-item')}>
                        <textarea
                            name="bio"
                            id="bio"
                            className={cx('textarea-item')}
                            // placeholder={`${infoUser.bio}`}
                            rows="4"
                            cols="50"
                            maxLength={200}
                            // value={infoUser.bio && `${infoUser.bio}`}
                            value={bio && bio}
                            onChange={(e) => handleOnChangeBio(e)}
                        />
                        <div className={cx('desc-item')}>allow 200 characters</div>
                    </div>
                </div>

                <div className={cx('update-error')}>
                    <span className={cx('update-error-message')}>{updateInfoError}</span>
                </div>

                <div className={cx('submit-contaniner')}>
                    <button onClick={toggle} type="button" className={cx('cancel-btn')}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleOnSubmit} className={cx('submit-btn')}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProfileBrief;
