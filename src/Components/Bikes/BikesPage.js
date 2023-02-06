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
    TextField,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useLoaderData } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
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
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
export default function BikesPage() {
    const data = useLoaderData();

    const cards = (
        <Grid container spacing={2}>
            {data.map((item) => {
                const isAvailableNow = !!item.available;

                return (
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <Box sx={{ minWidth: 240 }}>
                            <Card sx={{ maxWidth: 300 }}>
                                <CardActionArea component={Link} to={`/bikes/${item.id}`}>
                                    <CardMedia component="img" alt="kuva" height="200" image="br.jpg" />
                                    <CardContent>
                                        <Typography variant="h6">{`${item.name} - Koko ${item.size}`}</Typography>
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
                                        color={isAvailableNow ? 'success' : 'primary'}
                                        size="small"
                                        startIcon={<AddShoppingCartOutlinedIcon />}
                                    >
                                        Vuokraa
                                    </Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                );
            })}
        </Grid>
    );

    return (
        <Container sx={{ marginBottom: 4 }}>
            <Typography variant="h3" align="center" color="primary.main">
                Polkupyörienvuokraus
            </Typography>
            <hr />
            <Box sx={{ marginBottom: 1 }}>
                <Box sx={{ marginBottom: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Autocomplete
                        disablePortal
                        id="size-filter"
                        options={['3 (14")', '4 (16")', '5 (21")']}
                        sx={{ width: 250 }}
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        renderInput={(params) => <TextField {...params} label="Koko" />}
                    />
                    <Autocomplete
                        disablePortal
                        id="brand-filter"
                        options={[
                            { label: 'Blabla', id: 1 },
                            { label: 'The Godfather', id: 1972 },
                            { label: 'The Godfather: Part II', id: 1974 },
                        ]}
                        sx={{ width: 250 }}
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        renderInput={(params) => <TextField {...params} label="Merkki" />}
                    />
                    <Autocomplete
                        disablePortal
                        id="type-filter"
                        options={['City', 'BMX', 'Sähkö']}
                        sx={{ width: 250 }}
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        renderInput={(params) => <TextField {...params} label="Tyyppi" />}
                    />
                    <Autocomplete
                        disablePortal
                        id="availability-filter"
                        options={['Heti', 'Tällä viikolla', 'Tiettynä aikana']}
                        sx={{ width: 250 }}
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        renderInput={(params) => <TextField {...params} label="Vapaus" />}
                    />
                </Box>
                <Search sx={{ flexGrow: 1, border: 'solid 1px' }}>
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
