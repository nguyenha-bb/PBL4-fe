import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { CircleXMark, Spinner } from '~/components/Icon/Icon';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '~/hooks/useDebounce';
import { PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { handleGetUserBySearch } from '~/services/userService';
const cx = classNames.bind(styles);

function Search({ user }) {
    console.log('user', user);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const debouncedValue = useDebounce(searchValue.trim(), 500); // Trim the value before debouncing

    const handleHideResult = () => {
        setShowResult(false);
    };

    const renderPreview = () =>
        searchResult.length && (
            <div className={cx('search-result')}>
                <PopperWrapper className={cx('primary')}>
                    <AccountItem searchResult={searchResult} />
                </PopperWrapper>
            </div>
        );

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    const handleClearResult = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue) {
            setSearchResult({});
            return;
        }

        console.log('idUser', user.idUser);
        const fetchApi = async () => {
            try {
                setLoading(true);
                const result = await handleGetUserBySearch(user.idUser, debouncedValue);
                setSearchResult(result.listUser.listUser || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchApi();
    }, [debouncedValue, searchValue, user.idUser]);

    console.log('result', searchResult);
    return (
        <Tippy
            offset={[10, 9]}
            interactive
            visible={showResult && searchResult.length !== 0}
            placement="bottom"
            render={renderPreview}
            onClickOutside={handleHideResult}
        >
            <div className={cx('wrapper')}>
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClearResult}>
                            <CircleXMark />
                        </button>
                    )}
                    {loading && searchValue && <Spinner className={cx('loading')} />}
                    {/* <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button> */}
                </div>
            </div>
        </Tippy>
    );
}

export default Search;
