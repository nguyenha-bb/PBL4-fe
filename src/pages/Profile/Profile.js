import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { BookPost, Edit, ThreeDots } from '~/components/Icon/Icon';
import { PopperWrapper } from '~/components/Popper';
import Wrapper from '~/components/Wrapper';
import Tippy from '@tippyjs/react';
import AdjustPost from '~/components/Popper/AdjustPost/AdjustPost';
import { useModal } from '~/hooks';
import Modal from '~/components/Modal/Modal';
import CreatePost from '~/components/Modal/ModalConfirm/CreatePost';
import { useEffect, useState } from 'react';
import ProfileBrief from '~/components/Modal/ModalConfirm/ProfileBrief';
import { useParams } from 'react-router-dom';
import { handleGetInfoByID, handleGetInfoByUsername } from '~/services/userService';
import { handleGetPost } from '~/services/postService';
import { formatISODateToCustomFormat } from '~/utils/date';
import { useAppContext } from '~/components/AppContext/AppContext';

const cx = classNames.bind(styles);

function Profile({ user }) {
    console.log('user', user);
    const [reloadProfile, setReloadProfile] = useState(false);
    const [isReport, setIsReport] = useState(false);

    const renderPreview = (idPost, isReport) => {
        console.log('isReport____', isReport);
        return (
            <PopperWrapper className={cx('profile-propper')}>
                <AdjustPost
                    isReport={isReport}
                    idPost={idPost}
                    infoUser={infoUser}
                    idUser={user.idUser}
                    reloadProfile={() => setReloadProfile(!reloadProfile)}
                />
            </PopperWrapper>
        );
    };
    const { isShowing, toggle } = useModal();
    const [isShowingProfile, setShowingProfile] = useState(false);
    const toggleProfile = () => {
        setShowingProfile(!isShowingProfile);
    };
    const [infoUser, setInfoUser] = useState({});
    const [listPost, setListPost] = useState([]);
    const [idUser, setIdUser] = useState(null);

    const { nickname } = useParams();

    const fetchData = async () => {
        try {
            const data = await handleGetInfoByUsername(nickname.replace('@', ''));
            setIdUser(data.userData.user[0].idUser);
            const response = await handleGetInfoByID(data.userData.user[0].idUser);
            setInfoUser(response.userData.user);

            const response_post = await handleGetPost(data.userData.user[0].idUser);
            setListPost(response_post.postData.posts);
        } catch (error) {
            console.error('Error fetching user information: ' + error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [nickname, reloadProfile, isShowingProfile]);

    const handleChangeStatusCreatePost = async (value) => {
        toggle(value);
        setReloadProfile(!reloadProfile);
    };
    console.log('idUser ' + idUser + ' user.idUser ' + user.idUser);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('header')}>
                            <img className={cx('full-screen-image')} src={images.bg_profile} alt="" />
                            <div className={cx('user-info')}>
                                <div className={cx('info')}>
                                    <img className={cx('avatar')} src={images[infoUser.avatar]} alt="" />
                                    <div className={cx('info-user')}>
                                        <div className={cx('fullname')}>{infoUser.fullName}</div>
                                        <div className={cx('nickname')}>@{infoUser.userName}</div>
                                        {idUser === user.idUser && (
                                            <Button
                                                onClick={toggleProfile}
                                                normal
                                                className={cx('btn-edit')}
                                                leftIcon={<Edit />}
                                            >
                                                Edit Profile
                                            </Button>
                                        )}
                                        <Modal isShowing={isShowingProfile} hide={toggleProfile}>
                                            <ProfileBrief toggle={toggleProfile} infoUser={infoUser} />
                                        </Modal>
                                    </div>
                                </div>
                                {infoUser?.bio && (
                                    <div className={cx('bio')}>
                                        <span className={cx('title')}>Bio: </span>
                                        <span className={cx('content')}>{infoUser.bio}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('blog-container')}>
                            {idUser === user.idUser && (
                                <div className={cx('header-blog')}>
                                    <img src={images[infoUser.avatar]} alt="" />
                                    <input
                                        className={cx('thinking')}
                                        placeholder={`${infoUser.fullName} ơi, bạn đang nghĩ gì ?`}
                                        value={''}
                                        onClick={toggle}
                                    />
                                </div>
                            )}
                            <Modal
                                title="Create new post"
                                leftIcon={<BookPost />}
                                texttype
                                background
                                isShowing={isShowing}
                                hide={toggle}
                            >
                                <CreatePost
                                    onChangeStatusCreatePost={handleChangeStatusCreatePost}
                                    infoUser={infoUser}
                                />
                            </Modal>

                            <div className={cx('post-container')}>
                                {listPost?.map((item, index) => (
                                    <Wrapper key={index}>
                                        <div className={cx('post-top')}>
                                            <div className={cx('info-post')}>
                                                <img
                                                    className={cx('avatar-post')}
                                                    src={images[infoUser.avatar]}
                                                    alt=""
                                                />
                                                <div className={cx('post')}>
                                                    <div className={cx('name')}>{infoUser.fullName}</div>
                                                    <div className={cx('time-post')}>
                                                        {item.timePost == item.updatedAt
                                                            ? formatISODateToCustomFormat(item.timePost)
                                                            : 'Edited: ' + formatISODateToCustomFormat(item.updatedAt)}
                                                    </div>
                                                </div>
                                            </div>

                                            {idUser === user.idUser ? (
                                                <Tippy
                                                    offset={[100, -30]}
                                                    interactive
                                                    delay={[0, 100]}
                                                    placement="bottom"
                                                    content={renderPreview(item.idPost, false)}
                                                >
                                                    <div>
                                                        <ThreeDots className={cx('icon-dots')} />
                                                    </div>
                                                </Tippy>
                                            ) : (
                                                <Tippy
                                                    offset={[100, -30]}
                                                    interactive
                                                    delay={[0, 100]}
                                                    placement="bottom"
                                                    content={renderPreview(item.idPost, true)}
                                                >
                                                    <div>
                                                        <ThreeDots className={cx('icon-dots')} />
                                                    </div>
                                                </Tippy>
                                            )}
                                        </div>

                                        <div className={cx('post-content')}>{item.content}</div>
                                    </Wrapper>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
