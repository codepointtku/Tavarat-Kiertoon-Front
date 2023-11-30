/* eslint-disable react/jsx-props-no-spreading */
import {
    Autocomplete,
    Box,
    Button,
    Card,
    Collapse,
    Container,
    Fade,
    FormControl,
    FormControlLabel,
    FormLabel,
    List,
    Radio,
    RadioGroup,
    Slide,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { parseISO, setHours, setMinutes } from 'date-fns';
import { useRef, useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Form, useLoaderData, useSearchParams, useSubmit } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

import BikeCalendar from './BikeCalendar';
import BikeCard from './BikeCard';
import BikeConfirmation from './BikeConfirmation';
import BikeThankYouModal from './BikeThankYouModal';
import isValidBikeAmount, { bikePackageUnavailable } from './isValidBikeAmount';

function trailerDates(startDate, endDate, trailer) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
        const year = date.getFullYear();
        const day = date.getDate();
        const month = date.getMonth() + 1; // add 1 since getMonth() returns 0-indexed months
        dates.push(date.toLocaleDateString('FI-fi'));
        date.setDate(date.getDate() + 1);
    }
    let availableTrailers = 0;
    let stickyZeroAvailable = 0;
    if (dates[0] == '1.1.1970') {
        availableTrailers = 0;
    } else if (trailer.max_available >= 1 && Object.keys(trailer.unavailable).length === 0) {
        availableTrailers = trailer.id;
    } else {
        dates.forEach((iterableDate) => {
            if (iterableDate in trailer.unavailable) {
                if (trailer.unavailable[iterableDate] < trailer.max_available) {
                    availableTrailers = trailer.id;
                } else {
                    availableTrailers = 0;
                    stickyZeroAvailable = 1;
                }
            } else {
                availableTrailers = trailer.id;
            }
        });
    }
    if (stickyZeroAvailable == 1) {
        availableTrailers = 0;
    }
    return availableTrailers;
}

export default function BikesPage() {
    const { control, watch, handleSubmit, reset, getValues } = useForm({
        defaultValues: {
            startDate: null,
            startTime: 8,
            endDate: null,
            endTime: 13,
            selectedBikes: {},
            contactPersonName: '',
            contactPersonPhoneNumber: '',
            deliveryAddress: '',
            storageType: 0,
            extraInfo: '',
        },
    });

    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const [isIntroVisible, setIsIntroVisible] = useState(true);
    const [isThankYouModalVisible, setIsThankYouModalVisible] = useState(false);
    const [trailerValue, setTrailerValue] = useState(0);
    const containerRef = useRef(null);

    const loaderData = useLoaderData();
    const minDate = parseISO(loaderData.date_info.available_from);
    const maxDate = parseISO(loaderData.date_info.available_to);
    const trailers = [...loaderData.trailers];
    const trailerAvailability = trailerDates(getValues('startDate'), getValues('endDate'), trailers[0]);
    useEffect(() => {
        if (trailerAvailability === 0) {
            setTrailerValue(0);
        }
    }, [trailerAvailability]);
 
    const bikes = [
        // The bike package id and bike id would have possibility for overlap since they're both just incrementing from 0
        ...loaderData.packages.map((bikePackage) => ({
            ...bikePackage,
            id: `package-${bikePackage.id}`,
            unavailable: bikePackageUnavailable(
                bikePackage,
                minDate,
                maxDate,
                loaderData.bikes,
                watch('selectedBikes'),
                watch('startDate'),
                watch('endDate')
            ),
        })),
        ...loaderData.bikes,
    ];
    // ].sort((a, b) => b.max_available - a.max_available);
    const [searchParams, setSearchParams] = useSearchParams();
    const filteredBikes = searchParams.get('filters')
        ? bikes.filter((bike) =>
              Object.entries(JSON.parse(searchParams.get('filters'))).every(
                  ([filterName, filterValue]) => filterValue === bike[filterName]
              ) && bike.package_only_count
                  ? bike.max_available > bike.package_only_count
                  : bike.max_available
          )
        : bikes.filter((bike) =>
              bike.package_only_count ? bike.max_available > bike.package_only_count : bike.max_available
          );

    const sizeOptionsSet = new Set();
    const colorOptionsSet = new Set();
    const brandOptionsSet = new Set();
    const typeOptionsSet = new Set();

    bikes.forEach((bike) => {
        if (bike.size !== null) sizeOptionsSet.add(bike.size);
        if (bike.color !== null) colorOptionsSet.add(bike.color);
        if (bike.brand !== null) brandOptionsSet.add(bike.brand);
        if (bike.type !== null) typeOptionsSet.add(bike.type);
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

    const storageTypeForm = (
        <Controller
            name="storageType"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
                <FormControl required sx={{ maxWidth: 560 }}>
                    <FormLabel id="storage-label">Säilytystapa</FormLabel>
                    <Typography variant="caption">
                        Jos pidät pyörät sisällä, tuomme ne pakettiautolla. Jos et voi pitää pyöriä sisällä, tuomme ne
                        lukittavassa kärryssä. Huom. kärryn valitseminen voi rajoittaa saatavuutta.
                    </Typography>
                    <RadioGroup
                        row
                        aria-labelledby="storage-label"
                        name="storage"
                        onChange={(_, option) => onChange(option) && setTrailerValue(_.target.value)}
                        value={trailerValue}
                        onBlur={onBlur}
                    >
                        <FormControlLabel value={0} control={<Radio />} label="Sisällä" />
                        <FormControlLabel
                            value={trailers[0].id}
                            control={<Radio />}
                            label="Kärryssä"
                            disabled={trailerAvailability === 0}
                        />
                    </RadioGroup>
                </FormControl>
            )}
        />
    );

    const submit = useSubmit();

    const onSubmit = (data) => {
        // add hours and minutes to start date
        const startDateTime = setMinutes(
            setHours(data.startDate, Math.floor(data.startTime)),
            (data.startTime - Math.floor(data.startTime)) * 60
        ).toISOString();

        // add hours and minutes to end date
        const endDateTime = setMinutes(
            setHours(data.endDate, Math.floor(data.endTime)),
            (data.endTime - Math.floor(data.endTime)) * 60
        ).toISOString();

        const formData = { ...data, startDateTime, endDateTime, selectedBikes: JSON.stringify(data.selectedBikes) };

        submit(formData, {
            method: 'post',
            action: '/pyorat?index',
        });

        // Show Thank You modal visible
        setIsThankYouModalVisible(true);
    };

    return (
        <Container component={Form} onSubmit={handleSubmit(onSubmit)} sx={{ mb: 6 }} ref={containerRef}>
            <Typography variant="h3" align="center" color="primary.main" my={3}>
                Polkupyörien vuokraus
            </Typography>
            <hr />
            <TransitionGroup>
                {!isConfirmationVisible ? (
                    <Slide direction="right" key="main-page" container={containerRef.current} appear={false}>
                        <Box>
                            <TransitionGroup>
                                {isIntroVisible ? (
                                    <Fade key="main-page-intro" appear={false}>
                                        <Card
                                            sx={{
                                                p: 2,
                                                pt: 1,
                                                width: '100%',
                                                top: '20px',
                                                mt: 2,
                                                mb: 1,
                                                // backgroundColor: 'primary.main',
                                            }}
                                        >
                                            <Stack gap={3} justifyContent="space-between">
                                                <Typography align="center" variant="h6">
                                                    Vuokraustiedot
                                                </Typography>
                                                <Stack gap={1} alignItems="center">
                                                    <Stack
                                                        gap={2}
                                                        flexDirection="row"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                    >
                                                        <Controller
                                                            name="startDate"
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field: { onChange, onBlur, value } }) => (
                                                                <BikeCalendar
                                                                    onChange={onChange}
                                                                    onBlur={onBlur}
                                                                    startDate={value}
                                                                    endDate={watch('endDate')}
                                                                    minDate={minDate}
                                                                    maxDate={maxDate}
                                                                />
                                                            )}
                                                        />
                                                        <Controller
                                                            name="endDate"
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field: { onChange, onBlur, value } }) => (
                                                                <BikeCalendar
                                                                    onChange={onChange}
                                                                    onBlur={onBlur}
                                                                    startDate={watch('startDate')}
                                                                    endDate={value}
                                                                    minDate={minDate}
                                                                    maxDate={maxDate}
                                                                    isStartDate={false}
                                                                />
                                                            )}
                                                        />
                                                    </Stack>
                                                    <Typography align="center">Max 2vk</Typography>
                                                    {storageTypeForm}
                                                </Stack>
                                                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                                    <Button
                                                        color="success"
                                                        onClick={() => setIsIntroVisible(false)}
                                                        disabled={
                                                            !watch('startDate') ||
                                                            !watch('endDate') ||
                                                            !watch('storageType')
                                                        }
                                                    >
                                                        Seuraava
                                                    </Button>
                                                </Box>
                                            </Stack>
                                        </Card>
                                    </Fade>
                                ) : (
                                    <Fade key="main-page-main">
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
                                                            onChange={(_, newOption) =>
                                                                handleFilterChange('size', newOption)
                                                            }
                                                            value={
                                                                searchParams.get('filters') &&
                                                                JSON.parse(searchParams.get('filters')).size
                                                                    ? JSON.parse(searchParams.get('filters')).size
                                                                    : null
                                                            }
                                                            renderInput={(params) => (
                                                                <TextField {...params} label="Koko" />
                                                            )}
                                                            size="small"
                                                        />
                                                        <Autocomplete
                                                            disablePortal
                                                            id="color-filter"
                                                            options={Array.from(colorOptionsSet).sort()}
                                                            sx={{ width: 170 }}
                                                            onChange={(_, newOption) =>
                                                                handleFilterChange('color', newOption)
                                                            }
                                                            value={
                                                                searchParams.get('filters') &&
                                                                JSON.parse(searchParams.get('filters')).color
                                                                    ? JSON.parse(searchParams.get('filters')).color
                                                                    : null
                                                            }
                                                            renderInput={(params) => (
                                                                <TextField {...params} label="Väri" />
                                                            )}
                                                            size="small"
                                                        />
                                                        <Autocomplete
                                                            disablePortal
                                                            id="brand-filter"
                                                            options={Array.from(brandOptionsSet).sort()}
                                                            sx={{ width: 170 }}
                                                            onChange={(_, newOption) =>
                                                                handleFilterChange('brand', newOption)
                                                            }
                                                            value={
                                                                searchParams.get('filters') &&
                                                                JSON.parse(searchParams.get('filters')).brand
                                                                    ? JSON.parse(searchParams.get('filters')).brand
                                                                    : null
                                                            }
                                                            renderInput={(params) => (
                                                                <TextField {...params} label="Merkki" />
                                                            )}
                                                            size="small"
                                                        />
                                                        <Autocomplete
                                                            disablePortal
                                                            id="type-filter"
                                                            options={Array.from(typeOptionsSet).sort()}
                                                            sx={{ width: 170 }}
                                                            onChange={(_, newOption) =>
                                                                handleFilterChange('type', newOption)
                                                            }
                                                            value={
                                                                searchParams.get('filters') &&
                                                                JSON.parse(searchParams.get('filters')).type
                                                                    ? JSON.parse(searchParams.get('filters')).type
                                                                    : null
                                                            }
                                                            renderInput={(params) => (
                                                                <TextField {...params} label="Tyyppi" />
                                                            )}
                                                            size="small"
                                                        />
                                                    </Stack>
                                                </Box>
                                                <Stack gap={1}>
                                                    <Controller
                                                        control={control}
                                                        name="selectedBikes"
                                                        render={({ field: { onChange, value } }) => (
                                                            <TransitionGroup>
                                                                {filteredBikes.map((bike) => (
                                                                    <Collapse key={bike.id}>
                                                                        <BikeCard
                                                                            bike={bike}
                                                                            dateInfo={loaderData.date_info}
                                                                            amountSelected={value[bike.id] ?? 0}
                                                                            onChange={(newValue) => {
                                                                                if (
                                                                                    Number.isNaN(newValue) ||
                                                                                    !Number(newValue)
                                                                                ) {
                                                                                    const newSelectedBikes = {
                                                                                        ...value,
                                                                                    };
                                                                                    delete newSelectedBikes[bike.id];
                                                                                    onChange(newSelectedBikes);
                                                                                } else if (
                                                                                    newValue >= 0 &&
                                                                                    newValue <= bike.package_only_count
                                                                                        ? bike.max_available -
                                                                                          bike.package_only_count
                                                                                        : bike.max_available
                                                                                )
                                                                                    onChange({
                                                                                        ...value,
                                                                                        [bike.id]: Number(newValue),
                                                                                    });
                                                                            }}
                                                                            startDate={watch('startDate')}
                                                                            endDate={watch('endDate')}
                                                                        />
                                                                    </Collapse>
                                                                ))}
                                                            </TransitionGroup>
                                                        )}
                                                    />
                                                </Stack>
                                            </Box>
                                            <Box sx={{ width: '300px' }}>
                                                <Card
                                                    sx={{
                                                        flex: 1,
                                                        p: 2,
                                                        pt: 1,
                                                        width: '100%',
                                                        position: 'sticky',
                                                        top: '20px',
                                                        mt: 2,
                                                        mb: 1,
                                                        // backgroundColor: 'primary.main',
                                                    }}
                                                >
                                                    <Stack gap={3} justifyContent="space-between">
                                                        <Typography align="center" variant="h6">
                                                            Vuokraustiedot
                                                        </Typography>
                                                        <Stack gap={2}>
                                                            <Controller
                                                                name="startDate"
                                                                control={control}
                                                                rules={{ required: true }}
                                                                render={({ field: { onChange, onBlur, value } }) => (
                                                                    <BikeCalendar
                                                                        onChange={onChange}
                                                                        onBlur={onBlur}
                                                                        startDate={value}
                                                                        endDate={watch('endDate')}
                                                                        minDate={minDate}
                                                                        maxDate={maxDate}
                                                                    />
                                                                )}
                                                            />
                                                            <Controller
                                                                name="endDate"
                                                                control={control}
                                                                rules={{ required: true }}
                                                                render={({ field: { onChange, onBlur, value } }) => (
                                                                    <BikeCalendar
                                                                        onChange={onChange}
                                                                        onBlur={onBlur}
                                                                        startDate={watch('startDate')}
                                                                        endDate={value}
                                                                        minDate={minDate}
                                                                        maxDate={maxDate}
                                                                        isStartDate={false}
                                                                    />
                                                                )}
                                                            />
                                                        </Stack>
                                                        <Box minHeight={44}>
                                                            <List>
                                                                <TransitionGroup>
                                                                    {Object.keys(watch('selectedBikes')).length ? (
                                                                        Object.entries(watch('selectedBikes')).map(
                                                                            ([key, value]) => {
                                                                                const bike = bikes.find(
                                                                                    (_bike) =>
                                                                                        String(_bike.id) === String(key)
                                                                                );
                                                                                return (
                                                                                    !!value && (
                                                                                        <Collapse key={key}>
                                                                                            <Typography
                                                                                                sx={
                                                                                                    isValidBikeAmount(
                                                                                                        watch(
                                                                                                            'startDate'
                                                                                                        ),
                                                                                                        watch(
                                                                                                            'endDate'
                                                                                                        ),
                                                                                                        watch(
                                                                                                            'selectedBikes'
                                                                                                        ),
                                                                                                        bikes,
                                                                                                        [bike]
                                                                                                    )
                                                                                                        ? {}
                                                                                                        : {
                                                                                                              color: 'red',
                                                                                                          }
                                                                                                }
                                                                                            >
                                                                                                {`${value}x ${bike.name}`}
                                                                                            </Typography>
                                                                                        </Collapse>
                                                                                    )
                                                                                );
                                                                            }
                                                                        )
                                                                    ) : (
                                                                        <Collapse>
                                                                            <Typography>Valitse pyörä *</Typography>
                                                                        </Collapse>
                                                                    )}
                                                                </TransitionGroup>
                                                            </List>
                                                        </Box>
                                                        {storageTypeForm}
                                                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                                            <Button
                                                                color="success"
                                                                onClick={() => setIsConfirmationVisible(true)}
                                                                disabled={
                                                                    !isValidBikeAmount(
                                                                        watch('startDate'),
                                                                        watch('endDate'),
                                                                        watch('selectedBikes'),
                                                                        bikes
                                                                    ) ||
                                                                    !Object.keys(watch('selectedBikes')).length ||
                                                                    !watch('startDate') ||
                                                                    !watch('endDate') ||
                                                                    !watch('storageType')
                                                                }
                                                            >
                                                                Vahvistus
                                                            </Button>
                                                        </Box>
                                                    </Stack>
                                                </Card>
                                            </Box>
                                        </Stack>
                                    </Fade>
                                )}
                            </TransitionGroup>
                        </Box>
                    </Slide>
                ) : (
                    <Slide direction="left" key="BikeConfirmation" container={containerRef.current} appear={false}>
                        <Box>
                            <BikeConfirmation
                                startDate={watch('startDate')}
                                endDate={watch('endDate')}
                                selectedBikes={watch('selectedBikes')}
                                control={control}
                                bikes={bikes}
                                setIsConfirmationVisible={setIsConfirmationVisible}
                            />
                        </Box>
                    </Slide>
                )}
            </TransitionGroup>
            <BikeThankYouModal
                isThankYouModalVisible={isThankYouModalVisible}
                setIsThankYouModalVisible={setIsThankYouModalVisible}
                setIsConfirmationVisible={setIsConfirmationVisible}
                setIsIntroVisible={setIsIntroVisible}
                reset={reset}
                getValues={getValues}
                bikes={bikes}
            />
        </Container>
    );
}
