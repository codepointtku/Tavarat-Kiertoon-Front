import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom';

export default function StorageBar() {
    const [currentPage, setCurrentPage] = useState('Tilaukset');

    const pages = [
        { name: 'Tilaukset', path: '/varasto/0/delivery?page=0&rows=5' },
        { name: 'Tuotteet', path: '/varasto/tuotteet' },
    ];

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    useEffect(() => {
        if (location.pathname.startsWith('/varasto/tuotteet')) {
            setCurrentPage('Tuotteet');
        } else if (location.pathname.startsWith(`/varasto/tilaus/${id}`)) {
            setCurrentPage(`Tilaus: ${id}`);
        } else if (location.pathname.startsWith('/varasto')) {
            setCurrentPage('Tilaukset');
        } else {
            setCurrentPage(null);
        }
    }, [location]);

    function handleNavigation(path) {
        if (path !== location.pathname) {
            navigate(path);
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/varasto/0/delivery?rows=5&page=0" style={{ color: 'white' }}>
                            Varasto
                        </Link>
                        <Typography variant="subtitle2">{currentPage}</Typography>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => {
                                    handleNavigation(`${page.path}`);
                                }}
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
