import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function BikeCard({ bike, selectedBikes, setSelectedBikes }) {
    const [isRentModalVisible, setIsRentModalVisible] = useState(false);

    return (
        <Card
            sx={
                bike.available
                    ? { my: 1, display: 'flex', flexDirection: 'row' }
                    : { my: 1, display: 'flex', flexDirection: 'row', backgroundColor: 'lightgrey' }
            }
        >
            <CardMedia sx={{ width: '200px' }} component="img" alt="kuva" image="br.jpg" />
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{bike.name}</Typography>
                <Typography>{bike.description}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Tyyppi: {bike.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Koko: {bike.size}
                </Typography>
            </CardContent>
            <CardActions
                sx={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', alignItems: 'end' }}
            >
                {bike.available ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                                    if (newValue >= 0 && newValue <= bike.available && !Number.isNaN(newValue))
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
                        <Typography
                            color={bike.available ? 'black' : 'error'}
                        >{`Vapaana ${bike.available}/${bike.total_count}`}</Typography>
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
                    </>
                ) : (
                    <>
                        <Box sx={{ flex: 1 }} />
                        <Typography
                            color={bike.available ? 'black' : 'error'}
                        >{`Vapaana ${bike.available}/${bike.total_count}`}</Typography>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column-reverse' }}>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<InfoOutlinedIcon />}
                                onClick={() => setIsRentModalVisible(true)}
                            >
                                Lisää tietoa
                            </Button>
                        </Box>
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
                    <Typography variant="body2" color="text.secondary">
                        Heti vapaana: {bike.available}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Yhteensä palvelussa: {bike.total_count}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Tyyppi: {bike.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Koko: {bike.size}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Valitset vuokrauksen ajankohdan tilauksessa
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 3 }}>
                        <Button
                            color={bike.available ? 'success' : 'primary'}
                            size="small"
                            onClick={() => setIsRentModalVisible(false)}
                        >
                            Vuokraa
                        </Button>
                    </Box>
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
    selectedBikes: PropTypes.objectOf(PropTypes.number).isRequired,
    setSelectedBikes: PropTypes.func.isRequired,
};
