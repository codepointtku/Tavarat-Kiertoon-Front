import * as React from 'react';
import { useSubmit, Link, useActionData } from 'react-router-dom';

import { AppBar, Avatar, Badge, Box, IconButton, InputBase, Menu, MenuItem, Stack, Toolbar } from '@mui/material';

import { styled, alpha } from '@mui/material/styles';

import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailIcon from '@mui/icons-material/Mail';

import Tooltip from '../../Tooltip';
import AlertBox from '../../AlertBox';

import type { adminLogOut } from '../../../Router/actions';

function Search() {
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Etsi sivustolta..." inputProps={{ 'aria-label': 'search' }} />
        </Search>
    );
}

function PanelHeader() {
    const [avatarDropDownMenu, setAvatarDropDownMenu] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClickAvatarDropDownMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAvatarDropDownMenu(!avatarDropDownMenu);
        setAnchorEl(event.currentTarget);
    };

    const handleCloseAvatarDropDownMenu = () => {
        setAvatarDropDownMenu(!avatarDropDownMenu);
        setAnchorEl(null);
    };

    // log out functionality:
    const responseStatus = useActionData() as Awaited<ReturnType<typeof adminLogOut>>;
    const submit = useSubmit();
    const onClickLogOut = () => {
        submit(null, {
            method: 'post',
            action: '/admin',
        });
    };

    return (
        <>
            {responseStatus?.type === 'logout' && (
                <AlertBox text="asia pihvi, hei hei ja huomiseen" status="success" redirectUrl="/" timer={4000} />
            )}

            <AppBar
                id="admin-panel-appbar"
                sx={{
                    width: 'min-content',
                    backgroundColor: 'primary.main',
                    padding: '1rem',
                    boxShadow: 0,
                }}
            >
                <Toolbar id="admin-panel-appbar-toolbar">
                    <Stack id="appbar-icons-stack-row" direction="row" alignItems="center">
                        <Box id="statistics" sx={{ margin: '0 1rem 0 0rem' }}>
                            <Tooltip title="Tarkastele tilastoja">
                                <IconButton component={Link} to="/admin/tilastot">
                                    <QueryStatsIcon sx={{ color: 'primary.contrastText' }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Search />
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
                                    <Badge badgeContent={3} color="error">
                                        <MailIcon sx={{ color: 'primary.contrastText' }} />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box id="avatar" sx={{ margin: '0 1rem 0 1rem' }}>
                            {/* <Tooltip title="Kirjautuminen"> */}
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
                                    <MenuItem onClick={onClickLogOut}>Kirjaudu ulos</MenuItem>
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

export default PanelHeader;
