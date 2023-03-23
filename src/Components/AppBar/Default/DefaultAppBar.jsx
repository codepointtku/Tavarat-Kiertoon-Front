import { useState, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
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

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -8,
        border: `0.1rem solid ${theme.palette.background.paper}`,
        backgroundColor: `${theme.palette.error.main}`,
    },
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
    const [currentOpenDrawer, setCurrentOpenDrawer] = useState('');
    const navigate = useNavigate();
    const { cart } = useLoaderData();

    const drawerOpen = (drawer) => () => {
        if (currentOpenDrawer === drawer) {
            setCurrentOpenDrawer('');
        } else {
            setCurrentOpenDrawer(drawer);
        }
    };

    function navigateToCart() {
        navigate('/ostoskori');
        setCurrentOpenDrawer('');
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
                                badgeContent={cart?.products?.length}
                                sx={{ color: 'primary.contrastText' }}
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
                    {cart?.products?.map((product) => (
                        <ProductInCart key={product.id} text={product.name} index={product.id} />
                    ))}
                </List>
                <ListItem sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}>
                    <Button color="error" startIcon={<DeleteIcon />}>
                        <ListItemText primary="Tyhjennä ostoskori" primaryTypographyProps={{ fontWeight: 'bold' }} />
                    </Button>
                </ListItem>
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
                    <LoginForm setCurrentOpenDrawer={setCurrentOpenDrawer} />
                )}
            </Drawer>
        </Box>
    );
}

export default DefaultAppBar;
