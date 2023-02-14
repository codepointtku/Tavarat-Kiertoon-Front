import { Autocomplete, Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';

import BikeCard from './BikeCard';

export default function BikesPage() {
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
    const brandOptionsSet = new Set();
    const typeOptionsSet = new Set();

    loaderData.bikes.forEach((bike) => {
        sizeOptionsSet.add(bike.size);
        brandOptionsSet.add(bike.brand);
        typeOptionsSet.add(bike.type);
    });

    const [selectedBikes, setSelectedBikes] = useState({});

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
        <Container sx={{ mb: 5 }}>
            <Typography variant="h3" align="center" color="primary.main" my={2}>
                Polkupyörienvuokraus
            </Typography>
            <hr />
            <Stack gap={2} flexDirection="row" justifyContent="space-between">
                <Box sx={{ flex: 1 }}>
                    <Typography my={1} variant="h6">
                        Valitse vuokraukseen haluamasi pyörät
                    </Typography>
                    <Box mb={2} mt={1}>
                        <Stack my={1} flexDirection="row" justifyContent="space-between">
                            <Autocomplete
                                disablePortal
                                id="size-filter"
                                options={Array.from(sizeOptionsSet).sort()}
                                sx={{ width: 200 }}
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
                                id="brand-filter"
                                options={Array.from(brandOptionsSet).sort()}
                                sx={{ width: 200 }}
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
                                sx={{ width: 200 }}
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
                    {filteredBikes
                        .sort((a, b) => b.available - a.available)
                        .map((bike) => (
                            <BikeCard
                                key={bike.id}
                                bike={bike}
                                dateInfo={loaderData.date_info}
                                selectedBikes={selectedBikes}
                                setSelectedBikes={setSelectedBikes}
                            />
                        ))}
                </Box>
                <Box sx={{ width: '300px' }}>
                    <Card
                        sx={{
                            flex: 1,
                            p: 1,
                            px: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            width: '100%',
                            position: 'sticky',
                            top: '20px',
                            mt: 1,
                        }}
                    >
                        <Typography align="center" variant="h6">
                            Vuokraustiedot
                        </Typography>
                        <Stack justifyContent="space-between" alignItems="center" flexDirection="row" mt={2}>
                            <Box>
                                <Typography id="modal-modal-description">Aloituspäivä</Typography>
                                <input
                                    type="date"
                                    id="start"
                                    name="trip-start"
                                    min={loaderData.date_info.available_from}
                                    max={loaderData.date_info.available_to}
                                />
                            </Box>
                            <Stack alignItems="end">
                                <Typography id="modal-modal-description">Loppumispäivä</Typography>
                                <input
                                    type="date"
                                    id="start"
                                    name="trip-start"
                                    min={loaderData.date_info.available_from}
                                    max={loaderData.date_info.available_to}
                                />
                            </Stack>
                        </Stack>
                        <Box my={3}>
                            {Object.entries(selectedBikes).map(
                                ([key, value]) =>
                                    !!value && (
                                        <Typography key={key}>
                                            {value}x {loaderData.bikes.find((bike) => bike.id === Number(key)).name}
                                        </Typography>
                                    )
                            )}
                            {!!Object.keys(selectedBikes).length || <Typography>Valitse pyörä</Typography>}
                        </Box>
                        <Typography variant="caption" mb={1}>
                            Jos pidät pyörät sisällä, tuomme ne pakettiautolla. Jos et voi pitää pyöriä sisällä, tuomme
                            ne lukittavassa kärryssä.
                        </Typography>
                        <Autocomplete
                            disablePortal
                            id="storage"
                            options={[
                                { value: 'inside', label: 'Sisällä' },
                                { value: 'outside', label: 'Kärryssä' },
                            ]}
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            renderInput={(params) => <TextField {...params} label="Säilytystapa" />}
                            size="small"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 3, mb: 1 }}>
                            <Button color="success">Seuraava</Button>
                        </Box>
                    </Card>
                </Box>
            </Stack>
        </Container>
    );
}
