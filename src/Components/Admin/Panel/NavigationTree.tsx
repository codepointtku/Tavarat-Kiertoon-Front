import * as React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    IconButton,
    Tooltip,
} from '@mui/material/';

import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';

const data = [
    { icon: <People />, label: 'Tarkastele' },
    { icon: <Dns />, label: 'Muokkaa' },
    { icon: <PermMedia />, label: 'Lisää uusi' },
    { icon: <Public />, label: 'Jotain' },
];

const tuotteet = [
    { icon: <People />, label: 'Tarkastele' },
    { icon: <Dns />, label: 'Muokkaa' },
    { icon: <PermMedia />, label: 'Lisää uusi' },
    { icon: <Public />, label: 'Jotain' },
];

const kayttajat = [
    { icon: <People />, label: 'Tarkastele' },
    { icon: <Dns />, label: 'Muokkaa' },
    { icon: <PermMedia />, label: 'Lisää uusi' },
    { icon: <Public />, label: 'Hakemukset' },
];

const tiedotteet = [
    { icon: <People />, label: 'Tarkastele' },
    { icon: <PermMedia />, label: 'Luo uusi' },
];

const viestit = [
    { icon: <People />, label: 'Saapuneet' },
    { icon: <PermMedia />, label: 'Aiheet' },
];

const FireNav = styled(List)<{ component?: React.ElementType }>({
    '& .MuiListItemButton-root': {
        paddingLeft: 24,
        paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 20,
    },
});

// type StateStuff = {
//     ordersNavList: boolean;
//     productsNavList: boolean;
//     usersNavList: boolean;
//     bulletinsNavList: boolean;
//     messagingNavList: boolean;
// }

function NavigationTree() {
    // const tila: StateStuff = {ordersNavList: false, productsNavList: false, usersNavList: false, bulletinsNavList: false, messagingNavList: false}
    // const [open, setOpen] = React.useState(tila);

    // unethical dummy state-thing
    const [openOrdersNavList, setOpenOrdersNavList] = React.useState(false);
    const [openProductsNavList, setOpenProductsNavList] = React.useState(false);
    const [openUsersNavList, setOpenUsersNavList] = React.useState(false);
    const [openBulletinsNavList, setOpenBulletinsNavList] = React.useState(false);
    const [openMessagingNavList, setOpenMessagingNavList] = React.useState(false);

    // tilaukset
    const ordersListItems = (
        <Box
            sx={{
                bgcolor: openOrdersNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: openOrdersNavList ? 2 : 0,
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                // onClick={() => setOpen({ ...tila, [tila.ordersNavList]: !tila.ordersNavList })}
                onClick={() => setOpenOrdersNavList(!openOrdersNavList)}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: openOrdersNavList ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: openOrdersNavList ? 1 : 0 } },
                }}
            >
                <ListItemText
                    primary="Tilaukset"
                    primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                    }}
                    secondary="Tilauksien hallinta..."
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: openOrdersNavList ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: openOrdersNavList ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {openOrdersNavList &&
                data.map((item) => (
                    <ListItemButton key={item.label} sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}>
                        <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButton>
                ))}
        </Box>
    );

    // tuotteet
    const productsListItems = (
        <Box
            sx={{
                bgcolor: openProductsNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: openProductsNavList ? 2 : 0,
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpenProductsNavList(!openProductsNavList)}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: openProductsNavList ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: openProductsNavList ? 1 : 0 } },
                }}
            >
                <ListItemText
                    primary="Tuotteet"
                    primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                    }}
                    secondary="Tuotteiden hallinta..."
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: openProductsNavList ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: openProductsNavList ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {openProductsNavList &&
                tuotteet.map((item) => (
                    <ListItemButton key={item.label} sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}>
                        <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButton>
                ))}
        </Box>
    );

    // käyttäjät
    const usersListItems = (
        <Box
            sx={{
                bgcolor: openUsersNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: openUsersNavList ? 2 : 0,
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpenUsersNavList(!openUsersNavList)}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: openUsersNavList ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: openUsersNavList ? 1 : 0 } },
                }}
            >
                <ListItemText
                    primary="Käyttäjät"
                    primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                    }}
                    secondary="Käyttäjien hallinta..."
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: openUsersNavList ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: openUsersNavList ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {openUsersNavList &&
                kayttajat.map((item) => (
                    <ListItemButton key={item.label} sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}>
                        <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButton>
                ))}
        </Box>
    );

    // tiedotteet
    const bulletinsListItems = (
        <Box
            sx={{
                bgcolor: openBulletinsNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: openBulletinsNavList ? 2 : 0,
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpenBulletinsNavList(!openBulletinsNavList)}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: openBulletinsNavList ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: openBulletinsNavList ? 1 : 0 } },
                }}
            >
                <ListItemText
                    primary="Tiedotteet"
                    primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                    }}
                    secondary="Tiedotteiden hallinta..."
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: openBulletinsNavList ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: openBulletinsNavList ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {openBulletinsNavList &&
                tiedotteet.map((item) => (
                    <ListItemButton key={item.label} sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}>
                        <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButton>
                ))}
        </Box>
    );

    // viestit
    const messagingListItems = (
        <Box
            sx={{
                bgcolor: openMessagingNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: openMessagingNavList ? 2 : 0,
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpenMessagingNavList(!openMessagingNavList)}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: openMessagingNavList ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: openMessagingNavList ? 1 : 0 } },
                }}
            >
                <ListItemText
                    primary="Viestit"
                    primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                    }}
                    secondary="Viestien hallinta..."
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: openMessagingNavList ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: openMessagingNavList ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {openMessagingNavList &&
                viestit.map((item) => (
                    <ListItemButton key={item.label} sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}>
                        <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButton>
                ))}
        </Box>
    );

    return (
        <Box id="admin-panel-navigation-tree" sx={{ display: 'flex', backgroundColor: 'primary.main' }}>
            <ThemeProvider
                theme={createTheme({
                    components: {
                        MuiListItemButton: {
                            defaultProps: {
                                disableTouchRipple: true,
                            },
                        },
                    },
                    palette: {
                        mode: 'dark',
                        primary: { main: 'rgb(102, 157, 246)' },
                        background: { paper: 'rgb(5, 30, 52)' },
                    },
                })}
            >
                <Paper elevation={0} sx={{ maxWidth: 256 }}>
                    <FireNav component="nav" disablePadding>
                        <ListItemButton component="a" href="/admin">
                            <ListItemText
                                sx={{ my: 0 }}
                                primary="Hallintapaneeli"
                                primaryTypographyProps={{
                                    fontSize: 20,
                                    fontWeight: 'medium',
                                    letterSpacing: 0,
                                    textAlign: 'center',
                                }}
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItem component="div" disablePadding>
                            <ListItemButton sx={{ height: 56 }}>
                                <ListItemIcon>
                                    <Home color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Yleiskatsaus"
                                    primaryTypographyProps={{
                                        color: 'primary',
                                        fontWeight: 'medium',
                                        variant: 'body2',
                                    }}
                                />
                            </ListItemButton>
                            <Tooltip title="Projektin asetukset">
                                <IconButton
                                    size="large"
                                    sx={{
                                        '& svg': {
                                            color: 'rgba(255,255,255,0.8)',
                                            transition: '0.2s',
                                            transform: 'translateX(0) rotate(0)',
                                        },
                                        '&:hover, &:focus': {
                                            bgcolor: 'unset',
                                            '& svg:first-of-type': {
                                                transform: 'translateX(-4px) rotate(-20deg)',
                                            },
                                            '& svg:last-of-type': {
                                                right: 0,
                                                opacity: 1,
                                            },
                                        },
                                        '&:after': {
                                            content: '""',
                                            position: 'absolute',
                                            height: '80%',
                                            display: 'block',
                                            left: 0,
                                            width: '1px',
                                            bgcolor: 'divider',
                                        },
                                    }}
                                >
                                    <Settings />
                                    <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                                </IconButton>
                            </Tooltip>
                        </ListItem>
                        <Divider />
                        {ordersListItems}
                        {productsListItems}
                        {usersListItems}
                        {bulletinsListItems}
                        {messagingListItems}
                    </FireNav>
                </Paper>
            </ThemeProvider>
        </Box>
    );
}

export default NavigationTree;
