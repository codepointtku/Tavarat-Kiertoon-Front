import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function StorageBar() {
    const [currentPage, setCurrentPage] = useState('Tilaukset');

    const location = useLocation();
    const pages = [
        { name: 'Tilaukset', path: location?.state?.from == 'admin' ? '/admin/tilaukset/' : '/varasto/' },
        { name: 'Tuotteet', path: location?.state?.from == 'admin' ? '/admin/tuotteet/' : '/varasto/tuotteet' },
    ];

    const { id } = useParams();

    useEffect(() => {
        if (location.pathname.startsWith('/varasto/tuotteet')) {
            setCurrentPage('Tuotteet');
        } else if (location.pathname.startsWith(`/varasto/tilaukset/${id}`)) {
            setCurrentPage(`Tilaus: ${id}`);
        } else if (location.pathname.startsWith('/varasto')) {
            setCurrentPage('Tilaukset');
        } else {
            setCurrentPage(null);
        }
    }, [location]);
    return (
        <Box
        // sx={{ flexGrow: 1 }}
        >
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/varasto/" style={{ color: 'white' }}>
                            Varasto
                        </Link>
                        <Typography variant="subtitle2">{currentPage}</Typography>
                    </Typography> */}
                    <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                to={page.path}
                                component={Link}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
