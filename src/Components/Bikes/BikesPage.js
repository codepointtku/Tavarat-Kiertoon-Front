import { Autocomplete, Box, Button, Card, Container, Modal, Stack, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, isWeekend, max, min, parseISO } from 'date-fns';
import { fi } from 'date-fns/locale';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLoaderData, useSearchParams } from 'react-router-dom';

import BikeCard from './BikeCard';

export default function BikesPage() {
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const loaderData = useLoaderData();
    const filteredBikes = searchParams.get('filters')
        ? loaderData.bikes.filter((bike) =>
              Object.entries(JSON.parse(searchParams.get('filters'))).every(
                  ([filterName, filterValue]) => filterValue === bike[filterName]
              )
          )
        : loaderData.bikes;

    const sizeOptionsSet = new Set();
    const colorOptionsSet = new Set();
    const brandOptionsSet = new Set();
    const typeOptionsSet = new Set();

    loaderData.bikes.forEach((bike) => {
        sizeOptionsSet.add(bike.size);
        colorOptionsSet.add(bike.color);
        brandOptionsSet.add(bike.brand);
        typeOptionsSet.add(bike.type);
    });

    const minDate = parseISO(loaderData.date_info.available_from);
    const maxDate = parseISO(loaderData.date_info.available_to);

    const { control, watch } = useForm({
        defaultValues: {
            startDate: null,
            endDate: null,
            selectedBikes: {},
            contactPersonName: '',
            contactPersonPhoneNumber: '',
            deliveryAddress: '',
            storageType: null,
            rentalInfo: '',
        },
    });

    const handleFilterChange = (filter, newOption) =>
        setSearchParams((prevSearchParams) => {
            if (newOption === null) {
                const newFilters = JSON.parse(prevSearchParams.get('filters'));
                delete newFilters[filter];
                return { filters: JSON.stringify({ ...newFilters }) };
            }
            const newFilters = JSON.parse(prevSearchParams.get('filters')) ?? {};
            return {
                filters: JSON.stringify({
                    ...newFilters,
                    [filter]: newOption,
                }),
            };
        });

    return (
        <Container sx={{ mb: 6 }}>
            <Typography variant="h3" align="center" color="primary.main" my={3}>
                Polkupyörienvuokraus
            </Typography>
            <hr />
            <Stack gap={2} flexDirection="row" justifyContent="space-between">
                <Box sx={{ flex: 1 }}>
                    <Typography my={2} variant="h6">
                        Valitse vuokraukseen haluamasi pyörät
                    </Typography>
                    <Box mb={2} mt={1}>
                        <Stack my={1} flexDirection="row" justifyContent="space-between">
                            <Autocomplete
                                disablePortal
                                id="size-filter"
                                options={Array.from(sizeOptionsSet).sort()}
                                sx={{ width: 170 }}
                                onChange={(_, newOption) => handleFilterChange('size', newOption)}
                                value={
                                    searchParams.get('filters') && JSON.parse(searchParams.get('filters')).size
                                        ? JSON.parse(searchParams.get('filters')).size
                                        : null
                                }
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                renderInput={(params) => <TextField {...params} label="Koko" />}
                                size="small"
                            />
                            <Autocomplete
                                disablePortal
                                id="color-filter"
                                options={Array.from(colorOptionsSet).sort()}
                                sx={{ width: 170 }}
                                onChange={(_, newOption) => handleFilterChange('color', newOption)}
                                value={
                                    searchParams.get('filters') && JSON.parse(searchParams.get('filters')).color
                                        ? JSON.parse(searchParams.get('filters')).color
                                        : null
                                }
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                renderInput={(params) => <TextField {...params} label="Väri" />}
                                size="small"
                            />
                            <Autocomplete
                                disablePortal
                                id="brand-filter"
                                options={Array.from(brandOptionsSet).sort()}
                                sx={{ width: 170 }}
                                onChange={(_, newOption) => handleFilterChange('brand', newOption)}
                                value={
                                    searchParams.get('filters') && JSON.parse(searchParams.get('filters')).brand
                                        ? JSON.parse(searchParams.get('filters')).brand
                                        : null
                                }
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                renderInput={(params) => <TextField {...params} label="Merkki" />}
                                size="small"
                            />
                            <Autocomplete
                                disablePortal
                                id="type-filter"
                                options={Array.from(typeOptionsSet).sort()}
                                sx={{ width: 170 }}
                                onChange={(_, newOption) => handleFilterChange('type', newOption)}
                                value={
                                    searchParams.get('filters') && JSON.parse(searchParams.get('filters')).type
                                        ? JSON.parse(searchParams.get('filters')).type
                                        : null
                                }
                                // eslint-disable-next-line react/jsx-props-no-spreading
                                renderInput={(params) => <TextField {...params} label="Tyyppi" />}
                                size="small"
                            />
                        </Stack>
                    </Box>
                    <Stack gap={1}>
                        {filteredBikes
                            .sort((a, b) => b.max_available - a.max_available)
                            .map((bike) => (
                                <Controller
                                    key={bike.id}
                                    control={control}
                                    name="selectedBikes"
                                    render={({ field: { onChange, value } }) => (
                                        <BikeCard
                                            bike={bike}
                                            dateInfo={loaderData.date_info}
                                            amountSelected={value[bike.id] ?? 0}
                                            onChange={(event) => {
                                                const newValue = event.target.value;
                                                if (Number.isNaN(newValue) || !Number(newValue)) {
                                                    const newSelectedBikes = { ...value };
                                                    delete newSelectedBikes[bike.id];
                                                    onChange(newSelectedBikes);
                                                } else if (newValue >= 0 && newValue <= bike.max_available)
                                                    onChange({
                                                        ...value,
                                                        [bike.id]: Number(newValue),
                                                    });
                                            }}
                                            startDate={watch('startDate')}
                                            endDate={watch('endDate')}
                                        />
                                    )}
                                />
                            ))}
                    </Stack>
                </Box>
                <Box sx={{ width: '300px' }}>
                    <Card
                        sx={{
                            flex: 1,
                            p: 2,
                            pt: 1,
                            display: 'flex',
                            gap: 3,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            width: '100%',
                            position: 'sticky',
                            top: '20px',
                            mt: 2,
                            mb: 1,
                            // backgroundColor: 'primary.main',
                        }}
                    >
                        <Typography align="center" variant="h6">
                            Vuokraustiedot
                        </Typography>
                        <Stack gap={2}>
                            <Typography variant="caption">8-13 välissä toimitus ja nouto, saa valita</Typography>
                            <Controller
                                name="startDate"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
                                        <DateTimePicker
                                            label="Aloituspäivä"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            inputProps={{
                                                placeholder: 'pv.kk.v',
                                            }}
                                            // eslint-disable-next-line react/jsx-props-no-spreading
                                            renderInput={(params) => <TextField {...params} />}
                                            disableMaskedInput
                                            shouldDisableDate={(day) => isWeekend(day)}
                                            minDate={minDate}
                                            maxDate={watch('endDate') ? min([maxDate, watch('endDate')]) : maxDate}
                                            views={['month', 'day', 'hours', 'minutes']}
                                            openTo="month"
                                            minutesStep={5}
                                            minTime={new Date(0, 0, 0, 8)}
                                            maxTime={new Date(0, 0, 0, 13)}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                            <Controller
                                name="endDate"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
                                        <DateTimePicker
                                            label="Loppumispäivä"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            inputProps={{
                                                placeholder: 'pv.kk.v',
                                            }}
                                            // eslint-disable-next-line react/jsx-props-no-spreading
                                            renderInput={(params) => <TextField {...params} />}
                                            disableMaskedInput
                                            shouldDisableDate={(day) => isWeekend(day)}
                                            minDate={watch('startDate') ? max([minDate, watch('startDate')]) : minDate}
                                            maxDate={maxDate}
                                            views={['month', 'day', 'hours', 'minutes']}
                                            openTo="month"
                                            minutesStep={5}
                                            minTime={new Date(0, 0, 0, 8)}
                                            maxTime={new Date(0, 0, 0, 13)}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Stack>
                        <Box>
                            {Object.keys(watch('selectedBikes')).length ? (
                                Object.entries(watch('selectedBikes')).map(
                                    ([key, value]) =>
                                        !!value && (
                                            <Typography key={key}>
                                                {value}x {loaderData.bikes.find((bike) => bike.id === Number(key)).name}
                                            </Typography>
                                        )
                                )
                            ) : (
                                <Typography>Valitse pyörä</Typography>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Button
                                color="success"
                                onClick={() => setIsConfirmationVisible(true)}
                                disabled={
                                    !Object.keys(watch('selectedBikes')).length ||
                                    !watch('startDate') ||
                                    !watch('endDate')
                                }
                            >
                                Vahvistus
                            </Button>
                        </Box>
                    </Card>
                </Box>
                <Modal
                    open={isConfirmationVisible}
                    onClose={() => setIsConfirmationVisible(false)}
                    aria-labelledby="varauksen vahvistus"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 600,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 3,
                        }}
                    >
                        <Stack gap={3}>
                            <Typography variant="h6" align="center">
                                Vuokrausvahvistus
                            </Typography>
                            {!!watch('startDate') && !!watch('endDate') && (
                                <Typography>{`${format(watch('startDate'), 'd.M.yyyy')} - ${format(
                                    watch('endDate'),
                                    'd.M.yyyy'
                                )}`}</Typography>
                            )}
                            <Box>
                                {Object.entries(watch('selectedBikes')).map(
                                    ([key, value]) =>
                                        !!value && (
                                            <Typography key={key}>
                                                {value}x {loaderData.bikes.find((bike) => bike.id === Number(key)).name}
                                            </Typography>
                                        )
                                )}
                            </Box>
                            <Stack gap={1}>
                                <Typography variant="caption">Vastaanottajan yhteystiedot</Typography>
                                <Stack flexDirection="row">
                                    <Controller
                                        name="contactPersonName"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextField
                                                label="Nimi"
                                                onChange={onChange}
                                                value={value}
                                                onBlur={onBlur}
                                                sx={{ width: 250 }}
                                                size="small"
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="contactPersonPhoneNumber"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextField
                                                label="Puhelinnumero"
                                                onChange={onChange}
                                                value={value}
                                                onBlur={onBlur}
                                                sx={{ width: 250 }}
                                                size="small"
                                            />
                                        )}
                                    />
                                </Stack>
                            </Stack>
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
                                        sx={{ width: 250 }}
                                        size="small"
                                    />
                                )}
                            />
                            <Stack gap={1}>
                                <Typography variant="caption">
                                    Jos pidät pyörät sisällä, tuomme ne pakettiautolla. Jos et voi pitää pyöriä sisällä,
                                    tuomme ne lukittavassa kärryssä.
                                </Typography>
                                <Controller
                                    name="storageType"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Autocomplete
                                            disablePortal
                                            id="storage"
                                            options={[
                                                { value: 'inside', label: 'Sisällä' },
                                                { value: 'outside', label: 'Kärryssä' },
                                            ]}
                                            getOptionLabel={(option) => option.label}
                                            isOptionEqualToValue={(option) => option.value === value.value}
                                            // eslint-disable-next-line react/jsx-props-no-spreading
                                            renderInput={(params) => <TextField {...params} label="Säilytystapa" />}
                                            sx={{ width: 250 }}
                                            value={value}
                                            onChange={(_, option) => onChange(option)}
                                            onBlur={onBlur}
                                            size="small"
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack gap={1}>
                                <Typography variant="caption">
                                    Jos sinulla on mitään muuta mitä meidän pitäisi tietää, voit kirjoittaa sen tähän.
                                </Typography>
                                <Controller
                                    name="rentalInfo"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextField
                                            label="Lisätiedot"
                                            onChange={onChange}
                                            value={value}
                                            onBlur={onBlur}
                                            sx={{ width: 250 }}
                                            size="small"
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack flexDirection="row" justifyContent="space-between" mt={1}>
                                <Button color="error" onClick={() => setIsConfirmationVisible(false)}>
                                    Takaisin
                                </Button>
                                <Button color="success">Lähetä</Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Modal>
            </Stack>
        </Container>
    );
}
