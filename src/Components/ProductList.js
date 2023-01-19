import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

// TODO: Move mockData to its own file
const mockData = [
    {
        id: '1',
        productName: 'Product1',
        description: 'Description here',
        dateAdded: '01.01.2023',
    },
    {
        id: '2',
        productName: 'Product2',
        description: 'Description here',
        dateAdded: '01.01.2023',
    },
    {
        id: '3',
        productName: 'Product3',
        description: 'Description here',
        dateAdded: '01.01.2023',
    },
    {
        id: '4',
        productName: 'Product4',
        description: 'Description here',
        dateAdded: '01.01.2023',
    },
    {
        id: '5',
        productName: 'Product5',
        description: 'Description here',
        dateAdded: '01.01.2023',
    },
    {
        id: '6',
        productName: 'Product6',
        description: 'Description here',
        dateAdded: '01.01.2023',
    },
];

function ProductList() {
    return (
        <>
            <div>ProductList.js - Content render area. </div>
            <Grid container spacing={3}>
                {mockData?.map((product) => (
                    <Grid item key={product.id}>
                        <ProductCard
                            id={product.id}
                            productName={product.productName}
                            description={product.description}
                            dateAdded={product.dateAdded}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default ProductList;
