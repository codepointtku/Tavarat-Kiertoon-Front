import { Box, Link as MuiLink, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import br from '../../Assets/br.jpg';
import HeroHeader from '../../Components/HeroHeader';
import HeroText from '../../Components/HeroText';

import MoodBadIcon from '@mui/icons-material/MoodBad';

const SuperLink = MuiLink as typeof MuiLink | typeof Link;

function HeroFooter() {
    return (
        <Typography>
            <SuperLink component={Link} to={-1 as unknown as string}>
                Palaa takaisin
            </SuperLink>{' '}
            tai{' '}
            <SuperLink component={Link} to="/otayhteytta">
                ota yhteyttä
            </SuperLink>
        </Typography>
    );
}

function UserError() {
    return (
        <Box id="error-element" padding="2rem">
            <HeroHeader Icon={<MoodBadIcon />} />
            <HeroText
                title="Hmmm..."
                subtitle="Käyttäjä-datan käsittelyssä tapahtui virhe"
                subtext2="Voit kokeilla sivun uudelleenlataamista."
                footer={<HeroFooter />}
            />
            <img src={br} alt="GET-REKT" style={{ width: 'auto', maxWidth: '40rem', height: 'auto' }} />
        </Box>
    );
}

export default UserError;
