import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { useState } from 'react';
import { handleCreatePost } from '~/services/postService';

const cx = classNames.bind(styles);

function CreatePost({ infoUser, onChangeStatusCreatePost }) {
    const [content, setContent] = useState('');
    const [isDisable, setIsDisable] = useState(true);

    const handleChangeContent = (event) => {
        if (event.target.value === '') setIsDisable(true);
        else setIsDisable(false);
        setContent(event.target.value);
    };
    const handleClickCreatePost = () => {
        handleCreatePost(infoUser.idUser, content);
        onChangeStatusCreatePost(false);
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
            <div className={cx('content')}>
                <textarea
                    value={content}
                    onChange={(value) => handleChangeContent(value)}
                    placeholder={`${infoUser.fullName} ơi, bạn đang nghĩ gì ?`}
                />
            </div>
            <div className={cx('footer')}>
                {isDisable ? (
                    <Button normal className={cx('btn-post')} onClick={handleClickCreatePost} disabled>
                        Post
                    </Button>
                ) : (
                    <Button normal className={cx('btn-post')} onClick={handleClickCreatePost}>
                        Post
                    </Button>
                )}
            </div>
        </div>
    );
}

export default CreatePost;
