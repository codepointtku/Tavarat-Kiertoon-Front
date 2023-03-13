import { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Stack,
    Badge,
    Drawer as MuiDrawer,
    List,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PhishingIcon from '@mui/icons-material/Phishing';

import AuthContext from '../../../Context/AuthContext';
import Welcome from './Welcome';
import LoginForm from './LoginForm';

//

const drawerHead = '6rem';

const DrawerHeader = () => {
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
        ></Box>
    );
};

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
    const drawerOpen = (drawer) => () => {
        if (currentOpenDrawer === drawer) {
            setCurrentOpenDrawer('');
        } else {
            setCurrentOpenDrawer(drawer);
        }
    };

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
                                badgeContent={4}
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
                    {['Jakkara', 'Nahkasohva', 'Piirtoheitin', 'Chuck Norriksen verkkarit'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Kassalle', 'Muikulle', 'Pihalle'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <ShoppingCartCheckoutIcon /> : <PhishingIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Drawer currentOpenDrawer={currentOpenDrawer} name="account" onClose={drawerOpen('')}>
                {auth.storage_group ? (
                    <Welcome
                        user={
                            localStorage.getItem('userEmail') === null
                                ? 'user not logged in'
                                : localStorage.getItem('userEmail')
                        }
                    />
                ) : (
                    <LoginForm setCurrentOpenDrawer={setCurrentOpenDrawer} />
                )}
            </Drawer>
        </Box>
    );
}

export default DefaultAppBar;
