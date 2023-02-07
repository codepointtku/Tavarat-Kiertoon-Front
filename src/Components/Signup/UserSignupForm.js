import {
    Box,
    Container,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Avatar,
    Typography,
    // Link,
} from '@mui/material';

import { useState } from 'react';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function UserHeader() {
    return (
        <Box
            sx={{
                mt: 2,
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // backgroundColor: 'green',
            }}
        >
            <Avatar
                sx={{
                    bgcolor: 'secondary.main',
                    width: 64,
                    height: 64,
                }}
            >
                <VpnKeyIcon />
            </Avatar>
            <Typography mt={2} variant="h5">
                Luo uusi käyttäjätili
            </Typography>
            {/* <Link
                variant="body1"
                mt={2}
                // variant="outlined" endIcon={<HelpOutlineIcon />}
            >
                Henkilökohtainen käyttäjätili
            </Link> */}
        </Box>
    );
}

function UserSignupForm() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container
            id="signupform-user-horizontal-sizer"
            maxWidth="sm"
            // sx={{ backgroundColor: 'hotpink' }}
        >
            <UserHeader />
            <Container
                id="signupform-user-fields-wrapper"
                maxWidth="md"
                // sx={{ backgroundColor: 'green' }}
            >
                <Box
                    id="signupform-user-fields"
                    sx={{
                        mt: 2,
                        mb: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        // width: '100%',
                        // backgroundColor: 'red',
                    }}
                >
                    <FormControl variant="outlined" fullWidth required>
                        <InputLabel htmlFor="outlined-adornment-password">Sähköpostiosoite</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type="text"
                            label="Sähköpostiosoite"
                            placeholder="sinä@turku.fi"
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
                            placeholder="****"
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
                            placeholder="****"
                        />
                    </FormControl>
                    <Button type="submit" fullWidth sx={{ mt: 3, mb: 3 }}>
                        Rekisteröidy
                    </Button>
                    <Button size="small" variant="outlined" endIcon={<HelpOutlineIcon />}>
                        Lisää tietoa
                    </Button>
                </Box>
            </Container>
        </Container>
    );
}

export default UserSignupForm;
