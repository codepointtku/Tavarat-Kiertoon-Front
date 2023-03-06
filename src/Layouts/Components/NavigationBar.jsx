import { Link } from 'react-router-dom';

import { Box, Button, ButtonGroup, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderBottom: '1px solid #009bd8',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 0),
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
            width: '18ch',
            // '&:focus': {
            //     width: '22ch',
            // },
        },
    },
}));

function NavigationBar() {
    return (
        <>
            <Box
                id="navbar-container"
                aria-label="navigation bar"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    mb: '0.4rem',
                }}
            >
                <Box id="navbuttons-wrapper" sx={{ borderBottom: '1px solid #009bd8' }}>
                    <ButtonGroup
                        variant="text"
                        id="navbuttons"
                        aria-label="navigation link buttons"
                        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
                    >
                        <Button component={Link} to="/">
                            Tuotteet
                        </Button>
                        <Button component={Link} to="/kategoriat">
                            Kategoriat
                        </Button>
                        <Button component={Link} to="/tiedotteet">
                            Tiedotteet
                        </Button>
                        <Button component={Link} to="/ohjeet">
                            Ohjeet
                        </Button>
                        <Button component={Link} to="/stats">
                            Tilastot
                        </Button>
                        <Button component={Link} to="/lihapullat">
                            Lihapullat
                        </Button>
                    </ButtonGroup>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon sx={{ fontSize: 30, color: 'primary.main' }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                        autoFocus
                        placeholder="Etsi tuotteita…"
                        inputProps={{ 'aria-label': 'searchfield' }}
                    />
                </Search>
            </Box>
        </>
    );
}

export default NavigationBar;
