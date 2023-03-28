/* eslint-disable react/jsx-props-no-spreading */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

export default function BikeConfirmation({
    startDate,
    endDate,
    selectedBikes,
    control,
    bikes,
    setIsConfirmationVisible,
    setIsThankYouModalVisible,
}) {
    const [requiredCheckboxes, setRequiredCheckboxes] = useState({ education: false, responsibilities: false });

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
                                name="delivery_address"
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
                                name="contact_name"
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
                                name="contact_phone_number"
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
                    name="extraInfo"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField label="Lisätiedot" onChange={onChange} value={value} onBlur={onBlur} multiline />
                    )}
                />
                <Stack>
                    <Box mb={2}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="opastukset-sisältö">
                                <Typography>Opastukset</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="ehdot-sisältö">
                                <Typography>Käyttöehdot ja vastuut</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(_e, value) =>
                                    setRequiredCheckboxes((prevRequiredCheckboxes) => ({
                                        ...prevRequiredCheckboxes,
                                        education: value,
                                    }))
                                }
                                value={requiredCheckboxes.education}
                            />
                        }
                        label="Olen saanut tarvittavat opastukset"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(_e, value) =>
                                    setRequiredCheckboxes((prevRequiredCheckboxes) => ({
                                        ...prevRequiredCheckboxes,
                                        responsibilities: value,
                                    }))
                                }
                                value={requiredCheckboxes.responsibilities}
                            />
                        }
                        label="Olen lukenut ja ymmärtänyt käyttöehdot ja vastuut"
                    />
                </Stack>
                <Stack flexDirection="row" justifyContent="space-between" mt={2}>
                    <Button color="error" onClick={() => setIsConfirmationVisible(false)}>
                        Takaisin
                    </Button>
                    <Button
                        type="submit"
                        color="success"
                        disabled={Object.values(requiredCheckboxes).some((checkbox) => !checkbox)}
                        onClick={() => setIsThankYouModalVisible(true)}
                    >
                        Lähetä
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
}

BikeConfirmation.propTypes = {
    setIsConfirmationVisible: PropTypes.func.isRequired,
    setIsThankYouModalVisible: PropTypes.func.isRequired,
    bikes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            name: PropTypes.string,
            description: PropTypes.string,
            max_available: PropTypes.number,
            unavailable: PropTypes.objectOf(PropTypes.number),
            package_only_count: PropTypes.number,
            package_only_unavailable: PropTypes.objectOf(PropTypes.number),
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
