import { Link } from 'react-router-dom';

import { Box, Typography, Container, Button, Link as MuiLink } from '@mui/material';

import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import MuiLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function LoginForm() {
    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">Kirjaudu sisään</Typography>

                <Box component="form" sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        label="Sähköpostiosoite"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        name="password"
                        type="password"
                        label="Salasana"
                        autoComplete="current-password"
                    />
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Muista minut" />
                    <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
                        Sisään
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <MuiLink variant="body2" component={Link} to="/doesnotexist/">
                                Unohtunut salasana?
                            </MuiLink>
                        </Grid>
                        <Grid item>
                            <MuiLink variant="body2" component={Link} to="/rekisteroidy">
                                Rekisteröidy
                            </MuiLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginForm;
