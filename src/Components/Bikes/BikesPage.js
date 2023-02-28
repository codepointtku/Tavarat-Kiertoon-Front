/* eslint-disable react/jsx-props-no-spreading */
import {
    Autocomplete,
    Box,
    Button,
    Card,
    Collapse,
    Container,
    Fade,
    List,
    Slide,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { parseISO } from 'date-fns';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

import BikeCalendar from './BikeCalendar';
import BikeCard from './BikeCard';
import BikeConfirmation from './BikeConfirmation';

export default function BikesPage() {
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const [isIntroVisible, setIsIntroVisible] = useState(true);
    const containerRef = useRef(null);

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
            startTime: 8,
            endDate: null,
            endTime: 13,
            selectedBikes: {},
            contactPersonName: '',
            contactPersonPhoneNumber: '',
            deliveryAddress: '',
            storageType: null,
            extraInfo: '',
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
        <Container sx={{ mb: 6 }} ref={containerRef}>
            <Typography variant="h3" align="center" color="primary.main" my={3}>
                Polkupyörienvuokraus
            </Typography>
            <hr />
            <TransitionGroup>
                {!isConfirmationVisible ? (
                    <Slide direction="right" key="main-page" container={containerRef.current} appear={false}>
                        <Box>
                            <TransitionGroup>
                                {isIntroVisible ? (
                                    <Fade key="main-page-intro">
                                        <Card
                                            sx={{
                                                p: 2,
                                                pt: 1,
                                                display: 'flex',
                                                gap: 3,
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                                top: '20px',
                                                mt: 2,
                                                mb: 1,
                                                // backgroundColor: 'primary.main',
                                            }}
                                        >
                                            <Typography align="center" variant="h6">
                                                Vuokraustiedot
                                            </Typography>
                                            <Stack gap={1}>
                                                <Stack gap={2} flexDirection="row" justifyContent="center">
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
                                            </Stack>
                                            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                                <Button
                                                    color="success"
                                                    onClick={() => setIsIntroVisible(false)}
                                                    disabled={!watch('startDate') || !watch('endDate')}
                                                >
                                                    Seuraava
                                                </Button>
                                            </Box>
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
                                                    <TransitionGroup>
                                                        {filteredBikes
                                                            .sort((a, b) => b.max_available - a.max_available)
                                                            .map((bike) => (
                                                                <Collapse key={bike.id}>
                                                                    <Controller
                                                                        control={control}
                                                                        name="selectedBikes"
                                                                        render={({ field: { onChange, value } }) => (
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
                                                                                        delete newSelectedBikes[
                                                                                            bike.id
                                                                                        ];
                                                                                        onChange(newSelectedBikes);
                                                                                    } else if (
                                                                                        newValue >= 0 &&
                                                                                        newValue <= bike.max_available
                                                                                    )
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
                                                                </Collapse>
                                                            ))}
                                                    </TransitionGroup>
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
                                                                        ([key, value]) =>
                                                                            !!value && (
                                                                                <Collapse key={key}>
                                                                                    <Typography>
                                                                                        {`${value}x ${
                                                                                            loaderData.bikes.find(
                                                                                                (bike) =>
                                                                                                    bike.id ===
                                                                                                    Number(key)
                                                                                            ).name
                                                                                        }`}
                                                                                    </Typography>
                                                                                </Collapse>
                                                                            )
                                                                    )
                                                                ) : (
                                                                    <Collapse>
                                                                        <Typography>Valitse pyörä *</Typography>
                                                                    </Collapse>
                                                                )}
                                                            </TransitionGroup>
                                                        </List>
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
                                bikes={loaderData.bikes}
                                setIsConfirmationVisible={setIsConfirmationVisible}
                            />
                        </Box>
                    </Slide>
                )}
            </TransitionGroup>
        </Container>
    );
}
