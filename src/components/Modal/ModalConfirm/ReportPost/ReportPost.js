import classNames from 'classnames/bind';
import styles from './ReportPost.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';
import { handleAddReportToReport } from '~/services/reportService';
import { mydate } from '~/utils/date';

const cx = classNames.bind(styles);

function ReportPost({ idUser, idPost, onReportPost }) {
    const [content, setContent] = useState('');
    const [isDisable, setIsDisable] = useState(true);

    const handleChangeContent = (event) => {
        if (event.target.value === '') {
            setIsDisable(true);
        } else setIsDisable(false);
        setContent(event.target.value);
    };

    const handleAddReport = async () => {
        onReportPost(false);
        await handleAddReportToReport(idPost, idUser, content, mydate(new Date()));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <span>Report content</span>
            </div>
            <div className={cx('content')}>
                <textarea value={content} onChange={(value) => handleChangeContent(value)} />
            </div>
            <div className={cx('footer')}>
                {isDisable ? (
                    <Button normal className={cx('btn-post')} onClick={handleAddReport} disabled>
                        Report
                    </Button>
                ) : (
                    <Button normal className={cx('btn-post')} onClick={handleAddReport}>
                        Report
                    </Button>
                )}
            </div>
        </div>
    );
}

export default ReportPost;
