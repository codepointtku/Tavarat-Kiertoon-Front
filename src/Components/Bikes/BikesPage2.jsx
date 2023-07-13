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
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Form, useLoaderData, useSearchParams, useSubmit } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

import BikeCalendar from './BikeCalendar';
import BikeCard from './BikeCard';
import BikeConfirmation from './BikeConfirmation';
import BikeThankYouModal from './BikeThankYouModal';
import isValidBikeAmount, { bikePackageUnavailable } from './isValidBikeAmount';

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
            pickup: false,
            storageType: null,
            extraInfo: '',
        },
    });

    const [isIntroVisible, setIsIntroVisible] = useState(true);
    const containerRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // loaderData contains:
    //  - individual bikes list (bikes that are not in packages)
    //  - package list (packages and bikes that are in them)
    const loaderData = useLoaderData();

    const minDate = parseISO(loaderData.date_info.available_from);
    const maxDate = parseISO(loaderData.date_info.available_to);

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
        // ].sort((a, b) => b.max_available - a.max_available);
    ];

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

    // const sizeOptionsSet = new Set();
    // const colorOptionsSet = new Set();
    // const brandOptionsSet = new Set();
    // const typeOptionsSet = new Set();

    // bikes.forEach((bike) => {
    //     if (bike.size !== null) sizeOptionsSet.add(bike.size);
    //     if (bike.color !== null) colorOptionsSet.add(bike.color);
    //     if (bike.brand !== null) brandOptionsSet.add(bike.brand);
    //     if (bike.type !== null) typeOptionsSet.add(bike.type);
    // });

    // const handleFilterChange = (filter, newOption) =>
    //     setSearchParams((prevSearchParams) => {
    //         if (newOption === null) {
    //             const newFilters = JSON.parse(prevSearchParams.get('filters'));
    //             delete newFilters[filter];
    //             return { filters: JSON.stringify({ ...newFilters }) };
    //         }
    //         const newFilters = JSON.parse(prevSearchParams.get('filters')) ?? {};
    //         return {
    //             filters: JSON.stringify({
    //                 ...newFilters,
    //                 [filter]: newOption,
    //             }),
    //         };
    //     });

    // "Lainaustiedot" side info and confirmation button
    const storageTypeForm = (
        <Controller
            name="storageType"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
                <FormControl required sx={{ maxWidth: 560 }}>
                    <FormLabel id="storage-label">Säilytystapa 2</FormLabel>
                    <Typography variant="caption">
                        Jos pidät pyörät sisällä, tuomme ne pakettiautolla. Jos et voi pitää pyöriä sisällä, tuomme ne
                        lukittavassa kärryssä. Huom. kärryn valitseminen voi rajoittaa saatavuutta.
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
    );

    const submit = useSubmit();
    // const onSubmit = (data) => {

    //     // add hours and minutes to start date
    //     const startDateTime = setMinutes(
    //         setHours(data.startDate, Math.floor(data.startTime)),
    //         (data.startTime - Math.floor(data.startTime)) * 60
    //     ).toISOString();

    //     // add hours and minutes to end date
    //     const endDateTime = setMinutes(
    //         setHours(data.endDate, Math.floor(data.endTime)),
    //         (data.endTime - Math.floor(data.endTime)) * 60
    //     ).toISOString();

    //     const formData = { ...data, startDateTime, endDateTime, selectedBikes: JSON.stringify(data.selectedBikes) };

    //     submit(formData, {
    //         method: 'post',
    //         action: '/pyorat?index',
    //     });

    //     // Show Thank You modal visible
    //     setIsThankYouModalVisible(true);
    // };

    // ************************************************************************************
    // Kokeilu
    // ************************************************************************************

    // states
    const [showIntro, setShowIntro] = useState(true);
    const [showSelection, setShowSelection] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isThankYouModalVisible, setIsThankYouModalVisible] = useState(false);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

    // rent start and end dates
    const minDate2 = parseISO(loaderData.date_info.available_from);
    const maxDate2 = parseISO(loaderData.date_info.available_to);

    // "Lainaustiedot" side info and confirmation button
    const storageTypeForm2 = (
        <Controller
            name="storageType"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
                <FormControl required sx={{ maxWidth: 560 }}>
                    <FormLabel id="storage-label">Säilytystapa 2</FormLabel>
                    <Typography variant="caption">
                        Jos pidät pyörät sisällä, tuomme ne pakettiautolla. Jos et voi pitää pyöriä sisällä, tuomme ne
                        lukittavassa kärryssä. Huom. kärryn valitseminen voi rajoittaa saatavuutta.
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
    );

    // submit
    const onSubmit2 = (data) => {
        console.log('### onSubmit2');
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

    // RENDER
    return (
        <div>
            <Container component={Form} onSubmit={handleSubmit(onSubmit2)} sx={{ mb: 6 }}>
                {/* Heading */}
                <Typography
                    variant="h3"
                    align="center"
                    color="primary.main"
                    my="3rem"
                    pb="3rem"
                    sx={{ borderBottom: '2px solid #0062ae' }}
                >
                    Polkupyörien lainaus 2
                </Typography>

                {/* Intro: ask rent dates and storage option */}
                {showIntro ? (
                    <IntroSection
                        control={control}
                        minDate={minDate2}
                        maxDate={maxDate2}
                        storageTypeForm={storageTypeForm2}
                        startDate={watch('startDate')}
                        endDate={watch('endDate')}
                        storageType={watch('storageType')}
                        setShowIntro={setShowIntro}
                        setShowSelection={setShowSelection}
                        setShowConfirmation={setShowConfirmation}
                    />
                ) : showSelection ? (
                    <Stack gap={2} flexDirection="row" justifyContent="space-between">
                        <SelectionSection
                            control={control}
                            bikes={bikes}
                            filteredBikes={filteredBikes}
                            loaderData={loaderData}
                            startDate={watch('startDate')}
                            endDate={watch('endDate')}
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                            setShowIntro={setShowIntro}
                            setShowSelection={setShowSelection}
                            setShowConfirmation={setShowConfirmation}
                        />
                        <IntroDataSideWindow
                            control={control}
                            minDate={minDate2}
                            maxDate={maxDate2}
                            startDate={watch('startDate')}
                            endDate={watch('endDate')}
                            selectedBikes={watch('selectedBikes')}
                            storageType={watch('storageType')}
                            bikes={bikes}
                            storageTypeForm={storageTypeForm}
                            setShowIntro={setShowIntro}
                            setShowSelection={setShowSelection}
                            setShowConfirmation={setShowConfirmation}
                        />
                    </Stack>
                ) : showConfirmation ? (
                    <BikeConfirmation
                        startDate={watch('startDate')}
                        endDate={watch('endDate')}
                        selectedBikes={watch('selectedBikes')}
                        control={control}
                        bikes={bikes}
                        setShowIntro={setShowIntro}
                        setShowSelection={setShowSelection}
                        setShowConfirmation={setShowConfirmation}
                        setIsConfirmationVisible={setIsConfirmationVisible}
                    />
                ) : (
                    <h1>Virhe pyörälainauksessa</h1>
                )}
                <BikeThankYouModal
                    isThankYouModalVisible={isThankYouModalVisible}
                    setIsThankYouModalVisible={setIsThankYouModalVisible}
                    setShowIntro={setShowIntro}
                    setShowSelection={setShowSelection}
                    setShowConfirmation={setShowConfirmation}
                    setIsConfirmationVisible={setIsConfirmationVisible}
                    reset={reset}
                    getValues={getValues}
                    bikes={bikes}
                />
            </Container>
            <hr />
            <hr />

            {/* ********************************************************************************************************************************* */}

            {/* <Container component={Form} onSubmit={handleSubmit(onSubmit)} sx={{ mb: 6 }} ref={containerRef}> */}
            <div>Tässä oli Heading</div>
            <TransitionGroup>
                {!isConfirmationVisible ? (
                    <Slide direction="right" key="main-page" container={containerRef.current} appear={false}>
                        <Box>
                            <TransitionGroup>
                                {isIntroVisible ? (
                                    /*
                                     * ************************************************************************
                                     * ************************************************************************
                                     *
                                     * START - Intro
                                     *
                                     */
                                    <Fade key="main-page-intro" appear={false}>
                                        <div>Tässä oli intro</div>
                                    </Fade>
                                ) : (
                                    /*
                                     *
                                     * END - Intro
                                     *
                                     * ************************************************************************
                                     * ************************************************************************
                                     */
                                    <Fade key="main-page-main">
                                        <Stack gap={2} flexDirection="row" justifyContent="space-between">
                                            <Box mb={2} mt={1}>
                                                {/*
                                                 * ************************************************************************
                                                 * ************************************************************************
                                                 *
                                                 * START - Sorting by size, color, brand or type
                                                 *
                                                 */}
                                                <div>Tässä oli Filter bar</div>
                                                {/*
                                                 *
                                                 * END - Sorting by size, color, brand or type
                                                 *
                                                 * ************************************************************************
                                                 * ************************************************************************
                                                 */}
                                            </Box>
                                            {/*
                                             * ************************************************************************
                                             * ************************************************************************
                                             *
                                             *  START - Bikes / Packages area
                                             *
                                             */}
                                            <div>Tässä oli Bikes / Packages area</div>
                                            {/*
                                             *
                                             *  END - Bikes / Packages area
                                             *
                                             * ************************************************************************
                                             * ************************************************************************
                                             */}
                                            {/*
                                             * ************************************************************************
                                             * ************************************************************************
                                             *
                                             * START - Oikea laita: Lainaustiedot
                                             *
                                             */}
                                            <div>Tässä oli oikean laidan flouttaava ikkuna</div>
                                            {/*
                                             *
                                             * END - Oikea laita: Lainaustiedot
                                             *
                                             * ************************************************************************
                                             * ************************************************************************
                                             */}
                                        </Stack>
                                    </Fade>
                                )}
                            </TransitionGroup>
                        </Box>
                    </Slide>
                ) : (
                    <Slide direction="left" key="BikeConfirmation" container={containerRef.current} appear={false}>
                        {/* <Box> */}
                        {/* <BikeConfirmation
                            startDate={watch('startDate')}
                            endDate={watch('endDate')}
                            selectedBikes={watch('selectedBikes')}
                            control={control}
                            bikes={bikes}
                            setIsConfirmationVisible={setIsConfirmationVisible}
                        /> */}
                        {/* </Box> */}
                    </Slide>
                )}
            </TransitionGroup>
            {/* <BikeThankYouModal
                isThankYouModalVisible={isThankYouModalVisible}
                setIsThankYouModalVisible={setIsThankYouModalVisible}
                setIsConfirmationVisible={setIsConfirmationVisible}
                setIsIntroVisible={setIsIntroVisible}
                reset={reset}
                getValues={getValues}
                bikes={bikes}
            /> */}
            {/* </Container> */}
        </div>
    );
}

/**
 * Intro section
 * First part of rental process: select start and end dates and storage method (trailer or own storage)
 *
 * @param {*} param0
 * @returns
 */
function IntroSection({
    control,
    minDate,
    maxDate,
    storageTypeForm,
    startDate,
    endDate,
    storageType,
    setShowIntro,
    setShowSelection,
    setShowConfirmation,
}) {
    return (
        <Card
            sx={{
                p: 2,
                pt: 1,
                width: '100%',
                top: '20px',
                mt: 2,
                mb: 1,
            }}
        >
            <Stack gap={3} justifyContent="space-between">
                <Typography align="center" variant="h6">
                    Laina-aika 2
                </Typography>
                <Stack gap={1} alignItems="center">
                    <Stack gap={2} flexDirection="row" justifyContent="center" alignItems="center">
                        <Controller
                            name="startDate"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <BikeCalendar
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    startDate={value}
                                    endDate={endDate}
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
                                    startDate={startDate}
                                    endDate={value}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    isStartDate={false}
                                />
                            )}
                        />
                    </Stack>
                    <Typography align="center">Enintään 2 viikkoa</Typography>
                    {storageTypeForm}
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                        color="success"
                        onClick={() => {
                            setShowIntro(false);
                            setShowSelection(true);
                            setShowConfirmation(false);
                        }}
                        disabled={!startDate || !endDate || !storageType}
                    >
                        Seuraava
                    </Button>
                </Box>
            </Stack>
        </Card>
    );
}

/**
 * Selection section
 * Second part of rental process: select packets and bikes you want to rent
 *
 * @param {*} param0
 * @returns
 */
function SelectionSection({
    control,
    bikes,
    filteredBikes,
    loaderData,
    startDate,
    endDate,
    searchParams,
    setSearchParams,
    setShowIntro,
    setShowSelection,
    setShowConfirmation,
}) {
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

    return (
        <Box>
            {/* Section ehading */}
            <Typography my={2} variant="h6" color="primary.main">
                Valitse haluamasi pyöräpaketit ja mahdolliset yksittäiset pyörät 2
            </Typography>

            {/* Filter visible bikes */}
            <FilterDataBar
                sizeOptionsSet={sizeOptionsSet}
                colorOptionsSet={colorOptionsSet}
                brandOptionsSet={brandOptionsSet}
                typeOptionsSet={typeOptionsSet}
                handleFilterChange={handleFilterChange}
                searchParams={searchParams}
            />

            {/* Bikes and packages */}
            <Box>
                <Controller
                    control={control}
                    name="selectedBikes"
                    render={({ field: { onChange, value } }) => (
                        <>
                            {filteredBikes.map((bike) => (
                                <BikeCard
                                    key={bike.id}
                                    bike={bike}
                                    dateInfo={loaderData.date_info}
                                    amountSelected={value[bike.id] ?? 0}
                                    onChange={(newValue) => {
                                        if (Number.isNaN(newValue) || !Number(newValue)) {
                                            const newSelectedBikes = {
                                                ...value,
                                            };
                                            delete newSelectedBikes[bike.id];
                                            onChange(newSelectedBikes);
                                        } else if (
                                            newValue >= 0 && newValue <= bike.package_only_count
                                                ? bike.max_available - bike.package_only_count
                                                : bike.max_available
                                        )
                                            onChange({
                                                ...value,
                                                [bike.id]: Number(newValue),
                                            });
                                    }}
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            ))}
                        </>
                    )}
                />
            </Box>

            <button
                onClick={() => {
                    setShowIntro(false);
                    setShowSelection(false);
                    setShowConfirmation(true);
                }}
            >
                TEST: go to ConfirmationSection
            </button>
        </Box>
    );
}

/**
 * Confirmation section
 * Third (and final) part of rental process: add delivery info and confirm rental
 *
 * @param {*} param0
 * @returns
 */
function ConfirmationSection({ setShowIntro, setShowSelection, setShowConfirmation }) {
    return (
        <>
            <h1>ConfirmationSection</h1>
            <button
                onClick={() => {
                    setShowIntro(true);
                    setShowSelection(false);
                    setShowConfirmation(false);
                }}
            >
                TEST: go to IntroSection
            </button>
        </>
    );
}

/**
 * Intro Data side window
 * Floating window on the right side of the window that allows to modify the rental dates and storage option
 *
 * @param {*} param0
 * @returns
 */
function IntroDataSideWindow({
    control,
    minDate,
    maxDate,
    startDate, // watch('startDate')
    endDate, // watch('endDate')
    selectedBikes, // watch('selectedBikes')
    storageType, // watch('storageType'
    bikes,
    storageTypeForm,
    setShowIntro,
    setShowSelection,
    setShowConfirmation,
}) {
    return (
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
                        Lainaustiedot 2
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
                                    endDate={endDate}
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
                                    startDate={startDate}
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
                                {Object.keys(selectedBikes).length ? (
                                    Object.entries(selectedBikes).map(([key, value]) => {
                                        const bike = bikes.find((_bike) => String(_bike.id) === String(key));
                                        return (
                                            !!value && (
                                                <Collapse key={key}>
                                                    <Typography
                                                        sx={
                                                            isValidBikeAmount(
                                                                startDate,
                                                                endDate,
                                                                selectedBikes,
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
                                    })
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
                            onClick={() => {
                                setShowIntro(false);
                                setShowSelection(false);
                                setShowConfirmation(true);
                            }}
                            disabled={
                                !isValidBikeAmount(startDate, endDate, selectedBikes, bikes) ||
                                !Object.keys(selectedBikes).length ||
                                !startDate ||
                                !endDate ||
                                !storageType
                            }
                        >
                            Vahvistus
                        </Button>
                    </Box>
                </Stack>
            </Card>
        </Box>
    );
}

function FilterDataBar({
    sizeOptionsSet,
    colorOptionsSet,
    brandOptionsSet,
    typeOptionsSet,
    handleFilterChange,
    searchParams,
}) {
    return (
        <Stack my={1} flexDirection="row" justifyContent="space-between" mb="2rem">
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
                renderInput={(params) => <TextField {...params} label="Tyyppi" />}
                size="small"
            />
        </Stack>
    );
}
