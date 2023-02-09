import { Container, Box } from '@mui/material';
import { Form } from 'react-router-dom';

function ShoppingCart() {
    return (
        <Container sx={{ border: 3, borderStyle: 'solid', borderRadius: 3, padding: 20, margin: 10 }}>
            <Form>
                <Box />
            </Form>
        </Container>
    );
}

export default ShoppingCart;

// return <div style={{ textAlign: 'center', margin: 40 }}>Shopping Cart page</div>;
