import { Link } from 'react-router-dom';
import { Avatar, Badge, Box, IconButton, InputBase, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailIcon from '@mui/icons-material/Mail';
import Tooltip from '../../Tooltip';

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
    return (
        <Box id="admin-panel-header-bar" sx={{ backgroundColor: 'primary.main', padding: '1rem' }}>
            <Box
                id="header-items-wrapper"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    color: 'primary.contrastText',
                    padding: '0 0 0 7rem',
                }}
            >
                <Box id="header-title-wrapper" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" color="primary.contrastText">
                        Tervetuloa takaisin, Antti Adminen
                    </Typography>
                    <Typography variant="body2" color="text.hint">
                        Tässä päivän uutiset
                    </Typography>
                </Box>
                <Box id="vertical-spacer" sx={{ margin: '0 4rem 0 0', padding: '1rem', flexGrow: 1 }} />
                <Box id="statistics" sx={{ margin: '0 1rem 0 1rem' }}>
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
                    <Tooltip title="Kirjautuminen">
                        <Avatar sx={{ bgcolor: 'success.dark' }}>A</Avatar>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
}

export default PanelHeader;
