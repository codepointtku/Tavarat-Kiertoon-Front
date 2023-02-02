import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function StorageBar() {
    const [currentPage, setCurrentPage] = useState('Tilaukset');

    const pages = [
        { name: 'Tilaukset', path: '/varasto/0/delivery' },
        { name: 'Lisää tuote', path: '/varasto/luo' },
    ];

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/varasto/luo')) {
            setCurrentPage('Lisää tuote');
        } else if (location.pathname.startsWith('/varasto/0')) {
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
