import { useState } from 'react';
import { useNavigate, useRouteLoaderData, Link } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';

import {
    AppBar,
    Box,
    Button,
    Toolbar,
    InputBase,
    IconButton,
    Stack,
    Badge,
    Drawer as MuiDrawer,
    List,
    Divider,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CallIcon from '@mui/icons-material/Call';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import ItemButton from './ItemButton';
import LoginForm from './LoginForm';
// import ContactForm from './ContactForm';

//

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
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
        [theme.breakpoints.up('sm')]: {
            width: '14ch',
            '&:focus': {
                width: '22ch',
            },
        },
    },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -8,
        border: `0.1rem solid ${theme.palette.background.paper}`,
        backgroundColor: `${theme.palette.primary.light}`,
    },
}));

//

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

const drawerWidth = 490;

function Drawer({ currentOpenDrawer, name, onClose, children }) {
    const handleClose = () => {
        onClose();
    };

    return (
        <MuiDrawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    zIndex: 1050,
                    width: drawerWidth,
                },
            }}
            anchor="right"
            open={currentOpenDrawer === name}
            onClose={handleClose}
            variant="temporary"
            disableScrollLock
            slotProps={{ backdrop: { invisible: true } }}
        >
            <DrawerHeader />
            <Divider />
            {children}
        </MuiDrawer>
    );
}

Drawer.propTypes = {
    currentOpenDrawer: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

function DefaultAppBar() {
    const [currentOpenDrawer, setCurrentOpenDrawer] = useState('');
    const navigate = useNavigate();
    const { cart } = useRouteLoaderData('root');
    console.log(cart);

    // cart?.products?.map((items) => {
    //     cartItems = products.results.filter((result) => items.products.map((productId) => productId === result.id));
    //     return cartItems;
    // });

    const drawerOpen = (drawer) => () => {
        if (currentOpenDrawer === drawer) {
            setCurrentOpenDrawer('');
        } else {
            setCurrentOpenDrawer(drawer);
        }
    };

    function navigateToCart() {
        navigate('/ostoskori');
        setCurrentOpenDrawer(null);
    }

    // console.log(cart);
    // results on taulukko objekteja

    return (
        <Box>
            <AppBar
                sx={{
                    zIndex: 1250,
                    backgroundColor: 'primary.main',
                    width: 'min-content',
                    boxShadow: 0,
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: 'flex-end',
                    }}
                >
                    <Stack direction="row" spacing={4}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon sx={{ fontSize: 30, color: '#fff' }} />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Etsi tuotteita…" inputProps={{ 'aria-label': 'search' }} />
                        </Search>
                        <IconButton onClick={drawerOpen('shoppingCart')}>
                            <StyledBadge
                                badgeContent={cart?.products?.length}
                                sx={{ color: 'primary.contrastText' }}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <ShoppingCartOutlinedIcon sx={{ fontSize: 30, color: '#fff' }} />
                            </StyledBadge>
                        </IconButton>
                        <IconButton onClick={drawerOpen('account')}>
                            <AccountCircleOutlinedIcon sx={{ fontSize: 30, color: '#fff' }} />
                        </IconButton>
                        <IconButton component={Link} to="/otayhteytta">
                            <CallIcon sx={{ fontSize: 30, color: '#fff' }} />
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Drawer currentOpenDrawer={currentOpenDrawer} name="shoppingCart" onClose={drawerOpen('')}>
                {/* tähän oma komponentti.. */}
                <List>
                    {cart.products.length === 0 && (
                        <Typography variant="h6" align="center">
                            Ostoskorisi on tyhjä.
                        </Typography>
                    )}
                    {cart?.products?.map((product) => (
                        <>
                            <ItemButton key={product.id} text={product.name} index={product.id} />
                        </>
                    ))}

                    {/* // products.results.map((result) => {
                        //     if (result.id === item.id) {
                        //         return <ItemButton text={result.name} index={item.id} />;
                        //     }
                        // }) */}
                </List>
                <Divider />
                <List>
                    <ListItem>
                        <Button
                            onClick={() => navigateToCart()}
                            variant="contained"
                            startIcon={<ShoppingCartCheckoutIcon />}
                        >
                            <ListItemText primary="Kassalle" />
                        </Button>
                    </ListItem>
                </List>
            </Drawer>

            <Drawer currentOpenDrawer={currentOpenDrawer} name="account" onClose={drawerOpen('')}>
                <LoginForm />
            </Drawer>

            {/* <Drawer currentOpenDrawer={currentOpenDrawer} name="contact">
                <ContactForm />
            </Drawer> */}
        </Box>
    );
}

export default DefaultAppBar;
