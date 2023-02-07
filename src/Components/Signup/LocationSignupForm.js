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
} from '@mui/material';

import { useState } from 'react';

import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function LocationHero() {
    return (
        <Box
            sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // backgroundColor: 'green',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Luo uusi tili toimipaikalle
            </Typography>
            <Typography variant="body1" paragraph>
                Tili on tarkoitettu yhteiskäyttötiliksi toimipaikan henkilökunnan kesken.
            </Typography>
            <Typography variant="body2" paragraph>
                Anna sähköpostiosoitteeksi toimipaikan Tavarat Kiertoon-vastuuhenkilön osoite.
            </Typography>
            <Typography variant="body2" paragraph>
                Tilille on mahdollista kirjautua käyttäjätunnuksella, tai sähköpostiosoitteella.
            </Typography>
            <Button size="small" variant="outlined" endIcon={<HelpOutlineIcon />}>
                Lisää ohjeita
            </Button>
        </Box>
    );
}

function LocationHeader() {
    return (
        <Box
            sx={{
                mt: 1,
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // backgroundColor: 'green',
            }}
        >
            <Avatar
                sx={{
                    mt: 1,
                    bgcolor: 'secondary.main',
                    width: 64,
                    height: 64,
                }}
            >
                <VpnKeyIcon />
            </Avatar>
            <LocationHero />
        </Box>
    );
}

function LocationSignupForm() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container id="signupform-location-horizontal-sizer" maxWidth="md">
            <LocationHeader />
            <Container id="signupform-location-fields-wrapper" maxWidth="md">
                <Box
                    id="signupform-location-fields"
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
                        <InputLabel htmlFor="outlined-adornment-location">Toimipaikka</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-location"
                            type="text"
                            label="Toimipaikka"
                            endAdornment={
                                <InputAdornment position="end">
                                    <SmokingRoomsIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth required>
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
                        />
                    </FormControl>

                    <Button type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
                        Rekisteröidy
                    </Button>
                </Box>
            </Container>
        </Container>
    );
}

export default LocationSignupForm;
