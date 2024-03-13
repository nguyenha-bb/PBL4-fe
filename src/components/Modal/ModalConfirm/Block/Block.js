import classNames from 'classnames/bind';
import styles from './Block.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';

import { handlePutBlockConversation } from '~/services/conversationService';
import { handleDeletePost } from '~/services/postService';
const cx = classNames.bind(styles);

function Block({
    children,
    hide,
    idConversation,
    onBlockConversationChange,
    onDeleteConversation,
    onDeletePost,
    isDelete,
    isDeletePost,
    idPost,
    idAccPost,
}) {
    const [blockConversation, setBlockConversation] = useState(false);
    const handleYes = async () => {
        try {
            if (!isDelete && !isDeletePost) {
                await handlePutBlockConversation(idConversation);
                setBlockConversation(true);
                onBlockConversationChange(true);
            } else if (isDeletePost) {
                await handleDeletePost(idAccPost, idPost);
                onDeletePost(false);
            } else {
                // await handleDeleteConversation(idConversation);
                onDeleteConversation(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>{children}</div>
            <div className={cx('footer')}>
                <Button medium className={cx('btn-yes')} onClick={() => handleYes()}>
                    Yes
                </Button>
                <Button onClick={hide} medium className={cx('btn-no')}>
                    No
                </Button>
            </div>
        </div>
    );
}

export default Block;
