import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function AdminBar() {
    const [currentPage, setCurrentPage] = useState('Varastot');

    const pages = [
        { name: 'Tilaukset', path: '/varasto/0/delivery' },
        { name: 'Käyttäjät', path: '/admin/users' },
        { name: 'Hakemukset', path: '/admin/hakemukset' },
    ];

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/admin/users')) {
            setCurrentPage('Käyttäjät');
        } else if (location.pathname.startsWith('/admin/hakemukset')) {
            setCurrentPage('Hakemukset');
        } else {
            setCurrentPage('Varastot');
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
                        <Link to="/admin" style={{ color: 'white' }}>
                            Admin
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
