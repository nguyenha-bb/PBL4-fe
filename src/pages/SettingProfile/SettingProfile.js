import classNames from 'classnames/bind';
import styles from './SettingProfile.module.scss';
import { useEffect, useState } from 'react';
import { getProfileSetting, handleEditProfile } from '~/services/userService';

const cx = classNames.bind(styles);

function SettingProfile() {
    // const [username, setUsername] = useState('');
    // const [name, setName] = useState('');
    // const [bio, setBio] = useState('');
    // const [date, setDate] = useState('');
    // const [gender, setGender] = useState('');
    const [updateInfoError, setUpdateInfoError] = useState('');

    const [infoUser, setInfoUser] = useState({
        username: '',
        name: '',
        bio: '',
        date: '',
        gender: '',
    })

    const handleOnChangeUsername = (event) => {
        // setUsername(event.target.value);
        setInfoUser((prev) => ({
            ...prev,
            username: event.target.value,
        }))
        console.log(event.target.value);
    };
    const handleOnChangeName = (event) => {
        setInfoUser((prev) => ({
            ...prev,
            name: event.target.value,
        }))
        // setName(event.target.value);
        console.log(event.target.value);
    };
    const handleOnChangeBio = (event) => {
        setInfoUser((prev) => ({
            ...prev,
            bio: event.target.value,
        }))
        // setBio(event.target.value);
        console.log(event.target.value);
    };
    const handleOnChangeDate = (event) => {
        // setDate(event.target.value);
        setInfoUser((prev) => ({
            ...prev,
            date: event.target.value,
        }))
        console.log(event.target.value);
    };
    const handleOnChangeGender = (event) => {
        // setGender(event.target.value);
        setInfoUser((prev) => ({
            ...prev,
            gender: event.target.value,
        }))
        console.log(event.target.value);
    };
    useEffect(() => {
        const fetchApi = async () => {
            try {
                let data = await getProfileSetting();
                console.log(data);
                if (data && data.errCode === 0) {
                    console.log('Get profile setting successfully');
                    const temp = String(data.user.birth);
                    const tempDate = new Date(temp);
                    const year = tempDate.getFullYear();
                    const month = (tempDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
                    const day = tempDate.getDate().toString().padStart(2, '0');
                    const formattedDate = year + '-' + month + '-' + day;
                    setInfoUser((prev) => (
                        {
                            ...prev,
                            username: data.user.userName,
                            name: data.user.fullName,
                            bio: data.user.bio,
                            date: formattedDate,
                            gender: data.user.gender,
                        }
                    ))
                } else {
                    console.log('data.message ' + data.message);
                }
            } catch (e) {
                console.log('error message', e.response);
            }
        }
        fetchApi();
    }, [])

    const handleOnSubmit = async () => {
        try {
            let data = await handleEditProfile(infoUser.username, infoUser.name, infoUser.bio, infoUser.date, infoUser.gender);
            console.log(data);
            if (data && data.errCode === 0) {
                // setReload();
                console.log('Update profile success');
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
                    <div className={cx('title')}>Edit profile</div>
                    <form className={cx('form-setting')} name="settingProfile" method="POST" action="">
                        <div className={cx('form-item')}>
                            <div className={cx('name-item')}>
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className={cx('body-item')}>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className={cx('input-item')}
                                    // placeholder="@yanni"
                                    onChange={(e) => handleOnChangeUsername(e)}
                                    value={infoUser.username}
                                    disabled
                                />
                                <div className={cx('desc-item')}>www.website.com/api/profile/@{infoUser.username}</div>
                                <div className={cx('desc-item')}>
                                    Usernames can only contain letters, numbers, underscores, and periods. Changing your
                                    username will also change your profile link.
                                </div>
                            </div>
                        </div>
                        <div className={cx('form-item')}>
                            <div className={cx('name-item')}>
                                <label htmlFor="name">Name 
                                    <span className={cx('required-input')}> *</span>
                                </label>
                            </div>
                            <div className={cx('body-item')}>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className={cx('input-item')}
                                    // placeholder="Yen Nhi"
                                    onChange={(e) => handleOnChangeName(e)}
                                    value={infoUser.name}
                                />
                            </div>
                        </div>
                        <div className={cx('form-item')}>
                            <div className={cx('name-item')}>
                                <label htmlFor="bio">Bio</label>
                            </div>
                            <div className={cx('body-item')}>
                                <textarea
                                    name="bio"
                                    id="bio"
                                    className={cx('textarea-item')}
                                    // placeholder="All love for Beomgyu"
                                    rows="4"
                                    cols="50"
                                    maxLength={200}
                                    onChange={(e) => handleOnChangeBio(e)}
                                    value={infoUser.bio}
                                />
                                <div className={cx('desc-item')}>allow 200 characters</div>
                            </div>
                        </div>
                        <div className={cx('form-item')}>
                            <div className={cx('name-item')}>
                                <label htmlFor="birthday">Date of birth 
                                    <span className={cx('required-input')}> *</span>
                                </label>
                            </div>
                            <div className={cx('body-item')}>
                                <input
                                    type="date"
                                    name="birthday"
                                    id="birthday"
                                    className={cx('input-item')}
                                    onChange={(e) => handleOnChangeDate(e)}
                                    value={infoUser.date}
                                />
                            </div>
                        </div>
                        <div className={cx('form-item')}>
                            <div className={cx('name-item')}>
                                <label htmlFor="gender">Gender 
                                    <span className={cx('required-input')}> *</span>
                                </label>
                            </div>
                            <div className={cx('body-item')}>
                                <select id="gender" onChange={(e) => handleOnChangeGender(e)} value={infoUser.gender}>
                                    <option value="0">Male</option>
                                    <option value="1">Female</option>
                                </select>
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

export default SettingProfile;
