import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Modal,
    Stack,
    Typography,
} from '@mui/material';
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
        <Card sx={{ my: 1, display: 'flex', flexDirection: 'row', height: '220px' }}>
            <CardMedia sx={{ width: '220px', height: '220px' }} component="img" alt="kuva" image="br.jpg" />
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
                <Stack justifyContent="space-between" height="100%" pt={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: 5, alignItems: 'center' }}>
                        <IconButton
                            aria-label="vähennä yksi"
                            size="small"
                            color="primary"
                            disabled={!amountSelected}
                            onClick={() => onChange(amountSelected - 1)}
                        >
                            <RemoveCircleIcon fontSize="inherit" />
                        </IconButton>
                        <Typography align="center" minWidth={20}>
                            {amountSelected}
                        </Typography>
                        <IconButton
                            aria-label="lisää yksi"
                            size="small"
                            color="primary"
                            disabled={amountSelected >= bike.max_available}
                            onClick={() => onChange(amountSelected + 1)}
                        >
                            <AddCircleIcon fontSize="inherit" />
                        </IconButton>
                    </Box>
                    <BikeAvailability
                        dateInfo={dateInfo}
                        maxAvailable={bike.max_available}
                        unavailable={bike.unavailable}
                        selectedStartDate={selectedStartDate}
                        selectedEndDate={selectedEndDate}
                        amountSelected={amountSelected}
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
                        width: 500,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 4,
                    }}
                >
                    <Stack gap={1}>
                        <Typography variant="h6" component="h2">
                            {bike.name}
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
                    </Stack>
                </Box>
            </Modal>
        </Card>
    );
}

BikeCard.propTypes = {
    bike: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        name: PropTypes.string,
        description: PropTypes.string,
        max_available: PropTypes.number,
        unavailable: PropTypes.objectOf(PropTypes.number),
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
