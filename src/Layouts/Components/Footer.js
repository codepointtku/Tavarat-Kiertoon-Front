import { Grid, Link as MuiLink, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link, useRouteLoaderData } from 'react-router-dom';
import LOGO2 from '../../Assets/LOGO2.png';

export default function Footer() {
    const { contacts: data } = useRouteLoaderData('root');
    // const url = `mailto:${data.email}`;
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

                    <Typography> {data?.phoneNumber} </Typography>

                    <Typography>{data?.address}</Typography>

                    <MuiLink href="https://github.com/codepointtku/Tavarat-Kiertoon-Front" color="#663900">
                        <GitHubIcon />
                    </MuiLink>
                </Grid>
                <Grid>
                    <Typography variant="subtitle2">Tietoa</Typography>
                    <Link to="/faq" underline="hover">
                        {' '}
                        <Typography variant="subtitle1" gutterBottom color="inherit">
                            {' '}
                            UKK - FAQ{' '}
                        </Typography>
                    </Link>
                    <Link to="/tiedotteet" underline="hover">
                        <Typography variant="subtitle1" gutterBottom color="inherit">
                            Tiedotteet
                        </Typography>
                    </Link>

                    <Link to="/backgroundinfo" underline="hover">
                        <Typography variant="subtitle1" gutterBottom color="inherit">
                            Taustaa
                        </Typography>
                    </Link>
                </Grid>
                <Grid>
                    <img src={LOGO2} alt="turkulogo" style={{ width: 200 }} />
                </Grid>
            </Grid>
        </Grid>
    );
}
