import { useState, useContext, useEffect, type ReactNode } from 'react';
import { useLoaderData, useNavigate, useLocation, useFetcher } from 'react-router-dom';

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
    // ListItem,
    // ListItemText,
    Typography,
    Popover,
    Grid,
    type Theme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import AuthContext from '../../../Context/AuthContext';
import Welcome from './Welcome';
import ProductInCart from './ProductInCart';
import LoginForm from './LoginForm';
import type { shoppingCartLoader } from '../../../Router/loaders';
import Tooltip from '../../Tooltip';
import { type ShoppingCartAvailableAmountList } from '../../../api';
import CloseDrawerButton from './CloseDrawerButton';

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

interface StyledBadgeIF {
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

const StyledBadge = styled(Badge)(({ theme, isanimated }: StyledBadgeIF) => ({
    '& .MuiBadge-badge': {
        color: theme?.palette.primary.contrastText,
        right: -8,
        border: `0.1rem solid ${theme?.palette.background.paper}`,
        backgroundColor: theme?.palette.error.main,
        // animationName: isanimated ? 'idle' : 'badgePulse',
        // animationDuration: '0.6s',
        // animationTimingFunction: 'ease-in-out',
    },
    // '@keyframes badgePulse': {
    //     // from: {
    //     //     backgroundColor: theme?.palette.error.main,
    //     // },
    //     // to: {
    //     //     backgroundColor: theme?.palette.success.main,
    //     // },
    //     //
    //     '0%': { backgroundColor: theme?.palette.error.main },
    //     '50%': { backgroundColor: theme?.palette.success.main },
    //     '100%': { backgroundColor: theme?.palette.error.main },
    // },
    // '@keyframes idle': { '100%': {} },
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

// interface SubmitFunction {
//     (SubmitTarget: string, options: { method: string; action: string }): any;
// }

interface CartProduct {
    count: number;
    product: { name: string; id: number & string };
}

function DefaultAppBar() {
    const { auth } = useContext(AuthContext);
    const fetcher = useFetcher();
    const [notLoggedIn, setNotLoggedIn] = useState(false);
    const [currentOpenDrawer, setCurrentOpenDrawer] = useState('');
    const navigate = useNavigate();
    const { cart, products, amountList } = useLoaderData() as Awaited<ReturnType<typeof shoppingCartLoader>>;
    const [productsLength, setProductsLength] = useState(cart?.product_items?.length);
    const [cartEmpty, setCartEmpty] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);
    const location = useLocation();
    const [unconfirmedChangesCartProducts, setUnconfirmedChangesCartProducts] = useState(initializeCartProducts());

    useEffect(() => {
        if (cart?.product_items?.length !== productsLength) {
            setTimeout(() => {
                setProductsLength(cart?.product_items?.length);
            }, 3000);
        }
    }, [cart?.product_items?.length, productsLength]);

    function initializeCartProducts() {
        const productArr = [] as object[];
        products?.forEach((product) => productArr.push(product.product.id));
        return productArr;
    }

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
            if (cart?.product_items?.length === 0) {
                setCartEmpty(true);
            } else {
                setCartEmpty(false);
                setCurrentOpenDrawer('');
                navigate('/ostoskori');
            }
        }
    }

    function handlePopOverOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleEmptyCart() {
        fetcher.submit('a' as unknown as HTMLFormElement, { method: 'put', action: '/' });
        setUnconfirmedChangesCartProducts([]);
        setAnchorEl(null);
    }

    return (
        <Box id="appbar-container" sx={toolBarHover}>
            <AppBar
                id="appbar"
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
                <Toolbar id="action-iconbtns">
                    <Stack direction="row" spacing={4}>
                        {!location.pathname.includes('/ostoskori') && (
                            <Tooltip title="Ostoskori">
                                <IconButton onClick={drawerOpen('shoppingCart')} sx={iconHover}>
                                    <StyledBadge
                                        isanimated={productsLength === cart?.product_items?.length ? 1 : 0}
                                        badgeContent={cart?.product_items?.length}
                                        sx={{ color: 'primary.contrastText' }}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <ShoppingCartOutlinedIcon sx={{ fontSize: 36, color: '#fff' }} />
                                    </StyledBadge>
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip title="Käyttäjätili ja kirjautuminen">
                            <IconButton onClick={drawerOpen('account')} sx={iconHover}>
                                <AccountCircleOutlinedIcon sx={{ fontSize: 36, color: '#fff' }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Drawer currentOpenDrawer={currentOpenDrawer} name="shoppingCart" onClose={drawerOpen('')}>
                {/* tähän oma komponentti.. */}
                <List id="cart-product-items-list">
                    {cart?.product_items?.length === 0 && (
                        <>
                            {cartEmpty ? (
                                <Typography
                                    variant="h6"
                                    align="center"
                                    sx={{ color: 'info.main', margin: '1rem 0 0 0' }}
                                >
                                    Lisää tuotteita koriin jatkaaksesi tilaamaan
                                </Typography>
                            ) : (
                                <Typography
                                    variant="h6"
                                    align="center"
                                    sx={{ color: 'info.main', margin: '1rem 0 0 0' }}
                                >
                                    Ostoskorisi on tyhjä
                                </Typography>
                            )}
                        </>
                    )}
                    {products?.map((cartProduct: CartProduct) => {
                        const product = amountList.find(
                            (p) => p.id == cartProduct.product.id
                        ) as ShoppingCartAvailableAmountList;
                        return (
                            <ProductInCart
                                key={cartProduct.product.id}
                                name={cartProduct.product.name}
                                count={cartProduct.count}
                                id={cartProduct.product.id}
                                maxCount={product.amount}
                                amountChangeState={{
                                    unconfirmedChangesCartProducts,
                                    setUnconfirmedChangesCartProducts,
                                }}
                            />
                        );
                    })}
                </List>

                <Grid
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '1rem 0 2rem 0',
                    }}
                >
                    <Grid item xs={2} />
                    <Grid item xs={8}>
                        <Stack gap={6} alignItems="center">
                            <Button
                                onClick={() => navigateToCart()}
                                variant="contained"
                                fullWidth
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'success.dark',
                                    },
                                }}
                                disabled={unconfirmedChangesCartProducts.length > 0}
                            >
                                <Typography fontWeight="bold">Tilaamaan</Typography>
                            </Button>
                            {cart?.product_items?.length > 0 && (
                                <>
                                    <Box>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={handlePopOverOpen}
                                        >
                                            Tyhjennä kori
                                        </Button>
                                    </Box>
                                    <Popover
                                        open={openPopover}
                                        anchorEl={anchorEl}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                        onClose={() => setAnchorEl(null)}
                                        sx={{ mt: 1 }}
                                    >
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ p: '1rem' }}
                                            spacing="1rem"
                                        >
                                            <Typography variant="body2">Oletko varma?</Typography>
                                            <Button size="small" variant="outlined" onClick={handleEmptyCart}>
                                                Kyllä
                                            </Button>
                                            <Button size="small" variant="outlined" onClick={() => setAnchorEl(null)}>
                                                Peruuta
                                            </Button>
                                        </Stack>
                                    </Popover>
                                </>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={2} />
                </Grid>
                <CloseDrawerButton setCurrentOpenDrawer={setCurrentOpenDrawer} />
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
