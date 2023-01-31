import { Grid, Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LOGO2 from '../../Assets/LOGO2.png';

export default function Footer() {
    return (
        <Grid
            component="footer"
            sx={{
                py: 5,
                px: 3,
                mt: 'auto',
                //   Miten teemasta backgroundColor primary tms?
                backgroundColor: 'primary.main',
            }}
        >
            <Grid sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', gridGap: 30 }}>
                <Grid>
                    <Typography variant="subtitle2" gutterBottom>
                        {' '}
                        Yhteystiedot{' '}
                    </Typography>

                    <Typography>puh: +358 40 531 8689</Typography>

                    <Typography>Rieskalähteentie 76, 20300 Turku</Typography>
                    <Link href="https://github.com/codepointtku/Tavarat-Kiertoon-Front" color="#663900">
                        <GitHubIcon />
                    </Link>
                </Grid>
                <Grid>
                    <Typography variant="subtitle2">Tietoa</Typography>
                    <Link href="/faq" color="inherit" underline="hover">
                        {' '}
                        <Typography variant="subtitle1" gutterBottom>
                            {' '}
                            UKK - FAQ{' '}
                        </Typography>
                    </Link>
                    <Link href="/announcements" color="inherit" underline="hover">
                        <Typography variant="subtitle1" gutterBottom>
                            Tiedotteet
                        </Typography>
                    </Link>

                    <Typography>TEKSTIÄ</Typography>
                </Grid>
                <Grid>
                    <img src={LOGO2} alt="turkulogo" style={{ width: 200 }} />
                </Grid>
            </Grid>
        </Grid>
    );
}
