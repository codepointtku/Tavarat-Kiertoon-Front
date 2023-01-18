import { Button } from '@mui/material';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

function DefaultView() {
    const { auth } = useContext(AuthContext);
    console.log('Auth', auth); // JTo: console log to get rid of ESLint error. Remove once context is taken into use

    return (
        <>
            <h1>Tavarat Kiertoon</h1>
            <div>tähän komponentteja, ei divejä yms</div>
            <Button>Tämä on etusivu</Button>
        </>
    );
}

export default DefaultView;
