import { useState, useContext, useEffect, ReactNode } from 'react';
import { useLoaderData, useNavigate, useSubmit, useRouteLoaderData } from 'react-router-dom';

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
    Theme,
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
import type { shoppingCartLoader } from '../../../Router/loaders';
import type { productListLoader } from '../../../Router/loaders';

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

interface DrawerProps {
    currentOpenDrawer: string;
    name: string;
    onClose: () => void;
    children: ReactNode;
}

interface StyledBadge {
    isanimated: number;
    theme?: Theme;
}

const drawerWidth = 490;

function Drawer({ currentOpenDrawer, name, onClose, children }: DrawerProps) {
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

const StyledBadge = styled(Badge)(({ theme, isanimated }: StyledBadge) => ({
    '& .MuiBadge-badge': {
        color: theme?.palette.primary.contrastText,
        right: -8,
        border: `0.1rem solid ${theme?.palette.background.paper}`,
        backgroundColor: theme?.palette.error.main,
        animationName: isanimated ? 'idle' : 'badgePulse',
        animationDuration: '1s',
    },
    '@keyframes badgePulse': {
        from: {
            fontSize: '100%',
            color: 'white',
        },
        to: {
            fontSize: '125%',
            color: theme?.palette.primary.main,
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

interface CartProduct {
    id: number & string;
    count: number;
    name: string;
    group_id: number;
}

interface SubmitFunction {
    (SubmitTarget: string, options: { method: string; action: string }): any;
}

function DefaultAppBar() {
    const { auth } = useContext(AuthContext);
    const [notLoggedIn, setNotLoggedIn] = useState(false);
    const [currentOpenDrawer, setCurrentOpenDrawer] = useState('');
    const navigate = useNavigate();
    const submit = useSubmit() as unknown as SubmitFunction;
    const { cart, products, amountList } = useLoaderData() as Awaited<ReturnType<typeof shoppingCartLoader>>;
    const [productsLength, setProductsLength] = useState(cart?.products?.length);
    const [cartEmpty, setCartEmpty] = useState(false);

    useEffect(() => {
        if (cart?.products?.length !== productsLength) {
            setTimeout(() => {
                setProductsLength(cart?.products?.length);
            }, 3000);
        }
    }, [cart?.products?.length]);

    const drawerOpen = (drawer: string) => () => {
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
            if (cart?.products?.length === 0) {
                setCartEmpty(true);
            } else {
                setCartEmpty(false);
                setCurrentOpenDrawer('');
                navigate('/ostoskori');
            }
        }
    }

    function handleClick() {
        submit('a', { method: 'put', action: '/' });
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
                                isanimated={productsLength === cart?.products?.length ? 1 : 0}
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
                        <>
                            {cartEmpty ? (
                                <Typography variant="h6" align="center" sx={{ color: 'error.main' }}>
                                    Et voi siirtyä kassalle tyhjällä ostoskorilla.
                                </Typography>
                            ) : (
                                <Typography variant="h6" align="center">
                                    Ostoskorisi on tyhjä.
                                </Typography>
                            )}
                        </>
                    )}
                    {products?.map((cartProduct: CartProduct) => {
                        const product = amountList.find((p: { id: number }) => p.id == cartProduct.group_id);
                        return (
                            <ProductInCart
                                key={cartProduct.id}
                                text={cartProduct.name}
                                count={cartProduct.count}
                                index={cartProduct.id}
                                maxCount={product?.amount}
                            />
                        );
                    })}
                    {cart?.products?.length > 0 && (
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
