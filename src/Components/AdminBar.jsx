import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function AdminBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Admin
                    </Typography>
                    <Button color="inherit">Tilaukset</Button>
                    <Button color="inherit">Varastot</Button>
                    <Button color="inherit">Käyttäjät</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
