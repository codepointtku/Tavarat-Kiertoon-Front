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
    Container,
    Grid,
    IconButton,
    Modal,
    Stack,
    Typography,
} from '@mui/material';
import { useState } from 'react';

import BikeAvailability from './BikeAvailability';
import type { BikeInterface } from '../../Layouts/BikesLayout';

interface DateInfoInterface {
    today: string;
    available_from: string;
    available_to: string;
    monday: string;
}

interface BikeCardInterface {
    bike: BikeInterface;
    dateInfo: DateInfoInterface;
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
}: BikeCardInterface) {
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const maxNonPackageAvailable = bike.package_only_count
        ? bike.max_available - bike.package_only_count
        : bike.max_available;

    const isPackage = bike.type === 'Paketti' ? true : false;

    return (
        <Card sx={{ my: 1, display: 'flex', flexDirection: 'row' }}>
            <div
                style={{
                    width: '220px',
                    height: '220px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: isPackage ? '1px double' : 'none',
                    borderRadius: '2%',
                    borderColor: 'rgba(0, 98, 174, 0.2)',
                    fontWeight: 'bold',
                    color: '#0062ae',
                }}
            >
                {isPackage ? 'Paketti' : ''}
                {isPackage ? (
                    <Grid container>
                        <CardMedia
                            component="img"
                            alt="kuva"
                            image={`${window.location.protocol}//${
                                window.location.hostname
                            }:8000/media/${bike.picture.slice(0, bike.picture.indexOf('&'))}`}
                            height="90px"
                            sx={{ objectFit: 'contain' }}
                        />
                        <CardMedia
                            component="img"
                            alt="kuva"
                            image={`${window.location.protocol}//${
                                window.location.hostname
                            }:8000/media/${bike.picture.slice(bike.picture.indexOf('&')+1)}`}
                            height="90px"
                            sx={{ objectFit: 'contain' }}
                        />
                    </Grid>
                ) : (
                    <CardMedia
                        component="img"
                        alt="kuva"
                        image={`${window.location.protocol}//${window.location.hostname}:8000/media/${bike.picture}`}
                        height="180px"
                        sx={{ objectFit: 'contain' }}
                    />
                )}
                {/* <CardMedia
                    component="img"
                    alt="kuva"
                    image={`${window.location.protocol}//${window.location.hostname}:8000/media/${bike.picture}`}
                    height="180px"
                    sx={{ objectFit: 'contain' }}
                /> */}
            </div>
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
