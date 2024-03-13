import classNames from 'classnames/bind';
import styles from './A_ShowReport.module.scss';
import { useEffect, useState } from 'react';
import { handleGetListReport } from '~/services/reportService';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function A_ShowReport() {
    const [listReports, setListReports] = useState([]);
    const [dataOfRequest, setDataOfRequest] = useState({
        prev: false,
        next: false,
        lastPage: 1,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async (page) => {
        try {
            setLoading(true);

            const response = await handleGetListReport(page);
            setDataOfRequest({
                prev: response.prev,
                next: response.next,
                lastPage: page,
            });
            setListReports(response.posts);
        } catch (error) {
            console.error('Error fetching user information: ' + error);
        }
    };

    useEffect(() => {
        fetchData(1);
    }, []);

    const handlePageChange = async (newPage) => {
        await fetchData(newPage);
    };

    console.log('listReports', listReports);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('header')}>
                            <h2>Admin/Report</h2>
                        </div>

                        <div className={cx('container')}>
                            <div className={cx('content-container')}>
                                <table className={cx('table')}>
                                    <thead>
                                        <tr>
                                            <th>idPost</th>
                                            <th>idAccount</th>
                                            <th>Number warnings</th>
                                            <th>Content</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listReports?.map((rp) => (
                                            <tr key={rp.idPost}>
                                                <td>{rp.idPost}</td>
                                                <td>{rp.idAccPost}</td>
                                                <td>{rp.wn}</td>
                                                <td className={cx('content-value')}>{rp.content}</td>
                                                <Link to={`/api/adminShowDetailReport/${rp.idPost}`}>
                                                    <td>
                                                        <span className={cx('resolve')}>Resolve</span>
                                                    </td>
                                                </Link>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

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

export default A_ShowReport;
