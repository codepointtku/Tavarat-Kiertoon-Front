import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
} from '@mui/material/';

import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import ExpandIcon from '@mui/icons-material/Expand';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import ImportExportIcon from '@mui/icons-material/ImportExport';
// import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import LogoutIcon from '@mui/icons-material/Logout';
import People from '@mui/icons-material/People';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
// import PostAddIcon from '@mui/icons-material/PostAdd';
// import Public from '@mui/icons-material/Public'; // a globe
// import EditIcon from '@mui/icons-material/Edit'; // a pen
// import NotesIcon from '@mui/icons-material/Notes'; // three vertical lines
// import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'; // a sheet with magnifying glass
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'; // three horizontal lines and a plus sign
import WarehouseIcon from '@mui/icons-material/Warehouse';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DomainIcon from '@mui/icons-material/Domain';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import MailIcon from '@mui/icons-material/Mail';
// import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import Tooltip from '../../Tooltip';
import { ListItemButtonLink } from '../../MUILinkComponents';

//

// list item links data (mapped out variables)
const tilaukset = [
    { icon: <AutoStoriesIcon />, label: 'Tarkastele', to: '/admin/tilaukset' },
    { icon: <ImportExportIcon />, label: 'Sähköpostilista', to: '/admin/tilaukset/sahkopostilista' },
];

const tuotteet = [
    { icon: <ManageSearchIcon />, label: 'Tarkastele', to: '/admin/tuotteet' },
    { icon: <LibraryAddIcon />, label: 'Luo uusi', to: '/admin/tuotteet/luo' },
    {
        icon: <AccountTreeIcon />,
        label: 'Kategoriat',
        to: '/admin/tuotteet/kategoriat',
    },
    { icon: <ColorLensIcon />, label: 'Värit', to: '/admin/tuotteet/varit' },
];

const kayttajat = [{ icon: <People />, label: 'Tarkastele', to: '/admin/kayttajat' }];

const varastot = [
    { icon: <DomainIcon />, label: 'Tarkastele', to: '/admin/varastot' },
    { icon: <DomainAddIcon />, label: 'Lisää uusi', to: '/admin/varastot/luo' },
];

const tiedotteet = [
    { icon: <LibraryBooksIcon />, label: 'Tarkastele', to: '/admin/tiedotteet' },
    { icon: <LibraryAddIcon />, label: 'Luo uusi', to: '/admin/tiedotteet/luo' },
];

const viestit = [
    { icon: <MailIcon />, label: 'Tarkastele', to: '/admin/viestit' },
    // { icon: <MarkEmailUnreadIcon />, label: 'Lukemattomat', to: '/admin/viestit?tila=Lukemattomat' },
];

const NavStyles = styled(List)<{ component?: React.ElementType }>({
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

// main
function NavigationTree() {
    const navigoiTonne = useNavigate();

    const [open, setOpen] = React.useState({
        ordersNavList: false,
        productsNavList: false,
        usersNavList: false,
        storagesNavList: false,
        bulletinsNavList: false,
        messagingNavList: false, // // messages nowadays (read only)
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

    const handleListTitleClick = (title: string) => {
        switch (title) {
            case 'orders':
                if (open.ordersNavList) {
                    setOpen((open) => ({ ...open, ordersNavList: !open.ordersNavList }));
                } else {
                    // console.log('refreshing page...');
                    setOpen((open) => ({ ...open, ordersNavList: !open.ordersNavList }));
                    navigoiTonne('/admin/tilaukset');
                }
                break;
            case 'products':
                if (open.productsNavList) {
                    setOpen((open) => ({ ...open, productsNavList: !open.productsNavList }));
                } else {
                    setOpen((open) => ({ ...open, productsNavList: !open.productsNavList }));
                    navigoiTonne('/admin/tuotteet');
                }
                break;
            case 'users':
                if (open.usersNavList) {
                    setOpen((open) => ({ ...open, usersNavList: !open.usersNavList }));
                } else {
                    setOpen((open) => ({ ...open, usersNavList: !open.usersNavList }));
                    navigoiTonne('/admin/kayttajat');
                }
                break;
            case 'storages':
                if (open.storagesNavList) {
                    setOpen((open) => ({ ...open, storagesNavList: !open.storagesNavList }));
                } else {
                    setOpen((open) => ({ ...open, storagesNavList: !open.storagesNavList }));
                    navigoiTonne('/admin/varastot');
                }
                break;
            case 'bulletins':
                if (open.bulletinsNavList) {
                    setOpen((open) => ({ ...open, bulletinsNavList: !open.bulletinsNavList }));
                } else {
                    setOpen((open) => ({ ...open, bulletinsNavList: !open.bulletinsNavList }));
                    navigoiTonne('/admin/tiedotteet');
                }
                break;
            case 'messaging':
                if (open.messagingNavList) {
                    setOpen((open) => ({ ...open, messagingNavList: !open.messagingNavList }));
                } else {
                    setOpen((open) => ({ ...open, messagingNavList: !open.messagingNavList }));
                    navigoiTonne('/admin/viestit');
                }
                break;
            default:
                break;
        }
    };

    // navigation accordion list items (links):

    // tilaukset
    const ordersListItems = (
        <Box
            sx={{
                bgcolor: open.ordersNavList ? 'rgba(71, 98, 130, 0.2)' : null, // #476282
                pb: open.ordersNavList ? 2 : 0,
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                // onClick={() => setOpen((open) => ({ ...open, ordersNavList: !open.ordersNavList }))}
                onClick={() => handleListTitleClick('orders')}
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
                // onClick={() => setOpen((open) => ({ ...open, productsNavList: !open.productsNavList }))}
                onClick={() => handleListTitleClick('products')}
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
                // onClick={() => setOpen((open) => ({ ...open, usersNavList: !open.usersNavList }))}
                onClick={() => handleListTitleClick('users')}
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
                // onClick={() => setOpen((open) => ({ ...open, storagesNavList: !open.storagesNavList }))}
                onClick={() => handleListTitleClick('storages')}
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
                // onClick={() => setOpen((open) => ({ ...open, bulletinsNavList: !open.bulletinsNavList }))}
                onClick={() => handleListTitleClick('bulletins')}
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
                // onClick={() => setOpen((open) => ({ ...open, messagingNavList: !open.messagingNavList }))}
                onClick={() => handleListTitleClick('messaging')}
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
                <Paper id="admin-navtree-paper" elevation={0} sx={{ maxWidth: 256 }}>
                    <NavStyles id="admin-navtree-styles-wrapper" component="nav" disablePadding>
                        <Tooltip title="Lataa koko paneeli uudestaan" position="right">
                            <ListItemButton id="admin-panel-refresh-linkbtn" component="a" href="/admin">
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
                        </Tooltip>
                        <Divider />
                        <ListItem component="div" disablePadding>
                            <ListItemButtonLink id="overview-link" to="/admin" sx={{ height: 56 }}>
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
                                    <Settings id="settings-icon" />
                                </Tooltip>
                                <Menu id="settings-dropdown-menu" anchorEl={anchorEl} open={settingsDropDownMenuOpen}>
                                    <MenuItem onClick={handleCloseFullNavList} divider>
                                        <ListItemText>Sulje kaikki valikot</ListItemText>
                                        <ListItemIcon>
                                            <VerticalAlignCenterIcon sx={{ marginLeft: '1rem' }} />
                                        </ListItemIcon>
                                    </MenuItem>
                                    <MenuItem onClick={handleOpenFullNavList} divider>
                                        <ListItemText>Avaa kaikki valikot</ListItemText>
                                        <ListItemIcon>
                                            <ExpandIcon sx={{ marginLeft: '1rem' }} />
                                        </ListItemIcon>
                                    </MenuItem>

                                    <Tooltip position="right" title="Siirtyy varastohenkilökunnan käyttöliittymään">
                                        <MenuItem onClick={handleClose} component={Link} to="/varasto">
                                            <ListItemText>Siirry varastonäkymään</ListItemText>
                                            <ListItemIcon>
                                                <LogoutIcon sx={{ marginLeft: '1rem' }} />
                                            </ListItemIcon>
                                        </MenuItem>
                                    </Tooltip>
                                    <Tooltip position="right" title="Siirtyy pyörävaraston käyttöliittymään">
                                        <MenuItem onClick={handleClose} component={Link} to="/pyorat/pyoravarasto">
                                            <ListItemText>Siirry pyörävarastoon</ListItemText>
                                            <ListItemIcon>
                                                <WarehouseIcon sx={{ marginLeft: '1rem' }} />
                                            </ListItemIcon>
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
                    </NavStyles>
                </Paper>
            </ThemeProvider>
        </Box>
    );
}

export default NavigationTree;
