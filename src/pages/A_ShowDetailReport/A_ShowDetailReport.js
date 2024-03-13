import classNames from 'classnames/bind';
import styles from './A_ShowDetailReport.module.scss';
import { BackIcon, Check, CloseIcon } from '~/components/Icon/Icon';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { handleAcceptReport, handleDenyReport, handleGetReportDetail } from '~/services/reportService';
import routes from '~/config/routes';
import Modal from '~/components/Modal/Modal';
import ConfirmAdmin from '~/components/Modal/ModalConfirm/ConfirmAdmin';

const cx = classNames.bind(styles);

function A_ShowDetailReport() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [infoReport, setInfoReport] = useState();
    const [isShowingAccept, setShowingAccept] = useState(false);
    const [isShowingDeny, setShowingDeny] = useState(false);
    const formatToDateTimeLocal = (isoString) => {
        const date = new Date(isoString);
        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    useEffect(() => {
        const fetchApi = async() => {
            try {
                const data = await handleGetReportDetail(id);
                if(data.errCode === 0) {
                    console.log(data);
                    setInfoReport(data.post)
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchApi();
    }, [])

    const handleAccept = async() => {
        try {
            const data = await handleAcceptReport(id);
            if(data.errCode === 0) {
                console.log(data);
                navigate(routes.adminShowReport);
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    const handleDeny = async() => {
        try {
            const data = await handleDenyReport(id);
            if(data.errCode === 0) {
                console.log(data);
                navigate(routes.adminShowReport);
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    const handleToggleModalAccept = () => {
        setShowingAccept(!isShowingAccept);
    }

    const handleToggleModalDeny = () => {
        setShowingDeny(!isShowingDeny);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('container')}>
                            <div className={cx('header')}>
                                <div className={cx('back-icon')}><BackIcon/></div>
                                <Link to={routes.adminShowReport}><h2 className={(cx('title'))}>Back</h2></Link>
                            </div>

                            <Modal
                                title="Report information"
                                texttype
                                admin
                                isShowing={isShowingAccept}
                                hide={handleToggleModalAccept}
                            >
                                <ConfirmAdmin hide={handleToggleModalAccept} handleOK={handleAccept}>Bạn có chắc chắn đồng ý report này không?</ConfirmAdmin>
                            </Modal>

                            <Modal
                                title="Report information"
                                texttype
                                admin
                                isShowing={isShowingDeny}
                                hide={handleToggleModalDeny}
                            >
                                <ConfirmAdmin hide={handleToggleModalDeny} handleOK={handleDeny}>Bạn có chắc chắn từ chối report này không?</ConfirmAdmin>
                            </Modal>

                            <div className={cx('content-container')}>
                                <form className={cx('form-detail')}>
                                    <header className={cx('form-title')}>Report information</header>
                                    <div className={cx('form-content')}>
                                        <div className={cx('sub-container')}>
                                            <div className={cx('sub-item')}>
                                                <div className={cx('item-heading')}>Id Post</div>
                                                <input type="text" value={infoReport && infoReport.idPost} readOnly className={cx('item-input')}/>
                                            </div>
                                            <div className={cx('sub-item')}>
                                                <div className={cx('item-heading')}>Id account</div>
                                                <input type="text" value={infoReport && infoReport.idAccPost} readOnly className={cx('item-input')}/>
                                            </div>
                                        </div>

                                        <div className={cx('form-item')}>
                                            <div className={cx('item-heading')}>Content</div>
                                            <textarea rows="3" value={infoReport && infoReport.content} readOnly className={cx('item-input', 'large')}/>
                                        </div>

                                        <div className={cx('sub-container')}>
                                            <div className={cx('sub-item')}>
                                                <div className={cx('item-heading')}>Time post</div>
                                                <input type="datetime-local" value={infoReport && formatToDateTimeLocal(infoReport.timePost)} readOnly className={cx('item-input')}/>
                                            </div>
                                            <div className={cx('sub-item')}>
                                                <div className={cx('item-heading')}>Number warning</div>
                                                <input type="text" value={infoReport && infoReport.wn} readOnly className={cx('item-input')}/>
                                            </div>
                                        </div>
                                        
                                        <div className={cx('container-btn')}>
                                            <div onClick={handleToggleModalAccept} class={cx('btn', 'btn-submit')}>
                                                <Check/>
                                                <button type='button' class={cx('text-btn')}>Accept</button>
                                            </div>
                                            <div onClick={handleToggleModalDeny} class={cx('btn', 'btn-deny')}>
                                                <CloseIcon/>
                                                <button type='button' class={cx('text-btn')}>Deny</button>
                                            </div>
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

export default A_ShowDetailReport;
