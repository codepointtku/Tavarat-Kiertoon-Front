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
            // console.log('prevParams', prevParams.getAll('kategoria'));
            return createSearchParams({
                ...Object.fromEntries(prevParams.entries()),
                // get colors and categories separately, because prevParams.entries() returns only the last value(?) if multiple params with same key
                varit: prevParams.getAll('varit'),
                kategoria: prevParams.getAll('kategoria'),
                sivu: (newPage + 1).toString(),
                sivukoko: rowsPerPage.toString(),
            });
        });
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setPage(1);
        setSearchParams((prevParams) => {
            return createSearchParams({
                ...Object.fromEntries(prevParams.entries()),
                // get colors and categories separately, because prevParams.entries() returns only the last value(?) if multiple params with same key
                varit: prevParams.getAll('varit'),
                kategoria: prevParams.getAll('kategoria'),
                sivu: '1',
                sivukoko: newRowsPerPage.toString(),
            });
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
                labelDisplayedRows={({ from, to, count }: { from: number; to: number; count: number }) =>
                    `${from}-${to} / ${count}`
                }
            />
        </Box>
    );
}

export default Pagination;
