import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    InputBase,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';

export const sizeOptions = [
    { label: '(3) 14"', value: 14 },
    { label: '(4) 16"', value: 16 },
    { label: '(5) 21"', value: 21 },
];

export const brandOptions = [
    { label: 'Hieno', value: 'Hieno' },
    { label: 'Huono', value: 'Huono' },
];

export const typeOptions = [
    { label: 'City', value: 'city' },
    { label: 'BMX', value: 'bmx' },
    { label: 'Sähkö', value: 'electric' },
];

export const availabilityOptions = [
    { label: 'Heti', value: 'now' },
    { label: 'Tällä viikolla', value: 'this week' },
    { label: 'Tiettynä aikana', value: 'specific' },
];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    border: '1px solid',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

export default function BikesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const bikes = useLoaderData();
    const filteredBikes =
        typeof searchParams.get('filters') === 'undefined'
            ? bikes
            : bikes.filter((bike) =>
                  Object.entries(JSON.parse(searchParams.get('filters'))).every(
                      ([filterName, filterValue]) => filterValue === bike[filterName]
                  )
              );
    const [isRentModalVisible, setIsRentModalVisible] = useState(false);

    const cards = (
        <Grid container spacing={2}>
            {filteredBikes.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                    <Box sx={{ minWidth: 240 }}>
                        <Card sx={{ maxWidth: 300 }}>
                            <CardActionArea component={Link} to={`/bikes/${item.id}`}>
                                <CardMedia component="img" alt="kuva" height="200" image="br.jpg" />
                                <CardContent>
                                    <Typography variant="h6">{`${item.name} - Koko ${
                                        sizeOptions.find((option) => option.value === item.size).label
                                    }`}</Typography>
                                    <Typography>{`Heti vapaana ${item.available}/${item.totalCount}`}</Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions sx={{ justifyContent: 'space-between' }}>
                                <Button
                                    variant="outlined"
                                    component={Link}
                                    to={`/bikes/${item.id}`}
                                    size="small"
                                    startIcon={<InfoOutlinedIcon />}
                                >
                                    Lisää tietoa
                                </Button>
                                <Button
                                    color={item.available ? 'success' : 'primary'}
                                    size="small"
                                    startIcon={<AddShoppingCartOutlinedIcon />}
                                    onClick={() => setIsRentModalVisible(true)}
                                >
                                    Vuokraa
                                </Button>
                                <Modal
                                    open={isRentModalVisible}
                                    onClose={() => setIsRentModalVisible(false)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: 400,
                                            bgcolor: 'background.paper',
                                            border: '2px solid #000',
                                            boxShadow: 24,
                                            p: 4,
                                        }}
                                    >
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Vuokraa {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Heti vapaana: {item.available}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Yhteensä palvelussa: {item.totalCount}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Tyyppi: {typeOptions.find((option) => option.value === item.type).label}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Koko: {sizeOptions.find((option) => option.value === item.size).label}
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Bla bla bla?
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-evenly',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Box>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    Start date
                                                </Typography>
                                                <input
                                                    type="date"
                                                    id="start"
                                                    name="trip-start"
                                                    min="2023-01-01"
                                                    max="2023-12-31"
                                                />
                                            </Box>
                                            <Box>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    End date
                                                </Typography>
                                                <input
                                                    type="date"
                                                    id="start"
                                                    name="trip-start"
                                                    min="2023-01-01"
                                                    max="2023-12-31"
                                                />
                                            </Box>
                                        </Box>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Määrä
                                        </Typography>
                                        <input type="number" id="amount" name="amount" min="1" max="99" />
                                        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 4 }}>
                                            <Button
                                                color={item.available ? 'success' : 'primary'}
                                                size="small"
                                                startIcon={<AddShoppingCartOutlinedIcon />}
                                                onClick={() => setIsRentModalVisible(false)}
                                            >
                                                Vuokraa
                                            </Button>
                                        </Box>
                                    </Box>
                                </Modal>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );

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
                    [filter]: newOption.value,
                }),
            };
        });

    return (
        <Container sx={{ mb: 4 }}>
            <Typography variant="h3" align="center" color="primary.main">
                Polkupyörienvuokraus
            </Typography>
            <hr />
            <Box sx={{ mb: 1 }}>
                <Box sx={{ mb: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Autocomplete
                        disablePortal
                        id="size-filter"
                        options={sizeOptions}
                        sx={{ width: 250 }}
                        onChange={(_, newOption) => handleFilterChange('size', newOption)}
                        value={
                            searchParams.get('filters') && JSON.parse(searchParams.get('filters')).size
                                ? sizeOptions.find(
                                      (option) => option.value === JSON.parse(searchParams.get('filters')).size
                                  )
                                : null
                        }
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        renderInput={(params) => <TextField {...params} label="Koko" />}
                    />
                    <Autocomplete
                        disablePortal
                        id="brand-filter"
                        options={brandOptions}
                        sx={{ width: 250 }}
                        onChange={(_, newOption) => handleFilterChange('brand', newOption)}
                        value={
                            searchParams.get('filters') && JSON.parse(searchParams.get('filters')).brand
                                ? brandOptions.find(
                                      (option) => option.value === JSON.parse(searchParams.get('filters')).brand
                                  )
                                : null
                        }
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        renderInput={(params) => <TextField {...params} label="Merkki" />}
                    />
                    <Autocomplete
                        disablePortal
                        id="type-filter"
                        options={typeOptions}
                        sx={{ width: 250 }}
                        onChange={(_, newOption) => handleFilterChange('type', newOption)}
                        value={
                            searchParams.get('filters') && JSON.parse(searchParams.get('filters')).type
                                ? typeOptions.find(
                                      (option) => option.value === JSON.parse(searchParams.get('filters')).type
                                  )
                                : null
                        }
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        renderInput={(params) => <TextField {...params} label="Tyyppi" />}
                    />
                    {/* <Autocomplete
                        disablePortal
                        id="availability-filter"
                        options={availabilityOptions}
                        sx={{ width: 250 }}
                        onChange={(_, newOption) => handleFilterChange('availability', newOption)}
                        value={
                            searchParams.get('filters') && JSON.parse(searchParams.get('filters')).availability
                                ? availabilityOptions.find(
                                      (option) => option.value === JSON.parse(searchParams.get('filters')).availability
                                  )
                                : null
                        }
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        renderInput={(params) => <TextField {...params} label="Vapaus" />}
                    /> */}
                </Box>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                </Search>
            </Box>
            {cards}
        </Container>
    );
}
