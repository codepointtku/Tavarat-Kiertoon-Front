import * as React from 'react';
import { Form, useSubmit, Link, useActionData, useRouteLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';

import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailIcon from '@mui/icons-material/Mail';

import Tooltip from '../../Tooltip';
import AlertBox from '../../AlertBox';

import type { adminLogOut } from '../../../Router/actions';
import type { adminLoader } from '../../../Router/loaders';

import logo from '../../../Assets/Turku_vaaka_300ppi_viiva_white.png';

function AdminAppBar() {
    const [avatarDropDownMenu, setAvatarDropDownMenu] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { messages } = useRouteLoaderData('admin') as Awaited<ReturnType<typeof adminLoader>>;

    const handleClickAvatarDropDownMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAvatarDropDownMenu(!avatarDropDownMenu);
        setAnchorEl(event.currentTarget);
    };

    const handleCloseAvatarDropDownMenu = () => {
        setAvatarDropDownMenu(!avatarDropDownMenu);
        setAnchorEl(null);
    };

    // log out functionality:
    const { handleSubmit } = useForm();
    const responseStatus = useActionData() as Awaited<ReturnType<typeof adminLogOut>>;
    const submit = useSubmit();
    const onClickLogOut = () => {
        submit(null, {
            method: 'post',
        });
    };

    return (
        <>
            {responseStatus?.type === 'logout' && responseStatus?.status === true && (
                // <AlertBox text="asia pihvi, hei hei ja huomiseen" status="success" redirectUrl="/" timer={4000} />
                <AlertBox text="Kirjauduttu ulos?" status="success" />
            )}

            {responseStatus?.type === 'logout' && responseStatus?.status === false && (
                <AlertBox text="Käristynyt kananmuna-aivo" status="error" />
            )}

            <AppBar
                id="admin-panel-appbar"
                position="static"
                sx={{
                    width: 'min-content',
                    backgroundColor: 'primary.main',
                    boxShadow: 0,
                }}
            >
                <Toolbar id="admin-panel-appbar-toolbar" disableGutters>
                    <Stack id="appbar-icons-stack-row" direction="row" alignItems="center">
                        <Box id="statistics" sx={{ margin: '0 1rem 0 0' }}>
                            <Tooltip title="Tarkastele tilastoja">
                                <IconButton component={Link} to="/admin/tilastot">
                                    <QueryStatsIcon sx={{ color: 'primary.contrastText' }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box id="notifs" sx={{ margin: '0 1rem 0 1rem' }}>
                            <Tooltip title="Ilmoitukset">
                                <IconButton>
                                    <Badge badgeContent={4} color="error">
                                        <NotificationsNoneIcon sx={{ color: 'primary.contrastText' }} />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box id="mail" sx={{ margin: '0 1rem 0 1rem' }}>
                            <Tooltip title="Uudet viestit">
                                <IconButton>
                                    <Badge badgeContent={messages.count} color="error">
                                        <MailIcon sx={{ color: 'primary.contrastText' }} />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box id="avatar" sx={{ margin: '0 0 0 1rem' }}>
                            {/* <Tooltip title="Kirjautuminen" position="left-end"> */}
                            <IconButton onClick={handleClickAvatarDropDownMenu}>
                                <Avatar sx={{ bgcolor: 'success.dark' }}>A</Avatar>
                                <Menu
                                    id="avatar-dropdown-menu"
                                    anchorEl={anchorEl}
                                    open={avatarDropDownMenu}
                                    onClose={handleCloseAvatarDropDownMenu}
                                >
                                    <MenuItem onClick={handleCloseAvatarDropDownMenu} divider>
                                        Käyttäjäprofiili
                                    </MenuItem>
                                    <Box component={Form} onSubmit={handleSubmit(onClickLogOut)}>
                                        {/* <MenuItem>Kirjaudu ulos</MenuItem> */}
                                        <Button type="submit">Kirjaudu ulos</Button>
                                    </Box>
                                </Menu>
                            </IconButton>
                            {/* </Tooltip> */}
                        </Box>
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
}

function PanelHeader() {
    return (
        <Box id="header-appbar-container" sx={{ backgroundColor: 'primary.main', padding: '1rem' }}>
            <Grid container flexDirection="row">
                <Grid item xs={2} md={2}>
                    <Link to="/">
                        <img src={logo} alt="Turku logo" style={{ width: 'auto', maxWidth: '9rem', height: 'auto' }} />
                    </Link>
                </Grid>

                <Grid
                    item
                    xs={3}
                    md={3}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h4" color="primary.contrastText">
                            Tavarat Kiertoon
                        </Typography>
                    </Box>
                </Grid>

                <Grid
                    item
                    xs={7}
                    md={7}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <AdminAppBar />
                </Grid>
            </Grid>
        </Box>
    );
}

export default PanelHeader;
