import classNames from 'classnames/bind';
import styles from './AdjustPost.module.scss';
import Button from '~/components/Button';
import { BookPost, Edit, Remove, Report } from '~/components/Icon/Icon';
import { useModal } from '~/hooks';
import Modal from '~/components/Modal/Modal';
import EditPost from '~/components/Modal/ModalConfirm/EditPost';
import { useState } from 'react';
import Block from '~/components/Modal/ModalConfirm/Block/Block';
import ReportPost from '~/components/Modal/ModalConfirm/ReportPost';

const cx = classNames.bind(styles);

function AdjustPost({ isReport, idPost, infoUser, reloadProfile, idUser }) {
    console.log('isReport ', isReport);
    const { isShowing, toggle } = useModal();
    const [isShowingClearPost, setIsShowingClearPost] = useState(false);
    const [isShowingReport, setIsShowingReport] = useState(false);

    const handleChangeStatusEditPost = async (value) => {
        toggle(value);
        reloadProfile();
    };

    const handleToggleClear = () => {
        setIsShowingClearPost(!isShowingClearPost);
    };
    const handleDeletPostChange = (value) => {
        setIsShowingClearPost(value);
        reloadProfile();
    };

    const handleReportPost = (value) => {
        setIsShowingReport(value);
        reloadProfile();
    };

    const handleToggleReport = () => {
        setIsShowingReport(!isShowingReport);
    };
    return (
        <div className={cx('wrapper')}>
            <Modal title="Edit post" leftIcon={<BookPost />} texttype background isShowing={isShowing} hide={toggle}>
                <EditPost onChangeStatusEditPost={handleChangeStatusEditPost} infoUser={infoUser} idPost={idPost} />
            </Modal>
            {!isReport ? (
                <>
                    <Button className={cx('width-btn')} post leftIcon={<Edit />} onClick={toggle}>
                        Edit post
                    </Button>
                    <Button className={cx('width-btn')} post leftIcon={<Remove />} onClick={handleToggleClear}>
                        Delete post
                    </Button>
                </>
            ) : (
                <>
                    <Button className={cx('width-btn')} post leftIcon={<Report />} onClick={handleToggleReport}>
                        Report
                    </Button>
                </>
            )}

            <Modal title="Delete Post" texttype background isShowing={isShowingClearPost} hide={handleToggleClear}>
                <Block
                    hide={handleToggleClear}
                    isDeletePost={true}
                    idPost={idPost}
                    idAccPost={infoUser.idUser}
                    onDeletePost={handleDeletPostChange}
                >
                    Bạn có chắc chắn muốn xóa bài post này không ?
                </Block>
            </Modal>

            <Modal title="Report Post" texttype background isShowing={isShowingReport} hide={handleToggleReport}>
                <ReportPost onReportPost={handleReportPost} idUser={idUser} idPost={idPost} />
            </Modal>
        </div>
    );
}

export default AdjustPost;
