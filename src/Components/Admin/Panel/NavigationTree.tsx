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
// import Public from '@mui/icons-material/Public'; // a globe
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
// import PostAddIcon from '@mui/icons-material/PostAdd';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
// import EditIcon from '@mui/icons-material/Edit'; // a pen
// import NotesIcon from '@mui/icons-material/Notes'; // three vertical lines
// import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'; // a sheet with magnifying glass
import WarehouseIcon from '@mui/icons-material/Warehouse';
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'; // three horizontal lines and a plus sign
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DomainIcon from '@mui/icons-material/Domain';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import MailIcon from '@mui/icons-material/Mail';
// import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import Tooltip from '../../Tooltip';
import { ListItemButtonLink } from '../../MUILinkComponents';

//

// list item links data (mapped out variables)
const tilaukset = [
    { icon: <AutoStoriesIcon />, label: 'Tilauslista', to: '/admin/tilaukset' },
    { icon: <ImportExportIcon />, label: 'Tilausilmoitukset', to: '/admin/tilaukset/sahkopostilista' },
];

const tuotteet = [
    { icon: <ManageSearchIcon />, label: 'Tuotelista', to: '/admin/tuotteet' },
    { icon: <ColorLensIcon />, label: 'Värit', to: '/admin/tuotteet/varit' },
];

const kayttajat = [{ icon: <People />, label: 'Käyttäjälista', to: '/admin/kayttajat' }];

const varastot = [
    { icon: <DomainIcon />, label: 'Varastolista', to: '/admin/varastot' },
    { icon: <DomainAddIcon />, label: 'Lisää uusi', to: '/admin/varastot/luo' },
];

const tiedotteet = [
    { icon: <LibraryBooksIcon />, label: 'Tiedotelista', to: '/admin/tiedotteet' },
    { icon: <LibraryAddIcon />, label: 'Luo uusi', to: '/admin/tiedotteet/luo' },
];

const viestit = [
    { icon: <MailIcon />, label: 'Viestit asiakkailta', to: '/admin/viestit' },
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

    // navigation accordion list items (links):

    // tilaukset
    const ordersListItems = (
        <Box
            onClick={() => setOpen((open) => ({ ...open, ordersNavList: !open.ordersNavList }))}
            component={Link} //Warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>.
            // component={open?.ordersNavList ? Box : Link} // Alternate: only work as link when closed. UX unconsistent?
            to={'/admin/tilaukset'}
            sx={{
                bgcolor: open.ordersNavList ? 'rgba(71, 98, 130, 0.2)' : null, // #476282
                pb: open.ordersNavList ? 2 : 0,
                textDecoration: 'none',
                color: 'inherit',
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
            component={Link}
            to={'/admin/tuotteet'}
            sx={{
                bgcolor: open.productsNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open.productsNavList ? 2 : 0,
                textDecoration: 'none',
                color: 'inherit',
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
            component={Link}
            to={'/admin/kayttajat'}
            sx={{
                bgcolor: open.usersNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open.usersNavList ? 2 : 0,
                textDecoration: 'none',
                color: 'inherit',
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
            component={Link}
            to={'/admin/varastot'}
            sx={{
                bgcolor: open.storagesNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open.storagesNavList ? 2 : 0,
                textDecoration: 'none',
                color: 'inherit',
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
            component={Link}
            to={'/admin/tiedotteet'}
            sx={{
                bgcolor: open.bulletinsNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open.bulletinsNavList ? 2 : 0,
                textDecoration: 'none',
                color: 'inherit',
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
            component={Link}
            to={'/admin/viestit'}
            sx={{
                bgcolor: open.messagingNavList ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open.messagingNavList ? 2 : 0,
                textDecoration: 'none',
                color: 'inherit',
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
