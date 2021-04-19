import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        setTimeout(() => callback(page), 2000);
        setPage(page + 1);
    }, [isFetching]);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
        setIsFetching(true);
    }

    return [isFetching, setIsFetching];
};

export default useInfiniteScroll;