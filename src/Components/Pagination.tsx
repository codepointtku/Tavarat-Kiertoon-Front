import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TablePagination } from '@mui/material';

function Pagination({ count, itemsText }: { count?: number; itemsText?: string }) {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const [page, setPage] = useState(parseInt(query.get('sivu') || '0'));
    const [rowsPerPage, setRowsPerPage] = useState(parseInt(query.get('sivukoko') || '25'));

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
        navigate(`?sivu=${newPage + 1}&sivukoko=${rowsPerPage}`);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        navigate(`?sivu=${1}&sivukoko=${newRowsPerPage}`);
    };

    return (
        <TablePagination
            component="div"
            count={count || 1}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
            labelRowsPerPage={itemsText ? `${itemsText} per sivu` : 'per sivu'}
        />
    );
}

export default Pagination;
