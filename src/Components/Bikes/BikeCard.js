import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Modal, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

import BikeAvailability from './BikeAvailability';

export default function BikeCard({
    bike,
    dateInfo,
    amountSelected,
    onChange,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
}) {
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

    return (
        <Card sx={{ my: 1, display: 'flex', flexDirection: 'row', height: '200px' }}>
            <CardMedia sx={{ width: '200px', height: '200px' }} component="img" alt="kuva" image="br.jpg" />
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6">{bike.name}</Typography>
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
                        onClick={() => setIsDetailsModalVisible(true)}
                    >
                        Lisää tietoa
                    </Button>
                </Box>
            </CardContent>
            <CardActions
                sx={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', alignItems: 'end' }}
            >
                <Stack justifyContent="space-between" height="100%">
                    {bike.available ? (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: 5 }}>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={amountSelected}
                                onChange={onChange}
                                min={0}
                                max={bike.available}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ flex: 1 }} />
                    )}
                    <BikeAvailability
                        dateInfo={dateInfo}
                        maxAvailable={bike.max_available}
                        taken={bike.taken}
                        selectedStartDate={selectedStartDate}
                        selectedEndDate={selectedEndDate}
                    />
                </Stack>
            </CardActions>
            <Modal
                open={isDetailsModalVisible}
                onClose={() => setIsDetailsModalVisible(false)}
                aria-labelledby="pyörän lisätiedot"
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
                        p: 3,
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
                        Yhteensä palvelussa: {bike.max_available}
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
        max_available: PropTypes.number,
        taken: PropTypes.objectOf(PropTypes.number),
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
    amountSelected: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
};

BikeCard.defaultProps = {
    startDate: null,
    endDate: null,
};
