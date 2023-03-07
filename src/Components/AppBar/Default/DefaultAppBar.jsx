import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
    AppBar,
    Box,
    Toolbar,
    // InputBase,
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

// import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PhishingIcon from '@mui/icons-material/Phishing';

import LoginForm from './LoginForm';
// import ContactForm from './ContactForm';

//

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
    backgroundColor: '#009bd8',
    padding: theme.spacing(0, 1),
    // marginTop: '1rem',
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

    const drawerOpen = (drawer) => () => {
        if (currentOpenDrawer === drawer) {
            setCurrentOpenDrawer('');
        } else {
            setCurrentOpenDrawer(drawer);
        }
    };

    return (
        <Box>
            <AppBar
                // position="absolute"
                // color="transparent"
                sx={{
                    // top: 0,
                    // right: 0,
                    zIndex: 1250,
                    // backgroundColor: 'primary.main',
                    width: 'min-content',
                    boxShadow: 0,
                    // padding: '1rem',
                    // marginTop: '1rem',
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: 'flex-end',
                    }}
                >
                    <Stack direction="row" spacing={4}>
                        <IconButton onClick={drawerOpen('shoppingCart')}>
                            <StyledBadge
                                badgeContent={4}
                                sx={{ color: 'primary.contrastText' }}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <ShoppingCartOutlinedIcon sx={{ fontSize: 40, color: '#fff' }} />
                            </StyledBadge>
                        </IconButton>
                        <IconButton onClick={drawerOpen('account')}>
                            <AccountCircleOutlinedIcon sx={{ fontSize: 40, color: '#fff' }} />
                        </IconButton>
                        <IconButton component={Link} to="/otayhteytta">
                            <MailIcon sx={{ fontSize: 40, color: '#fff' }} />
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
                <LoginForm />
            </Drawer>

            {/* <Drawer currentOpenDrawer={currentOpenDrawer} name="contact">
                <ContactForm />
            </Drawer> */}
        </Box>
    );
}

export default DefaultAppBar;
