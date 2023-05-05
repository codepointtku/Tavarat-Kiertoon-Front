import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';

export default function AdminBar() {
    const [currentPage, setCurrentPage] = useState('Varastot');

    const pages = [
        { name: 'Varastot', path: '/admin/varastot' },
        { name: 'Tilaukset', path: '/varasto/0/delivery?page=0&rows=5' },
        { name: 'Käyttäjät', path: '/admin/users?page=0&rows=5' },
        { name: 'Hakemukset', path: '/admin/hakemukset' },
    ];

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

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/admin/varastot" style={{ color: 'white' }}>
                        Admin
                    </Link>
                    <Typography variant="subtitle2">{currentPage}</Typography>
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
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
    );
}
