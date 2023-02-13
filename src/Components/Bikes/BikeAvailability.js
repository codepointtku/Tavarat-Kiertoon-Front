import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Grid, Paper, Stack, Typography, IconButton } from '@mui/material';
import PropTypes from 'prop-types';

export default function BikeAvailability({ dateInfo }) {
    const today = new Date(dateInfo.today);

    return (
        <Box sx={{ mb: 1 }}>
            <Typography sx={{ mb: 1 }} align="center">
                Saatavuus {today.toDateString()}
            </Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
                <IconButton aria-label="takaisin">
                    <NavigateBeforeIcon />
                </IconButton>

                <Box>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Typography variant="body2">14.2</Typography>
                            <Paper
                                elevation={3}
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'grey',
                                    margin: 'auto',
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">15.2</Typography>
                            <Paper
                                elevation={3}
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'green',
                                    margin: 'auto',
                                }}
                            >
                                <Typography sx={{ color: 'white', fontSize: 14 }} align="center">
                                    1
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">16.2</Typography>
                            <Paper
                                elevation={3}
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'red',
                                    margin: 'auto',
                                }}
                            >
                                <Typography sx={{ color: 'white', fontSize: 14 }} align="center">
                                    0
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">17.2</Typography>
                            <Paper
                                elevation={3}
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'green',
                                    margin: 'auto',
                                }}
                            >
                                <Typography sx={{ color: 'white', fontSize: 14 }} align="center">
                                    2
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">18.2</Typography>
                            <Paper
                                elevation={3}
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'green',
                                    margin: 'auto',
                                }}
                            >
                                <Typography sx={{ color: 'white', fontSize: 14 }} align="center">
                                    2
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item>
                            <Typography variant="body2">19.2</Typography>
                            <Paper
                                elevation={3}
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'green',
                                    margin: 'auto',
                                }}
                            >
                                <Typography sx={{ color: 'white', fontSize: 14 }} align="center">
                                    2
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">20.2</Typography>
                            <Paper
                                elevation={3}
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'green',
                                    margin: 'auto',
                                }}
                            >
                                <Typography sx={{ color: 'white', fontSize: 14 }} align="center">
                                    1
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">21.2</Typography>
                            <Paper
                                elevation={3}
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'green',
                                    margin: 'auto',
                                }}
                            >
                                <Typography sx={{ color: 'white', fontSize: 14 }} align="center">
                                    3
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">22.2</Typography>
                            <Paper
                                elevation={3}
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'green',
                                    margin: 'auto',
                                }}
                            >
                                <Typography sx={{ color: 'white', fontSize: 14 }} align="center">
                                    2
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">23.2</Typography>
                            <Paper
                                elevation={3}
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: 'green',
                                    margin: 'auto',
                                }}
                            >
                                <Typography sx={{ color: 'white', fontSize: 14 }} align="center">
                                    2
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <IconButton aria-label="eteenpäin">
                    <NavigateNextIcon />
                </IconButton>
            </Stack>
            {/* <Button
                                variant="outlined"
                                size="small"
                                startIcon={<InfoOutlinedIcon />}
                                onClick={() => setIsRentModalVisible(true)}
                            >
                                Katso vapaus
                            </Button> */}
        </Box>
    );
}

BikeAvailability.propTypes = {
    dateInfo: PropTypes.shape({
        today: PropTypes.string,
        available_from: PropTypes.string,
        available_to: PropTypes.string,
        monday: PropTypes.string,
    }).isRequired,
};
