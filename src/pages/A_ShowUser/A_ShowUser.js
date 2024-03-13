/* eslint-disable react/jsx-pascal-case */
import classNames from 'classnames/bind';
import styles from './A_ShowUser.module.scss';
import { Eye, Trash } from '~/components/Icon/Icon';
import Modal from '~/components/Modal/Modal';
import A_DelUser from '~/components/Modal/ModalConfirm/A_DelUser';
import { useModal } from '~/hooks';
import { useEffect, useState } from 'react';
import { handleGetAllUserByAdmin } from '~/services/userService';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AdminShowUser({ onlineUsers }) {
    const [isShowing, handleShowing] = useState(false);
    const [listUser, setListUser] = useState([]);
    const [userDelete, setUserDelete] = useState(null);
    const [reloadPage, setReloadPage] = useState(false);

    const [dataOfRequest, setDataOfRequest] = useState({
        size: 0,
        prev: false,
        next: false,
        lastPage: 1,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userIdsOnline, setUserIdsOnline] = useState([]);
    console.log('onlineUsers...', onlineUsers);

    const fetchData = async (page) => {
        try {
            setLoading(true);
            const response = await handleGetAllUserByAdmin(page);
            setDataOfRequest({
                size: response.size,
                prev: response.prev,
                next: response.next,
                lastPage: page,
            });
            console.log('response.listUser', response.listUser);
            setListUser(response.listUser);
            const userIds = onlineUsers.map((user) => user.userID);
            setUserIdsOnline(userIds);
        } catch (error) {
            console.error('Error fetching user information: ' + error);
        }
    };

    useEffect(() => {
        fetchData(1);
    }, [onlineUsers, isShowing]);

    const handlePageChange = async (newPage) => {
        console.log('newPage', newPage);
        await fetchData(newPage);
    };

    const handleToggleModelDelete = (idUser) => {
        setUserDelete(idUser);
        handleShowing(!isShowing);
    };

    const handleChangeStatusDeleteUser = (value) => {
        handleShowing(value);
        setReloadPage(!reloadPage);
    };

    console.log('listUser', listUser);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('header')}>
                            <h2>Admin/User</h2>
                        </div>

                        <div className={cx('container')}>
                            <div className={cx('title-container')}>
                                <p className={cx('total-user-title')}>
                                    {dataOfRequest.size !== 0 && (
                                        <>
                                            Tổng số user: <span>{dataOfRequest.size}</span>
                                        </>
                                    )}
                                </p>

                                <p className={cx('total-user-online')}>
                                    {onlineUsers.length - 1 >= 0 && (
                                        <>
                                            Số user đang online: <span>{onlineUsers.length - 1}</span>
                                        </>
                                    )}
                                </p>
                            </div>

                            <div className={cx('content-container')}>
                                <table className={cx('table')}>
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Fullname</th>
                                            <th>Birthday</th>
                                            <th>Gender</th>
                                            <th>Number Warnings</th>
                                            <th>Online</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listUser?.map((item) => (
                                            <tr key={item.idUser}>
                                                <td>{item.userName}</td>
                                                <td>{item.fullName}</td>
                                                <td>{item.birth}</td>
                                                <td>{item.gender === 1 ? 'Nữ' : 'Nam'}</td>
                                                <td>{item.numberWarning}</td>
                                                <td>
                                                    {userIdsOnline.includes(item.idUser) ? (
                                                        <span className={cx('online')}>Online</span>
                                                    ) : (
                                                        <span className={cx('offline')}>Offline</span>
                                                    )}
                                                </td>
                                                <td>
                                                    <Link to={`/api/adminShowDetailUser/${item.idUser}`}>
                                                        <div className={cx('table-col-action')}>
                                                            <Eye />
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <div
                                                        className={cx('table-col-action')}
                                                        onClick={() => handleToggleModelDelete(item.idUser)}
                                                    >
                                                        <Trash />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Modal
                                    title="Delete User"
                                    texttype
                                    admin
                                    isShowing={isShowing}
                                    hide={handleToggleModelDelete}
                                >
                                    <A_DelUser
                                        onChangeStatusDeleteUser={handleChangeStatusDeleteUser}
                                        user={userDelete}
                                        hide={handleToggleModelDelete}
                                    >
                                        Bạn có chắc chắn muốn xóa người dùng này không ?
                                    </A_DelUser>
                                </Modal>

                                <div className={cx('pagination')}>
                                    <span
                                        className={cx('previous-page', 'btn', dataOfRequest.prev ? '' : 'disabled')}
                                        onClick={() => handlePageChange(dataOfRequest.prev)}
                                    >
                                        Previous
                                    </span>
                                    <span className={cx('current-page', 'btn')}>{dataOfRequest.lastPage}</span>
                                    <span
                                        className={cx('next-page', 'btn', dataOfRequest.next ? '' : 'disabled')}
                                        onClick={() => handlePageChange(dataOfRequest.next)}
                                    >
                                        Next
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminShowUser;
