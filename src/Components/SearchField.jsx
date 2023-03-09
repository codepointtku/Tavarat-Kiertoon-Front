import { Box, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.main, 0.06),
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
    },
}));

function SearchField() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Search>
                <InputBase
                    autoFocus
                    placeholder="Etsi tuotteita…"
                    startAdornment={<SearchIcon sx={{ fontSize: 30, color: 'primary.main', marginRight: '3rem' }} />}
                    inputProps={{ 'aria-label': 'searchfield' }}
                    sx={{ color: 'inherit', padding: '1rem 6rem 1rem 1rem' }}
                />
            </Search>
        </Box>
    );
}

export default SearchField;
