import classNames from 'classnames/bind';
import styles from './EditPost.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import { handleGetInfoDetailPost, handleUpdatePost } from '~/services/postService';
import { formatISODateToCustomFormat } from '~/utils/date';

const cx = classNames.bind(styles);

function EditPost({ infoUser, idPost, onChangeStatusEditPost }) {
    const [content, setContent] = useState('');
    const [infoDetailPost, setInfoDetailPost] = useState([]);
    const [isDisable, setIsDisable] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const infoPost = await handleGetInfoDetailPost(infoUser.idUser, idPost);
                setInfoDetailPost(infoPost);
                setContent(infoPost?.post?.content);
            } catch (error) {
                console.error('Error fetching post information: ' + error);
            }
        };

        fetchData();
    }, [infoUser.idUser, idPost]);

    const handleChangeContent = (event) => {
        if (event.target.value === '') {
            setIsDisable(true);
        } else setIsDisable(false);
        setContent(event.target.value);
    };

    const handleClickEditPost = () => {
        onChangeStatusEditPost(false);
        handleUpdatePost(infoUser.idUser, idPost, content);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={images[infoUser.avatar]} alt="cancer" />
                <div className={cx('info-user')}>
                    <div className={cx('fullname')}>{infoUser.fullName}</div>
                    <div className={cx('nickname')}> @{infoUser.userName}</div>
                </div>
            </div>
            <span className={cx('time-post')}>
                Posted in: {formatISODateToCustomFormat(infoDetailPost?.post?.timePost)}
            </span>
            <div className={cx('content')}>
                <textarea value={content} onChange={(value) => handleChangeContent(value)} />
            </div>
            <div className={cx('footer')}>
                {isDisable ? (
                    <Button normal className={cx('btn-post')} onClick={handleClickEditPost} disabled>
                        Update
                    </Button>
                ) : (
                    <Button normal className={cx('btn-post')} onClick={handleClickEditPost}>
                        Update
                    </Button>
                )}
            </div>
        </div>
    );
}

export default EditPost;
