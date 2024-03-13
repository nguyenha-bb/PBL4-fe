import classNames from 'classnames/bind';
import styles from './PreviewImage.module.scss';
import { useEffect, useState } from 'react';
import { handleGetMessageById } from '~/services/messageService';
const cx = classNames.bind(styles);
function PreviewImage({ baseUrl, idMessagePreview }) {
    const [imagePreviewResult, setImagePreviewResult] = useState('');

    console.log('idMessagePreview', idMessagePreview);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await handleGetMessageById(idMessagePreview);
                setImagePreviewResult(response?.messageDetail?.messageText);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [idMessagePreview]);

    console.log('imagePreviewResult', imagePreviewResult);

    return (
        <div className={cx('wrapper')}>
            <img src={`${baseUrl}/${imagePreviewResult}`} alt="" />
        </div>
    );
}

export default PreviewImage;
