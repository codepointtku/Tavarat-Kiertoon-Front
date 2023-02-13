import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Modal,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function BikeCard({ bike, dateInfo, selectedBikes, setSelectedBikes }) {
    const [isRentModalVisible, setIsRentModalVisible] = useState(false);

    console.log(dateInfo);

    return (
        <Card
            sx={
                bike.available
                    ? { my: 1, display: 'flex', flexDirection: 'row', height: '200px' }
                    : { my: 1, display: 'flex', flexDirection: 'row', height: '200px', backgroundColor: 'lightgrey' }
            }
        >
            <CardMedia sx={{ width: '200px', height: '200px' }} component="img" alt="kuva" image="br.jpg" />
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6">{bike.name}</Typography>
                {/* <Typography variant="caption" sx={{ letterSpacing: 0 }}>
                    {bike.description}
                </Typography> */}
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Tyyppi: {bike.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Koko: {bike.size}
                    </Typography>
                </Box>
                <Box>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<InfoOutlinedIcon />}
                        onClick={() => setIsRentModalVisible(true)}
                    >
                        Lisää tietoa
                    </Button>
                </Box>
            </CardContent>
            <CardActions
                sx={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', alignItems: 'end' }}
            >
                {bike.available ? (
                    <Stack justifyContent="space-between" height="100%">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: 1 }}>
                            <Typography id="modal-modal-description" sx={{ mr: 1 }}>
                                Määrä
                            </Typography>
                            {/* <Button size="small" sx={{ p: 0, minWidth: 30 }}>
                                -
                            </Button> */}
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={selectedBikes[bike.id] ?? 0}
                                onChange={(event) => {
                                    const newValue = event.target.value;
                                    if (Number.isNaN(newValue) || !Number(newValue)) {
                                        setSelectedBikes((prevSelectedBikes) => {
                                            const newSelectedBikes = { ...prevSelectedBikes };
                                            delete newSelectedBikes[bike.id];
                                            return newSelectedBikes;
                                        });
                                    } else if (newValue >= 0 && newValue <= bike.available)
                                        setSelectedBikes((prevSelectedBikes) => ({
                                            ...prevSelectedBikes,
                                            [bike.id]: Number(event.target.value),
                                        }));
                                }}
                                min={0}
                                max={bike.available}
                            />
                            {/* <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} /> */}
                            {/* <Button size="small" sx={{ p: 0, minWidth: 30 }} onClick={()=>
                                    if ( < bike.available)
                                        setSelectedBikes((prevSelectedBikes) => ({
                                            ...prevSelectedBikes,
                                            [bike.id]: ,
                                        }));
                            }>
                                +
                            </Button> */}
                        </Box>
                        {/* <Typography
                            color={bike.available ? 'black' : 'error'}
                        >{`Vapaana ${bike.available}/${bike.total_count}`}</Typography> */}
                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ mb: 1 }} align="center">
                                Saatavuus
                            </Typography>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
                                <NavigateBeforeIcon />

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
                                <NavigateNextIcon />
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
                    </Stack>
                ) : (
                    <>
                        <Box sx={{ flex: 1 }} />
                        <Typography
                            color={bike.available ? 'black' : 'error'}
                        >{`Vapaana ${bike.available}/${bike.total_count}`}</Typography>
                        <Box sx={{ flex: 1 }} />
                    </>
                )}
            </CardActions>
            <Modal
                open={isRentModalVisible}
                onClose={() => setIsRentModalVisible(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Lisää vuokraukseen {bike.name}
                    </Typography>
                    <Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">
                        Kuvaus: {bike.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Tyyppi: {bike.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Koko: {bike.size}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Yhteensä palvelussa: {bike.total_count}
                    </Typography>
                </Box>
            </Modal>
        </Card>
    );
}

BikeCard.propTypes = {
    bike: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        available: PropTypes.number,
        total_count: PropTypes.number,
        size: PropTypes.string,
        dateAdded: PropTypes.string,
        barcode: PropTypes.string,
        type: PropTypes.string,
        color: PropTypes.string,
        location: PropTypes.string,
        brand: PropTypes.string,
    }).isRequired,
    dateInfo: PropTypes.shape({
        today: PropTypes.string,
        available_from: PropTypes.string,
        available_to: PropTypes.string,
        monday: PropTypes.string,
    }).isRequired,
    selectedBikes: PropTypes.objectOf(PropTypes.number).isRequired,
    setSelectedBikes: PropTypes.func.isRequired,
};
