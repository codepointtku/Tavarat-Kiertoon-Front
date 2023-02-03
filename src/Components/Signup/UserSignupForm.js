import {
    Box,
    Container,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from '@mui/material';

import { useState } from 'react';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function UserSignupForm() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    mt: 2,
                    mb: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100%',
                    // backgroundColor: 'red',
                }}
            >
                <FormControl variant="outlined" fullWidth required>
                    <InputLabel htmlFor="outlined-adornment-password">Sähköpostiosoite</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type="text"
                        label="Sähköpostiosoite"
                        endAdornment={
                            <InputAdornment position="end">
                                <MailOutlineIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                    <InputLabel htmlFor="outlined-adornment-password">Salasana</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        label="Salasana"
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
                <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
                    <InputLabel htmlFor="outlined-adornment-password">Salasana uudelleen</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        label="Salasana uudelleen"
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
        </Container>
    );
}

export default UserSignupForm;
