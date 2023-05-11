import * as React from 'react';
import { Link } from 'react-router-dom';

import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    IconButton,
    // Checkbox,
} from '@mui/material/';

import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';

import Tooltip from '../../Tooltip';
import { ListItemButtonLink } from '../../MUILinkComponents';
// import { Check } from '@mui/icons-material';

// list item links data (mapped out variables)
const tilaukset = [
    { icon: <People />, label: 'Tarkastele', to: '/admin/pagetest' },
    { icon: <Dns />, label: 'Muokkaa', to: '/tilauksetmuokkaa' },
    { icon: <PermMedia />, label: 'Lisää uusi', to: '/tilauksetlisaa' },
    // { icon: <Public />, label: 'Jotain', to: '/tilauksetjotain' },
];

const tuotteet = [
    { icon: <People />, label: 'Tarkastele', to: '/placeholder' },
    { icon: <Dns />, label: 'Muokkaa', to: '/placeholder' },
    { icon: <PermMedia />, label: 'Lisää uusi', to: '/placeholder' },
    // { icon: <Public />, label: 'Jotain', to: '/placeholder' },
];

const kayttajat = [
    { icon: <People />, label: 'Tarkastele', to: '/admin/kayttajat' },
    // { icon: <Dns />, label: 'Muokkaa', to: '/placeholder' },
    // { icon: <PermMedia />, label: 'Lisää uusi', to: '/placeholder' },
    { icon: <Public />, label: 'Hakemukset', to: '/admin/hakemukset' },
];

const varastot = [
    { icon: <People />, label: 'Tarkastele', to: '/admin/varastot' },
    // { icon: <Dns />, label: 'Muokkaa', to: '/placeholder' },
    { icon: <PermMedia />, label: 'Lisää uusi', to: '/admin/varastot/luo' },
];

const tiedotteet = [
    { icon: <People />, label: 'Tarkastele', to: '/admin/tiedotteet' },
    { icon: <PermMedia />, label: 'Luo uusi', to: '/admin/tiedotteet/luo' },
];

const viestit = [
    { icon: <People />, label: 'Saapuneet', to: '/placeholder' },
    { icon: <PermMedia />, label: 'Aiheet', to: '/placeholder' },
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

// function Test() {
//     <Checkbox />;
// }

// main
function NavigationTree() {
    const [open, setOpen] = React.useState({
        ordersNavList: false,
        productsNavList: false,
        usersNavList: false,
        storagesNavList: false,
        bulletinsNavList: false,
        messagingNavList: false,
    });

    // ux functions
    const handleCloseFullNavList = () => {
        setOpen({
            ordersNavList: false,
            productsNavList: false,
            usersNavList: false,
            storagesNavList: false,
            bulletinsNavList: false,
            messagingNavList: false,
        });
    };

    const handleOpenFullNavList = () => {
        setOpen({
            ordersNavList: true,
            productsNavList: true,
            usersNavList: true,
            storagesNavList: true,
            bulletinsNavList: true,
            messagingNavList: true,
        });
    };

    // const handleCheckKeepFullNavListOpen = () => {
    // checkbox
    // }

    // drop down menu (settings menu):
    const [settingsDropDownMenuOpen, setSettingsDropDownMenuOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClickSettingsDropDownMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSettingsDropDownMenuOpen(!settingsDropDownMenuOpen);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setSettingsDropDownMenuOpen(!settingsDropDownMenuOpen);
        setAnchorEl(null);
    };

    // navigation bar list items (links):
    // tilaukset
    const ordersListItems = (
        <Box
            sx={{
                bgcolor: open.ordersNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open.ordersNavList ? 2 : 0,
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen((open) => ({ ...open, ordersNavList: !open.ordersNavList }))}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open.ordersNavList ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: open.ordersNavList ? 1 : 0 } },
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
                    secondary="Tilauksien hallinta"
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: open.ordersNavList ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: open.ordersNavList ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {open.ordersNavList &&
                tilaukset.map((item) => (
                    <ListItemButtonLink
                        to={item.to}
                        key={item.label}
                        sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                    >
                        <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButtonLink>
                ))}
        </Box>
    );

    // tuotteet
    const productsListItems = (
        <Box
            sx={{
                bgcolor: open.productsNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open.productsNavList ? 2 : 0,
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen((open) => ({ ...open, productsNavList: !open.productsNavList }))}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open.productsNavList ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: open.productsNavList ? 1 : 0 } },
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
                    secondary="Tuotteiden hallinta"
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: open.productsNavList ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: open.productsNavList ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {open.productsNavList &&
                tuotteet.map((item) => (
                    <ListItemButtonLink
                        to={item.to}
                        key={item.label}
                        sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                    >
                        <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButtonLink>
                ))}
        </Box>
    );

    // käyttäjät
    const usersListItems = (
        <Box
            sx={{
                bgcolor: open.usersNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open.usersNavList ? 2 : 0,
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen((open) => ({ ...open, usersNavList: !open.usersNavList }))}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open.usersNavList ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: open.usersNavList ? 1 : 0 } },
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
                    secondary="Käyttäjien hallinta"
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: open.usersNavList ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: open.usersNavList ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {open.usersNavList &&
                kayttajat.map((item) => (
                    <ListItemButtonLink
                        to={item.to}
                        key={item.label}
                        sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                    >
                        <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButtonLink>
                ))}
        </Box>
    );

    // varastot
    const storagesListItems = (
        <Box
            sx={{
                bgcolor: open.storagesNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open.storagesNavList ? 2 : 0,
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen((open) => ({ ...open, storagesNavList: !open.storagesNavList }))}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open.storagesNavList ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: open.storagesNavList ? 1 : 0 } },
                }}
            >
                <ListItemText
                    primary="Varastot"
                    primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                    }}
                    secondary="Varastojen hallinta"
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: open.storagesNavList ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: open.storagesNavList ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {open.storagesNavList &&
                varastot.map((item) => (
                    <ListItemButtonLink
                        to={item.to}
                        key={item.label}
                        sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                    >
                        <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButtonLink>
                ))}
        </Box>
    );

    // tiedotteet
    const bulletinsListItems = (
        <Box
            sx={{
                bgcolor: open.bulletinsNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open.bulletinsNavList ? 2 : 0,
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen((open) => ({ ...open, bulletinsNavList: !open.bulletinsNavList }))}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open.bulletinsNavList ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: open.bulletinsNavList ? 1 : 0 } },
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
                    secondary="Tiedotteiden hallinta"
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: open.bulletinsNavList ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: open.bulletinsNavList ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {open.bulletinsNavList &&
                tiedotteet.map((item) => (
                    <ListItemButtonLink
                        to={item.to}
                        key={item.label}
                        sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                    >
                        <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButtonLink>
                ))}
        </Box>
    );

    // viestit
    const messagingListItems = (
        <Box
            sx={{
                bgcolor: open.messagingNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open.messagingNavList ? 2 : 0,
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen((open) => ({ ...open, messagingNavList: !open.messagingNavList }))}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open.messagingNavList ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: open.messagingNavList ? 1 : 0 } },
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
                    secondary="Viestien hallinta"
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: open.messagingNavList ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                    }}
                    sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: open.messagingNavList ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {open.messagingNavList &&
                viestit.map((item) => (
                    <ListItemButtonLink
                        to={item.to}
                        key={item.label}
                        sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                    >
                        <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                        />
                    </ListItemButtonLink>
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
                        primary: { main: 'rgb(102, 157, 246)' }, // #669DF6 hex
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
                            <ListItemButtonLink to="/admin" sx={{ height: 56 }}>
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
                            </ListItemButtonLink>
                            <IconButton
                                id="settings-icon-button"
                                aria-controls={settingsDropDownMenuOpen ? 'settings-dropdown-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={settingsDropDownMenuOpen ? 'true' : undefined}
                                onClick={handleClickSettingsDropDownMenu}
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
                                <Tooltip title="Paneelin asetukset">
                                    <Settings />
                                </Tooltip>
                                <Menu
                                    id="settings-dropdown-menu"
                                    anchorEl={anchorEl}
                                    open={settingsDropDownMenuOpen}
                                    // onClose={handleClose}
                                >
                                    <MenuItem onClick={handleCloseFullNavList} divider>
                                        Sulje kaikki valikot
                                    </MenuItem>
                                    <MenuItem onClick={handleOpenFullNavList} divider>
                                        {/* <> */}
                                        Avaa kaikki valikot
                                        {/* checkbox component here */}
                                        {/* <Test /> */}
                                        {/* <Checkbox /> */}
                                        {/* </> */}
                                    </MenuItem>
                                    <Tooltip
                                        position="right"
                                        title="Nollaa kaikki ilmoitukset, viestit ja uutiset nähdyiksi"
                                    >
                                        <MenuItem onClick={handleClose} divider>
                                            Merkitse kaikki luetuksi
                                            {/* component here */}
                                        </MenuItem>
                                    </Tooltip>
                                    <Tooltip position="right" title="Siirtyy varastohenkilökunnan käyttöliittymään">
                                        <MenuItem onClick={handleClose} component={Link} to="/varasto">
                                            Siirry varastonäkymään
                                        </MenuItem>
                                    </Tooltip>
                                </Menu>

                                <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                            </IconButton>
                        </ListItem>
                        <Divider />
                        {ordersListItems}
                        {productsListItems}
                        {usersListItems}
                        {storagesListItems}
                        {bulletinsListItems}
                        {messagingListItems}
                    </FireNav>
                </Paper>
            </ThemeProvider>
        </Box>
    );
}

export default NavigationTree;
