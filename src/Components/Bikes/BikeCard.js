import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const sizeOptions = [
    { label: '(3) 14"', value: 14 },
    { label: '(4) 16"', value: 16 },
    { label: '(5) 21"', value: 21 },
];

export const brandOptions = [
    { label: 'Hieno', value: 'Hieno' },
    { label: 'Huono', value: 'Huono' },
];

export const typeOptions = [
    { label: 'City', value: 'city' },
    { label: 'BMX', value: 'bmx' },
    { label: 'Sähkö', value: 'electric' },
];

export const availabilityOptions = [
    { label: 'Heti', value: 'now' },
    { label: 'Tällä viikolla', value: 'this week' },
    { label: 'Tiettynä aikana', value: 'specific' },
];

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
                    Tyyppi: {typeOptions.find((option) => option.value === bike.type).label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Koko: {sizeOptions.find((option) => option.value === bike.size).label}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-evenly', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {!!bike.available && (
                        <>
                            <Typography id="modal-modal-description" align="center" sx={{ mb: 1 }}>
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
                        </>
                    )}
                    <Typography
                        color={bike.available ? 'black' : 'error'}
                    >{`Vapaana ${bike.available}/${bike.totalCount}`}</Typography>
                    <Box sx={{ mt: 1 }}>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<InfoOutlinedIcon />}
                            onClick={() => setIsRentModalVisible(true)}
                        >
                            Lisää tietoa
                        </Button>
                    </Box>
                </Box>
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
                        Yhteensä palvelussa: {bike.totalCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Tyyppi: {typeOptions.find((option) => option.value === bike.type).label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Koko: {sizeOptions.find((option) => option.value === bike.size).label}
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
        totalCount: PropTypes.number,
        size: PropTypes.number,
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
