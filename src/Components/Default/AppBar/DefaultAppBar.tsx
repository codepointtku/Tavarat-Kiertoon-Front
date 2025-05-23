import { useState, useContext } from 'react';
import { useLoaderData, useNavigate, useLocation, useFetcher, Link } from 'react-router-dom';

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
    Typography,
    Popover,
    Grid,
    ListItem,
    ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import WarehouseIcon from '@mui/icons-material/Warehouse';
import SecurityIcon from '@mui/icons-material/Security';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import BuildIcon from '@mui/icons-material/Build';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import AuthContext from '../../../Context/AuthContext';
import HasRole from '../../../Utils/HasRole';

import ProductInCart from './ProductInCart';
import CloseDrawerButton from './CloseDrawerButton';
import Tooltip from '../../Tooltip';
import LoginForm from '../../LoginForm';

import type { ReactNode } from 'react';
import type { BadgeProps } from '@mui/material/Badge';
import type { shoppingCartLoader } from '../../../Router/loaders';
import type { ShoppingCartAvailableAmountList } from '../../../api';

//

interface DrawerProps {
    currentOpenDrawer: string;
    name: string;
    onClose: () => void;
    children: ReactNode;
}

interface CartProduct {
    count: number;
    product: { name: string; id: number & string };
}

const drawerHead = '6rem';
const drawerWidth = 490;
const appBarBackgroundColor = 'rgba(0, 155, 216, 0.55)';

const iconHover = {
    '&:hover .MuiSvgIcon-root': {
        color: 'primary.dark',
    },
};

const toolBarHover = {
    '&:hover .MuiPaper-root': {
        animationName: 'fade-in',
        animationDuration: '0.3s',
        animationIterationCount: 1,
        animationFillMode: 'forwards',
        // opacity: 1,
        '@keyframes fade-in': {
            '0%': {
                // opacity: 0,
                backgroundColor: appBarBackgroundColor,
            },
            '100%': {
                // opacity: 1,
                backgroundColor: 'primary.main',
            },
        },
    },
};

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

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        color: theme?.palette.primary.contrastText,
        right: -8,
        border: `0.1rem solid ${theme?.palette.background.paper}`,
        backgroundColor: theme?.palette.error.main,
    },
}));

function DefaultAppBar() {
    const { cart, products, amountList } = useLoaderData() as Awaited<ReturnType<typeof shoppingCartLoader>>;

    const { auth } = useContext(AuthContext);
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const location = useLocation();

    const [currentOpenDrawer, setCurrentOpenDrawer] = useState('');
    const [notLoggedIn, setNotLoggedIn] = useState(false);
    const [cartEmpty, setCartEmpty] = useState(false);
    const [unconfirmedChangesCartProducts, setUnconfirmedChangesCartProducts] = useState(initializeCartProducts());
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);

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
                    backgroundColor: appBarBackgroundColor,
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
                        <HasRole role="bicycle_group">
                            <Tooltip title="Pyörien vuokraus">
                                <IconButton component={Link} to="/pyorat" onClick={drawerOpen('')} sx={iconHover}>
                                    <DirectionsBikeIcon sx={{ fontSize: 36, color: '#fff' }} />
                                </IconButton>
                            </Tooltip>
                        </HasRole>

                        <HasRole role="bicycle_admin_group">
                            <Tooltip title="Pyörävarasto">
                                <IconButton
                                    component={Link}
                                    to="/pyorat/pyoravarasto"
                                    onClick={drawerOpen('')}
                                    sx={iconHover}
                                >
                                    <PedalBikeIcon sx={{ fontSize: 36, color: '#fff' }} />
                                </IconButton>
                            </Tooltip>
                        </HasRole>

                        <HasRole role="storage_group">
                            <Tooltip title="Varasto">
                                <IconButton component={Link} to="/varasto" onClick={drawerOpen('')} sx={iconHover}>
                                    <WarehouseIcon sx={{ fontSize: 36, color: '#fff' }} />
                                </IconButton>
                            </Tooltip>
                        </HasRole>

                        <HasRole role="admin_group">
                            <Tooltip title="Ylläpito">
                                <IconButton component={Link} to="/admin" onClick={drawerOpen('')} sx={iconHover}>
                                    <SecurityIcon sx={{ fontSize: 36, color: '#fff' }} />
                                </IconButton>
                            </Tooltip>
                        </HasRole>

                        {!location.pathname.includes('/ostoskori') && (
                            <Tooltip title="Ostoskori">
                                <IconButton onClick={drawerOpen('shoppingCart')} sx={iconHover}>
                                    {auth.username ? (
                                        <StyledBadge
                                            badgeContent={cart?.product_items?.length}
                                            sx={{ color: 'primary.contrastText' }}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                        >
                                            <ShoppingCartOutlinedIcon sx={{ fontSize: 36, color: '#fff' }} />
                                        </StyledBadge>
                                    ) : (
                                        <ShoppingCartOutlinedIcon sx={{ fontSize: 36, color: '#fff' }} />
                                    )}
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
                {auth.username ? (
                    <>
                        <List sx={{ width: '100%', maxWidth: 490 }}>
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
                        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Grid item xs={2} />
                            <Grid item xs={8}>
                                <List>
                                    <ListItem sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                            <ListItemText
                                                primary={
                                                    unconfirmedChangesCartProducts.length > 0
                                                        ? 'Vahvistamattomia muutoksia'
                                                        : 'Tilaamaan'
                                                }
                                                primaryTypographyProps={{ fontWeight: 'bold' }}
                                            />
                                        </Button>
                                    </ListItem>
                                </List>

                                {cart?.product_items?.length > 0 && (
                                    <ListItem sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            fullWidth
                                            onClick={handlePopOverOpen}
                                        >
                                            Tyhjennä kori
                                        </Button>
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
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => setAnchorEl(null)}
                                                >
                                                    Peruuta
                                                </Button>
                                            </Stack>
                                        </Popover>
                                    </ListItem>
                                )}
                            </Grid>
                            <Grid item xs={2} />
                        </Grid>
                    </>
                ) : (
                    <Button sx={{ m: 5 }} onClick={() => setCurrentOpenDrawer('account')}>
                        Kirjaudu sisään
                    </Button>
                )}
                <CloseDrawerButton setCurrentOpenDrawer={setCurrentOpenDrawer} />
            </Drawer>

            <Drawer currentOpenDrawer={currentOpenDrawer} name="account" onClose={drawerOpen('')}>
                <LoginForm setCurrentOpenDrawer={setCurrentOpenDrawer} />
                <CloseDrawerButton setCurrentOpenDrawer={setCurrentOpenDrawer} />
            </Drawer>
        </Box>
    );
}

export default DefaultAppBar;
