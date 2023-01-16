import { useSearchParams } from 'react-router-dom';

function ProductDetails() {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('ID');

    return <div>ProductDetails id:{productId} - tuotteen yksityiskohtaiset tiedot</div>;
}

export default ProductDetails;
