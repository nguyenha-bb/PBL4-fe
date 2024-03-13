import classNames from 'classnames/bind';
import styles from './A_ShowUserDetail.module.scss';
import { BackIcon } from '~/components/Icon/Icon';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { handleGetInfoByID } from '~/services/userService';
import config from '~/config';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function A_ShowUserDetail() {
    const { id } = useParams();
    const [infoUser, setInfoUser] = useState();
    useEffect(() => {
        const fetchApi = async() => {
            try {
                const data = await handleGetInfoByID(id);
                if(data.userData.errCode == 0) {
                    const temp = String(data.userData.user.birth);
                    const tempDate = new Date(temp);
                    const year = tempDate.getFullYear();
                    const month = (tempDate.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
                    const day = tempDate.getDate().toString().padStart(2, '0');
                    const formattedDate = year + '-' + month + '-' + day;
                    data.userData.user.birth = formattedDate;
                    setInfoUser(data.userData.user);
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchApi();
    }, [])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('container')}>
                            <div className={cx('header')}>
                                <div className={cx('back-icon')}><BackIcon/></div>
                                <Link to={routes.adminShowUser}><h2 className={(cx('title'))}>Back</h2></Link>
                            </div>

                            <div className={cx('content-container')}>
                                <form className={cx('form-detail')}>
                                    <header className={cx('form-title')}>Detail information</header>
                                    <div className={cx('form-content')}>
                                        <div className={cx('form-item')}>
                                            <div className={cx('item-heading')}>Username</div>
                                            <input type="text" value={infoUser && infoUser.userName} readOnly className={cx('item-input', 'large')}/>
                                        </div>
                                        <div className={cx('form-item')}>
                                            <div className={cx('item-heading')}>Full name</div>
                                            <input type="text" value={infoUser && infoUser.fullName} readOnly className={cx('item-input', 'large')}/>
                                        </div>
                                        <div className={cx('sub-container')}>
                                            <div className={cx('sub-item')}>
                                                <div className={cx('item-heading')}>Birthday</div>
                                                <input type="date" value={infoUser && infoUser.birth} readOnly className={cx('item-input', 'large')}/>
                                            </div>
                                            <div className={cx('sub-item')}>
                                                <div className={cx('item-heading')}>Gender</div>
                                                <label for="male">Male</label>
                                                <input type="radio" id="male" readOnly name="gender" checked={infoUser && infoUser.gender === 0 ? true : false} value="0"/>
                                                <label for="female">Female</label>
                                                <input type="radio" id="female" readOnly name="gender" checked={infoUser && infoUser.gender === 1 ? true : false} value="1"/>
                                            </div>
                                        </div>

                                        <div className={cx('form-item')}>
                                            <div className={cx('item-heading')}>Number warning</div>
                                            <input type="text" readOnly value={infoUser && infoUser.numberWarning} className={cx('item-input', 'large')}/>
                                        </div>

                                        <div className={cx('form-item')}>
                                            <div className={cx('item-heading')}>Bio</div>
                                            <textarea rows="3" readOnly value={infoUser && infoUser.bio} className={cx('item-input', 'large')}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default A_ShowUserDetail;
