import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    InputLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

export default function BikeConfirmation({
    startDate,
    endDate,
    selectedBikes,
    control,
    bikes,
    setIsConfirmationVisible,
}) {
    return (
        <Paper
            sx={{
                mt: 3,
                mx: 'auto',
                maxWidth: 700,
                p: 2,
                pt: 1,
            }}
        >
            <Stack gap={3}>
                <Typography variant="h6" align="center">
                    Vuokrausvahvistus
                </Typography>
                <Stack gap={2} flexDirection="row" justifyContent="space-between">
                    <Stack gap={2}>
                        {!!startDate && !!endDate && (
                            <Typography>{`${format(startDate, 'd.M.yyyy')} - ${format(
                                endDate,
                                'd.M.yyyy'
                            )}`}</Typography>
                        )}
                        <Box>
                            {Object.entries(selectedBikes).map(
                                ([key, value]) =>
                                    !!value && (
                                        <Typography key={key}>
                                            {value}x {bikes.find((bike) => String(bike.id) === String(key)).name}
                                        </Typography>
                                    )
                            )}
                        </Box>
                    </Stack>
                    <Stack>
                        <Controller
                            name="startTime"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormControl sx={{ m: 1, minWidth: 120 }} required>
                                    <InputLabel id="deliveryTime-label">Toimitusaika</InputLabel>
                                    <Select
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        label="Toimitusaika"
                                        labelId="deliveryTime-label"
                                        id="deliveryTime"
                                    >
                                        <MenuItem value={8}>08:00</MenuItem>
                                        <MenuItem value={8.5}>08:30</MenuItem>
                                        <MenuItem value={9}>09:00</MenuItem>
                                        <MenuItem value={9.5}>09:30</MenuItem>
                                        <MenuItem value={10}>10:00</MenuItem>
                                        <MenuItem value={10.5}>10:30</MenuItem>
                                        <MenuItem value={11}>11:00</MenuItem>
                                        <MenuItem value={11.5}>11:30</MenuItem>
                                        <MenuItem value={12}>12:00</MenuItem>
                                        <MenuItem value={12.5}>12:30</MenuItem>
                                        <MenuItem value={13}>13:00</MenuItem>
                                    </Select>
                                    <FormHelperText>{format(startDate, 'd.M.yyyy')}</FormHelperText>
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="endTime"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <FormControl sx={{ m: 1, minWidth: 120 }} required>
                                    <InputLabel id="returnTime-label">Noutoaika</InputLabel>
                                    <Select
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        label="Noutoaika"
                                        labelId="returnTime-label"
                                        id="returnTime"
                                    >
                                        <MenuItem value={8}>08:00</MenuItem>
                                        <MenuItem value={8.5}>08:30</MenuItem>
                                        <MenuItem value={9}>09:00</MenuItem>
                                        <MenuItem value={9.5}>09:30</MenuItem>
                                        <MenuItem value={10}>10:00</MenuItem>
                                        <MenuItem value={10.5}>10:30</MenuItem>
                                        <MenuItem value={11}>11:00</MenuItem>
                                        <MenuItem value={11.5}>11:30</MenuItem>
                                        <MenuItem value={12}>12:00</MenuItem>
                                        <MenuItem value={12.5}>12:30</MenuItem>
                                        <MenuItem value={13}>13:00</MenuItem>
                                    </Select>
                                    <FormHelperText>{format(endDate, 'd.M.yyyy')}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Stack>
                </Stack>
                <Stack gap={1}>
                    <Controller
                        name="deliveryAddress"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                label="Toimitusosoite"
                                onChange={onChange}
                                value={value}
                                onBlur={onBlur}
                                required
                            />
                        )}
                    />
                    <Controller
                        name="pickup"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FormGroup>
                                <Box>
                                    <FormControlLabel
                                        control={<Checkbox checked={value} onChange={onChange} onBlur={onBlur} />}
                                        label="Tulen noutamaan itse"
                                    />
                                </Box>
                            </FormGroup>
                        )}
                    />
                </Stack>
                <Stack flexDirection="row" gap={2}>
                    <Controller
                        name="contactPersonName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                label="Vastaanottajan nimi"
                                onChange={onChange}
                                value={value}
                                onBlur={onBlur}
                                sx={{ flex: 1 }}
                                required
                            />
                        )}
                    />
                    <Controller
                        name="contactPersonPhoneNumber"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                label="Vastaanottajan puhelinnumero"
                                onChange={onChange}
                                value={value}
                                onBlur={onBlur}
                                sx={{ flex: 1 }}
                                required
                                placeholder="040 123 4567"
                            />
                        )}
                    />
                </Stack>
                <Controller
                    name="storageType"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormControl required>
                            <FormLabel id="storage-label">Säilytystapa</FormLabel>
                            <Typography variant="caption">
                                Jos pidät pyörät sisällä, tuomme ne pakettiautolla. Jos et voi pitää pyöriä sisällä,
                                tuomme ne lukittavassa kärryssä.
                            </Typography>
                            <RadioGroup
                                row
                                aria-labelledby="storage-label"
                                name="storage"
                                value={value}
                                onChange={(_, option) => onChange(option)}
                                onBlur={onBlur}
                            >
                                <FormControlLabel value="inside" control={<Radio />} label="Sisällä" />
                                <FormControlLabel value="outside" control={<Radio />} label="Kärryssä" />
                            </RadioGroup>
                        </FormControl>
                    )}
                />
                <Controller
                    name="extraInfo"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField label="Lisätiedot" onChange={onChange} value={value} onBlur={onBlur} multiline />
                    )}
                />
                <Stack flexDirection="row" justifyContent="space-between" mt={2}>
                    <Button color="error" onClick={() => setIsConfirmationVisible(false)}>
                        Takaisin
                    </Button>
                    <Button color="success">Lähetä</Button>
                </Stack>
            </Stack>
        </Paper>
    );
}

BikeConfirmation.propTypes = {
    setIsConfirmationVisible: PropTypes.func.isRequired,
    bikes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            name: PropTypes.string,
            description: PropTypes.string,
            max_available: PropTypes.number,
            taken: PropTypes.objectOf(PropTypes.number),
            size: PropTypes.string,
            type: PropTypes.string,
            color: PropTypes.string,
            brand: PropTypes.string,
        })
    ).isRequired,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    selectedBikes: PropTypes.objectOf(PropTypes.number),
    control: PropTypes.shape({
        startDate: PropTypes.instanceOf(Date),
        startTime: PropTypes.number,
        endDate: PropTypes.instanceOf(Date),
        endTime: PropTypes.number,
        selectedBikes: PropTypes.objectOf(PropTypes.number),
        contactPersonName: PropTypes.string,
        contactPersonPhoneNumber: PropTypes.string,
        deliveryAddress: PropTypes.string,
        storageType: PropTypes.string,
        extraInfo: PropTypes.string,
    }),
};

BikeConfirmation.defaultProps = {
    startDate: null,
    endDate: null,
    selectedBikes: {},
    control: PropTypes.shape({
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
        selectedBikes: {},
        contactPersonName: '',
        contactPersonPhoneNumber: '',
        deliveryAddress: '',
        storageType: null,
        extraInfo: '',
    }),
};
