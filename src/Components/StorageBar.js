import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';

export default function StorageBar() {
    const [currentPage, setCurrentPage] = useState('Tilaukset');

    const pages = [
        { name: 'Tilaukset', path: '/varasto/0/delivery?page=0&rows=5' },
        { name: 'Lisää tuote', path: '/varasto/luo' },
    ];

    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link
                            to="/varasto"
                            style={{ color: 'white' }}
                            onClick={() => {
                                setCurrentPage(null);
                            }}
                        >
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
                                    navigate(`${page.path}`);
                                    setCurrentPage(`${page.name}`);
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
