import ProductList from '../Components/ProductList';
import '../Styles/defaultview.css';

function DefaultView() {
    return (
        <>
            <h1>Tavarat Kiertoon</h1>
            <div>tähän komponentteja, ei divejä yms</div>
            <ProductList />
        </>
    );
}

export default DefaultView;
