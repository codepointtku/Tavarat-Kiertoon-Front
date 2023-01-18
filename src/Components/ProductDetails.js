import { useParams } from 'react-router-dom';

function ProductDetails() {
    const { productId } = useParams();

    return <div>ProductDetails id:{productId} - tuotteen yksityiskohtaiset tiedot</div>;
}

export default ProductDetails;
