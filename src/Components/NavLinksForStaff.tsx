import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container } from '@mui/material';
import AuthContext from '../Context/AuthContext';

// simple components to show links to logged in staff members

function NavLinksForStaff() {
    const { auth } = useContext(AuthContext);
    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {auth.storage_group && (
                    <Button sx={{}} variant="outlined" component={Link} to="/varasto" fullWidth>
                        Siirry varastonäkymään
                    </Button>
                )}
                {auth.bicycle_group && (
                    <Button sx={{ mt: 3 }} variant="outlined" component={Link} to="/pyorat/pyoravarasto" fullWidth>
                        Siirry pyörävarastonäkymään
                    </Button>
                )}
                {auth.admin_group && (
                    <Button sx={{ mt: 3, mb: 3 }} variant="outlined" component={Link} to="/admin" fullWidth>
                        Siirry ylläpitäjän näkymään
                    </Button>
                )}
            </Box>
        </Container>
    );
}

export default NavLinksForStaff;
