import { Grid, Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

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
            <Grid sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center', gridGap: 30 }}>
                <Grid>
                    <Typography variant="subtitle2" gutterBottom>
                        {' '}
                        TIETOA{' '}
                    </Typography>

                    <Typography>puh</Typography>

                    <Typography>osoite</Typography>
                    <Link href="https://github.com/codepointtku/Tavarat-Kiertoon-Front" color="#663900">
                        <GitHubIcon />
                    </Link>
                </Grid>
                <Grid>
                    <Link href="google.com" color="inherit" underline="none">
                        {' '}
                        <Typography variant="subtitle2" gutterBottom>
                            {' '}
                            UKK - FAQ{' '}
                        </Typography>
                    </Link>

                    <Typography>hohohohohoho</Typography>
                </Grid>
                <Grid>
                    <Typography variant="subtitle2" gutterBottom>
                        CODEPOINT
                    </Typography>

                    <Typography>hommeleita</Typography>
                    <Typography>monia</Typography>
                </Grid>
                <Grid>
                    <Typography variant="subtitle2" gutterBottom>
                        PALVELUPALETTI
                    </Typography>
                    <Typography>hommeleita</Typography>
                    <Typography>hommeleita</Typography>
                    <Typography>hommeleita</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}
