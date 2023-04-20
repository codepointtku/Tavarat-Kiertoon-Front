import { Avatar, Badge, Box, IconButton, InputBase, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailIcon from '@mui/icons-material/Mail';

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
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
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
                }}
            >
                <Box id="header-title-wrapper" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6">Tervetuloa takaisin, pekkapuupää</Typography>
                    <Typography variant="body2" color="text.hint">
                        Tässä päivän uutiset
                    </Typography>
                </Box>
                <Box id="vertical-spacer" sx={{ border: '1px solid green', padding: '1rem', flexGrow: 1 }} />
                <Search />
                <Box id="notifs" sx={{ margin: '0 1rem 0 1rem' }}>
                    <IconButton>
                        <Badge badgeContent={4} color="error">
                            <NotificationsNoneIcon />
                        </Badge>
                    </IconButton>
                </Box>
                <Box id="mail" sx={{ margin: '0 1rem 0 1rem' }}>
                    <IconButton>
                        <Badge badgeContent={3} color="error">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                </Box>
                <Box id="avatar" sx={{ margin: '0 1rem 0 1rem' }}>
                    <Avatar sx={{ bgcolor: 'primary.light' }}>A</Avatar>
                </Box>
            </Box>
        </Box>
    );
}

export default PanelHeader;
