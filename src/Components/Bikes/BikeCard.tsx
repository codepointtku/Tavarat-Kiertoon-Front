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
import { useState } from 'react';

import BikeAvailability from './BikeAvailability';
import type { bikeInterface } from '../../Layouts/BikesLayout';

interface dateInfoInterface {
    today: string;
    available_from: string;
    available_to: string;
    monday: string;
}

interface bikeCardInterface {
    bike: bikeInterface;
    dateInfo: dateInfoInterface;
    amountSelected: number;
    onChange: Function;
    startDate?: Date;
    endDate?: Date;
}

export default function BikeCard({
    bike,
    dateInfo,
    amountSelected,
    onChange,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
}: bikeCardInterface) {
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const maxNonPackageAvailable = bike.package_only_count
        ? bike.max_available - bike.package_only_count
        : bike.max_available;

    return (
        <Card sx={{ my: 1, display: 'flex', flexDirection: 'row', height: '220px' }}>
            <CardMedia sx={{ width: '220px', height: '220px' }} component="img" alt="kuva" image="/br.jpg" />
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6">{bike.name}</Typography>
                <Box sx={{ mb: 1 }}>
                    <Typography variant="body2">Tyyppi: {bike.type}</Typography>
                    <Typography variant="body2">Koko: {bike.size}</Typography>
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
                            disabled={amountSelected >= maxNonPackageAvailable}
                            onClick={() => onChange(amountSelected + 1)}
                        >
                            <AddCircleIcon fontSize="inherit" />
                        </IconButton>
                    </Box>
                    <BikeAvailability
                        dateInfo={dateInfo}
                        maxAvailable={maxNonPackageAvailable}
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
                        <Typography sx={{ mt: 1 }} variant="body2">
                            Kuvaus: {bike.description}
                        </Typography>
                        <Typography variant="body2">Tyyppi: {bike.type}</Typography>
                        <Typography variant="body2">Koko: {bike.size}</Typography>
                        <Typography variant="body2">Yhteensä palvelussa: {maxNonPackageAvailable}</Typography>
                    </Stack>
                </Box>
            </Modal>
        </Card>
    );
}
