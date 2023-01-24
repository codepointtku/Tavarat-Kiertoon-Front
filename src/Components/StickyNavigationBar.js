import { styled, alpha } from '@mui/material/styles';

import { AppBar, Box, Toolbar, InputBase, IconButton, Stack } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CallIcon from '@mui/icons-material/Call';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
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
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function StickyNavigationBar() {
    return (
        <Box>
            <AppBar
                sx={{
                    width: 'min-content',
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: 'flex-end',
                        // alignItems: 'stretch',
                    }}
                >
                    <Stack direction="row" spacing={4}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Etsi tuotteita…" inputProps={{ 'aria-label': 'search' }} />
                        </Search>
                        <IconButton>
                            <ShoppingCartOutlinedIcon sx={{ fontSize: 30, color: '#fff' }} />
                        </IconButton>
                        <IconButton>
                            <AccountCircleOutlinedIcon sx={{ fontSize: 30, color: '#fff' }} />
                        </IconButton>
                        <IconButton>
                            <CallIcon sx={{ fontSize: 30, color: '#fff' }} />
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default StickyNavigationBar;
