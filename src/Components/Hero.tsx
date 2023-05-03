import { Avatar, Box, Grid, Stack, Typography } from '@mui/material';
import BackButton from './BackButton';
import TypographyTitle from './TypographyTitle';

interface Props {
    icon: string;
    title: string;
    subtitle: string;
}

function Hero({ icon, title, subtitle }: Props) {
    return (
        <>
            <Grid container className="back-btn-avatar-wrapper">
                <Grid item xs={4}>
                    <BackButton />
                </Grid>
                <Grid
                    item
                    xs={4}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: 'secondary.dark',
                            width: 48,
                            height: 48,
                        }}
                    >
                        {icon}
                    </Avatar>
                </Grid>
                <Grid item xs={4} />
            </Grid>
            <Box id="hero-texts-wrapper" p="1rem">
                <TypographyTitle text={title} />
                <Stack alignItems="center" mt="1rem">
                    <Typography variant="subtitle2">{subtitle}</Typography>
                </Stack>
            </Box>
        </>
    );
}

export default Hero;
