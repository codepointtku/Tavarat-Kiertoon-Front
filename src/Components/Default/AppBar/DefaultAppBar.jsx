import { useState, useContext, useEffect } from 'react';
import { useLoaderData, useNavigate, useSubmit, useRouteLoaderData } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    AppBar,
    Box,
    Button,
    Toolbar,
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
import { styled } from '@mui/material/styles';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeleteIcon from '@mui/icons-material/Delete';

import AuthContext from '../../../Context/AuthContext';
import Welcome from './Welcome';
import ProductInCart from './ProductInCart';
import LoginForm from './LoginForm';
import Tooltip from '../../Tooltip';

//

const drawerHead = '6rem';

function DrawerHeader() {
    return (
        <Box
            id="drawer-header"
            sx={{
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'flex-start',
                backgroundColor: '#009bd8',
                // necessary for content to be below app bar
                minHeight: drawerHead,
            }}
        />
    );
}

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

const StyledBadge = styled(Badge)(({ theme, isAnimated }) => ({
    '& .MuiBadge-badge': {
        color: theme.palette.primary.contrastText,
        right: -8,
        border: `0.1rem solid ${theme.palette.background.paper}`,
        backgroundColor: theme.palette.error.main,
        animationName: isAnimated ? 'idle' : 'badgePulse',
        animationDuration: '1s',
    },
    '@keyframes badgePulse': {
        from: {
            fontSize: '100%',
            color: 'white',
        },
        to: {
            fontSize: '125%',
            color: theme.palette.primary.main,
        },
    },
    '@keyframes idle': { '100%': {} },
}));

const iconHover = {
    '&:hover .MuiSvgIcon-root': {
        color: 'primary.dark',
    },
};

const toolBarHover = {
    '&:hover .MuiPaper-root': {
        backgroundColor: 'primary.main',
    },
};

function DefaultAppBar() {
    const { auth } = useContext(AuthContext);
    const [notLoggedIn, setNotLoggedIn] = useState(false);
    const [changeAmount, setChangeAmount] = useState(false);
    const [currentOpenDrawer, setCurrentOpenDrawer] = useState('');
    const navigate = useNavigate();
    const submit = useSubmit();
    const amount = 0;
    const allProducts = useRouteLoaderData('products');
    const { cart, products } = useLoaderData();
    const [productsLength, setProductsLength] = useState(cart?.products?.length);

    useEffect(() => {
        if (cart?.products?.length !== productsLength) {
            setTimeout(() => {
                setProductsLength(cart?.products?.length);
            }, 3000);
        }
    }, [cart?.products?.length]);

    const drawerOpen = (drawer) => () => {
        notLoggedIn && setNotLoggedIn(false);
        if (currentOpenDrawer === drawer) {
            setCurrentOpenDrawer('');
        } else {
            setCurrentOpenDrawer(drawer);
        }
    };

    function navigateToCart() {
        if (!auth.username) {
            setCurrentOpenDrawer('account');
            setNotLoggedIn(true);
        } else {
            setCurrentOpenDrawer('');
            navigate('/ostoskori');
        }
    }

    function handleClick() {
        submit({ amount }, { method: 'put', action: '/' });
    }

    function handleSubmit() {
        submit();
        setChangeAmount(false);
    }

    return (
        <Box id="appbar-containing-div" sx={toolBarHover}>
            <AppBar
                sx={{
                    backgroundColor: 'rgba(0, 155, 216, 0.55)',
                    zIndex: 1250,
                    width: 'min-content',
                    minHeight: drawerHead,
                    boxShadow: 0,
                    padding: '1rem 1rem 0 1rem',
                    borderBottomLeftRadius: '0.4rem',
                    borderTopLeftRadius: '0.4rem',
                }}
            >
                <Toolbar>
                    <Stack direction="row" spacing={4}>
                        <IconButton onClick={drawerOpen('shoppingCart')} sx={iconHover}>
                            <StyledBadge
                                isAnimated={productsLength === cart?.products?.length}
                                badgeContent={cart?.products?.length}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <ShoppingCartOutlinedIcon sx={{ fontSize: 36, color: '#fff' }} />
                            </StyledBadge>
                        </IconButton>
                        <IconButton onClick={drawerOpen('account')} sx={iconHover}>
                            <AccountCircleOutlinedIcon sx={{ fontSize: 36, color: '#fff' }} />
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Drawer currentOpenDrawer={currentOpenDrawer} name="shoppingCart" onClose={drawerOpen('')}>
                {/* tähän oma komponentti.. */}
                <List>
                    {cart?.products?.length === 0 && (
                        <Typography variant="h6" align="center">
                            Ostoskorisi on tyhjä.
                        </Typography>
                    )}
                    {products?.map((cartProduct) => {
                        const productsInCart = allProducts?.filter(
                            (product) => product.group_id === cartProduct.group_id
                        );
                        return (
                            productsInCart && (
                                <ProductInCart
                                    key={cartProduct.id}
                                    text={cartProduct.name}
                                    count={cartProduct.count}
                                    index={cartProduct.id}
                                    amountInStorage={productsInCart[0].amount}
                                    setChangeAmount={setChangeAmount}
                                />
                            )
                        );
                    })}
                    {cart?.products?.length > 0 && (
                        <>
                            {changeAmount && (
                                <ListItem
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        mt: 2,
                                        mb: 2,
                                    }}
                                >
                                    <Button onClick={handleSubmit}>
                                        <ListItemText
                                            primary="Muuta määrää"
                                            primaryTypographyProps={{ fontWeight: 'bold' }}
                                        />
                                    </Button>
                                </ListItem>
                            )}
                            <ListItem
                                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}
                            >
                                <Button color="error" startIcon={<DeleteIcon />} onClick={handleClick}>
                                    <ListItemText
                                        primary="Tyhjennä ostoskori"
                                        primaryTypographyProps={{ fontWeight: 'bold' }}
                                    />
                                </Button>
                            </ListItem>
                        </>
                    )}
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
                {auth.username ? (
                    <Welcome setCurrentOpenDrawer={setCurrentOpenDrawer} auth={auth} />
                ) : (
                    <LoginForm setCurrentOpenDrawer={setCurrentOpenDrawer} notLoggedIn={notLoggedIn} />
                )}
            </Drawer>
        </Box>
    );
}

export default DefaultAppBar;
