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
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import type { BikeInterface, SelectedBikesInterface } from '../../Layouts/BikesLayout';
import type { Control } from 'react-hook-form';

interface BikeConfirmationInterface {
    startDate: Date;
    endDate: Date;
    selectedBikes: SelectedBikesInterface;
    control: Control;
    bikes: BikeInterface[];
    setIsConfirmationVisible: Function;
}

export default function BikeConfirmation({
    startDate,
    endDate,
    selectedBikes,
    control,
    bikes,
    setIsConfirmationVisible,
}: BikeConfirmationInterface) {
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
                                            {value}x {bikes.find((bike) => String(bike.id) === String(key))?.name}
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
                        rules={{ required: true, minLength: 7, maxLength: 15 }}
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
                        <TextField
                            label="Lisätiedot (esim. pyyntö poistaa polkimet)"
                            onChange={onChange}
                            value={value}
                            onBlur={onBlur}
                            multiline
                        />
                    )}
                />
                <Stack>
                    <Box mb={2}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="opastukset-sisältö">
                                <Typography>Opastukset</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography component="li">
                                    Ole sovittuna aikana vastassa kuljettajaa, tai sovi, että joku toinen henkilö on
                                    vastassa.
                                </Typography>
                                <Typography component="li">
                                    Mikäli pyörissä ilmenee huoltotarvetta kesken laina-ajan, soita Antti Pikkuvirta p.
                                    xxx xxxxx
                                </Typography>
                                <Typography component="li">
                                    Lasten pyörät ovat käsijarrullisia. Ennen pyörän käyttöönottoa varmista ryhmän
                                    kanssa seuraavat asiat:{' '}
                                    <Typography component="ul">
                                        - Kokeillaan yhdessä jarruja (taluta pyörää ja jarruta). Opetellaan käyttämään
                                        joko molempia käsijarruja yhtä aikaa tai pelkästään takajarrua
                                        (oikeanpuoleinen). Testatkaa yhdessä, kumpi on takajarru ja kokeilkaa taluttaen
                                        näiden jarrujen eroavaisuuksia.
                                    </Typography>
                                    <Typography component="ul">
                                        - “Jaloista vauhti, käsistä jarru”. Käsijarrulliset pyörät helpottavat ja
                                        tekevät pyöräilyn opettelusta turvallisempaa.
                                    </Typography>
                                    <Typography component="ul">
                                        - Varmista, että kaikilla on kypärä turvallisesti päässä: Kypärä peittää otsan,
                                        kypärä ei heilu päässä.
                                    </Typography>{' '}
                                    <Typography component="ul">
                                        - Hämärän aikaan pyöräillessä muista käyttää sekä etu- että takavaloa, jotka
                                        ovat lakisääteiset varusteet pyörässä.
                                    </Typography>
                                    <Typography component="ul">
                                        - Satula on yleensä sopivalla kohdalla, kun se ylettyy suoliluun harjanteeseen
                                        pyörän vieressä seisoessa.
                                    </Typography>
                                </Typography>
                                <Typography component="li">
                                    Jos haluat vinkkejä tai materiaalia pyöräilyyn liittyvien erilaisten taitojen
                                    harjoitteluun, voit olla yhteydessä anna-kaisa.montonen@turku.fi
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="ehdot-sisältö">
                                <Typography>Käyttöehdot ja vastuut</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography component="li">
                                    Vastaanottava koulu/päiväkoti sitoutuu käsittelemään ja säilyttämään pyöriä
                                    normaalia varovaisuutta noudattaen. Myös kypäriä täytyy käsitellä huolella, eli
                                    välttää niiden putoamista kovalle alustalle.
                                </Typography>
                                <Typography component="li">
                                    Lainattuja välineitä ei saa jättää valvomatta tai lukitsematta.
                                </Typography>
                                <Typography component="li">
                                    Mikäli pyörä tai muu varuste varastetaan tai rikkoutuu, tulee tästä ilmoittaa
                                    viipymättä työpisteen työnjohtajalle xxxxxxx
                                </Typography>
                                <Typography component="li">
                                    Muksubussin lainaaja on velvollinen käymään läpi mukana tulevat kuvalliset
                                    käyttöohjeet sekä opastamaan myös muita käyttäjiä tekemään näin.
                                </Typography>
                                <Typography component="li">
                                    Kaikilla välineitä käyttävillä aikuisilla täytyy olla tiedossaan nämä vastuut ja
                                    käyttöehdot.
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
                    >
                        Lähetä
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
}
