import { createSearchParams, useLocation, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { TablePagination } from '@mui/material';

function Pagination({ count, itemsText }: { count?: number; itemsText?: string }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(parseInt(searchParams.get('sivu') || '0'));
    const [rowsPerPage, setRowsPerPage] = useState(parseInt(searchParams.get('sivukoko') || '25'));

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
        // return back to top of page
        // window.scrollTo(0, 0);
        setSearchParams((prevParams) => {
            return createSearchParams({
                ...Object.fromEntries(prevParams.entries()),
                sivu: (newPage + 1).toString(),
                sivukoko: rowsPerPage.toString(),
            });
        });
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        setSearchParams((prevParams) => {
            return createSearchParams({
                ...Object.fromEntries(prevParams.entries()),
                sivu: '1',
                sivukoko: newRowsPerPage.toString(),
            });
        });
    };

    return (
        <TablePagination
            component="div"
            count={count || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
            labelRowsPerPage={itemsText ? `${itemsText} per sivu` : 'per sivu'}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
        />
    );
}

export default Pagination;
