import {
    Avatar,
    // Link,
    Box,
    Typography,
    Container,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from '@mui/material';

// import FormControlLabel from '@mui/material/FormControlLabel';
// import Grid from '@mui/material/Grid';

import { useState } from 'react';

// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // backgroundColor: 'green',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <VpnKeyIcon />
                </Avatar>
                <Typography variant="h5">Luo uusi käyttäjä</Typography>

                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '100%',
                        // backgroundColor: 'red',
                    }}
                >
                    <FormControl sx={{ m: 1 }} variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-password">Sähköpostiosoite</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type="text"
                            label="Sähköpostiosoite"
                            helperText="Sähköpostiosoitteesi on käyttäjätunnuksesi"
                            endAdornment={
                                <InputAdornment position="end">
                                    <MailOutlineIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1 }} variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-password">Salasana</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            label="Salasana"
                            helperText="väärä passu dude"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-password">Salasana uudelleen</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            label="Salasana uudelleen"
                            helperText="passu ei mätsää"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
                        Rekisteröidy
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default SignupForm;
