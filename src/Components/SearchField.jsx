import { Box, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderBottom: '1px solid #009bd8',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
    },
    width: '100%',
    [theme.breakpoints.up('xs')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    // padding: theme.spacing(0, 0),
    padding: '0rem 0rem 0rem 1rem',
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
        padding: theme.spacing(2, 2, 2, 2),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '26ch',
            '&:focus': {
                width: '32ch',
            },
        },
    },
}));

function SearchField() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon sx={{ fontSize: 30, color: 'primary.main' }} />
                </SearchIconWrapper>
                <StyledInputBase autoFocus placeholder="Etsi tuotteita…" inputProps={{ 'aria-label': 'searchfield' }} />
            </Search>
        </Box>
    );
}

export default SearchField;
