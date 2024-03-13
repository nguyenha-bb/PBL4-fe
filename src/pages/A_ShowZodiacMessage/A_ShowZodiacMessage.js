/* eslint-disable react/jsx-pascal-case */
import classNames from 'classnames/bind';
import styles from './A_ShowZodiacMessage.module.scss';
import Button from '~/components/Button';
import { ChevronRight, Plus } from '~/components/Icon/Icon';
import { useEffect, useState } from 'react';
import { handleFilterListZodiacMessage, handleGetListZodiacMessage } from '~/services/zodiac_messageService';
import { formatOnlyDate } from '~/utils/date';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const A_ShowZodiacMessage = () => {
    const [listMessageZodiac, setListMessageZodiac] = useState([]);
    const [dataOfRequest, setDataOfRequest] = useState({
        prev: false,
        next: false,
        lastPage: 1,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);

    const handleOnChangeDate = (event, type) => {
        const value = event.target.value;

        if (type === 'from') {
            setStartDate(value);
        } else if (type === 'to') {
            setEndDate(value);
        }
    };

    const fetchData = async (page, startDate, endDate) => {
        try {
            setLoading(true);

            let response;

            if (startDate && endDate) {
                // Add one day to the endDate to include messages on that day
                const adjustedEndDate = new Date(endDate);
                adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

                response = await handleFilterListZodiacMessage(startDate, adjustedEndDate, page);
            } else {
                response = await handleGetListZodiacMessage(page);
            }

            if (response?.listMessage?.length !== 0) {
                setIsEmpty(false);
                setListMessageZodiac(response?.listMessage);
                setDataOfRequest({
                    prev: response?.prev,
                    next: response?.next,
                    lastPage: page,
                });
            } else {
                setListMessageZodiac([]);
                setIsEmpty(true);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(1, startDate, endDate);
    }, [startDate, endDate, isEmpty]);

    const handlePageChange = async (newPage) => {
        await fetchData(newPage, startDate, endDate);
    };

    const capitalizeFirstLetter = (str) => {
        return str?.charAt(0).toUpperCase() + str?.slice(1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    <div className={cx('col l-12 m-12 c-12')}>
                        <div className={cx('header')}>
                            <h2>Admin/Messages</h2>
                        </div>

                        <div className={cx('container')}>
                            <div className={cx('content-container')}>
                                <div className={cx('title-container')}>
                                    <div className={cx('filter-time')}>
                                        <b>Từ: </b>
                                        <input
                                            type="date"
                                            name="datefrom"
                                            className={cx('input-date-from')}
                                            value={startDate}
                                            onChange={(event) => handleOnChangeDate(event, 'from')}
                                        />

                                        <b>Đến: </b>
                                        <input
                                            type="date"
                                            name="dateto"
                                            className={cx('input-date-to')}
                                            value={endDate}
                                            onChange={(event) => handleOnChangeDate(event, 'to')}
                                        />
                                    </div>
                                    <Button primary_admin leftIcon={<Plus />} to={'/api/adminCreateMessage'}>
                                        Create new message
                                    </Button>
                                </div>
                                <div className={cx('main-content')}>
                                    {!isEmpty &&
                                        listMessageZodiac?.map((item, index) => (
                                            <div className={cx('content-row')} key={index}>
                                                <div className={cx('zodiac-name')}>
                                                    {capitalizeFirstLetter(item.nameZodiac)}
                                                </div>
                                                <div className={cx('content-value')}>{item.content}</div>
                                                <div className={cx('birth')}>{formatOnlyDate(item.timePost)}</div>
                                                <Link to={`/api/adminReadDetailMessage/${item.idZodiac_Message}`}>
                                                    <div className={cx('btn-action')}>
                                                        <ChevronRight />
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                </div>
                                <div className={cx('pagination')}>
                                    <span
                                        className={cx(
                                            'previous-page',
                                            'btn',
                                            dataOfRequest.prev && !isEmpty ? '' : 'disabled',
                                        )}
                                        onClick={() => handlePageChange(dataOfRequest.prev)}
                                    >
                                        Previous
                                    </span>
                                    <span className={cx('current-page', 'btn')}>{dataOfRequest.lastPage}</span>
                                    <span
                                        className={cx(
                                            'next-page',
                                            'btn',
                                            dataOfRequest.next && !isEmpty ? '' : 'disabled',
                                        )}
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
};

export default A_ShowZodiacMessage;
