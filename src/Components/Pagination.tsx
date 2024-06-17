import { createSearchParams, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, TablePagination } from '@mui/material';

function Pagination({ count, itemsText }: { count?: number; itemsText?: string }) {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(parseInt(searchParams.get('sivu') || '1'));
    const [rowsPerPage, setRowsPerPage] = useState(parseInt(searchParams.get('sivukoko') || '25'));

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage + 1);
        // return back to top of page
        // window.scrollTo(0, 0);
        setSearchParams((prevParams) => {
            prevParams.set('sivu', (newPage + 1).toString());
            prevParams.set('sivukoko', rowsPerPage.toString());
            return createSearchParams(prevParams);
        });
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setPage(1);
        setSearchParams((prevParams) => {
            prevParams.set('sivu', '1');
            prevParams.set('sivukoko', newRowsPerPage.toString());
            return createSearchParams(prevParams);
        });
    };

    useEffect(() => {
        if (searchParams.has('sivu')) {
            setPage(parseInt(searchParams.get('sivu') || '1'));
        } else {
            setPage(1);
        }
        if (searchParams.has('sivukoko')) {
            setRowsPerPage(parseInt(searchParams.get('sivukoko') || '25'));
        } else {
            setRowsPerPage(25);
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [location, searchParams]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TablePagination
                component="div"
                count={count || 0}
                page={page - 1}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50, 100]}
                labelRowsPerPage={itemsText ? `${itemsText} per sivu` : 'per sivu'}
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
            />
        </Box>
    );
}

export default Pagination;
