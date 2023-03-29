import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import logo from '../Assets/LOGO.png';

// NOTE: JTo: Temporary baseUrl. Move this to env variable.
const baseUrl = `${window.location.protocol}//${window.location.hostname}:8000`;

// Create styles
const styles = StyleSheet.create({
    // Pages
    page: {
        padding: 30,
        fontSize: 12,
    },
    pageView: {
        height: '100%',
        width: '100%',
    },

    // Address
    address: {
        border: '1px solid lightgray',
        flex: 0.1,
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
    },
    addressLogo: {
        flex: 0.4,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    addressField: {
        flex: 0.2,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    addressValue: {
        flex: 0.4,
        flexDirection: 'column',
        justifyContent: 'center',
    },

    // orderInfo
    orderInfo: {
        border: '1px solid lightgray',
        flex: 0.2,
        flexDirection: 'column',
        marginBottom: 10,
        padding: 10,
    },
    orderInfoProductList: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        fontSize: 10,
        marginLeft: 10,
    },

    // firstPageProducts
    firstPageProducts: {
        flex: 0.7,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    productCard: {
        border: '1px solid lightgray',
        fontSize: 12,
        padding: 10,
        width: '50%', // 2 products / line
        height: '250px', // 3 lines of products / product page
    },
    productImg: {
        height: 'auto',
        width: '70%',
        marginBottom: '10px',
    },
    productPage: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

/**
 * Create PDF Renderable productlist for the order
 * @param {Array} aProducts : Array of all products individually (from backend)
 * @returns {Array} aRenderPages : Array of combined productsproducts
 */
const createRenderableProductList = (aProducts) => {
    // move all aProducts with same group_id into same array inside aTempProducts array.
    // [{}{}{}{}{}{}{}] => [ [{}{}{}], [{}], [{}{}], [{}] ]
    //  => aTemp[0][0] == product, aTemp[0].length == product amount, aTemp.length == number of different products
    const aTempProducts = [];
    aProducts.forEach((aProduct) => {
        const productIndex = aTempProducts.findIndex((aTempProduct) => aTempProduct[0]?.group_id === aProduct.group_id);
        // productIndex < 0 ? aTempProducts.push([aProduct]) : aTempProducts[productIndex].push([aProduct]);
        if (productIndex < 0) {
            aTempProducts.push([aProduct]);
        } else {
            aTempProducts[productIndex].push([aProduct]);
        }
    });

    // create a single Array that contains only unique objects and add numberOfProducts field to each object
    // [ [{}{}{}], [{}], [{}{}], [{}] ] => [ {}{}{}{} ]
    //  => aRenderProducts[0] == single product, aRenderProducts[0].numberOfProducts == number of those products
    const aRenderProducts = [];
    aTempProducts.forEach((aProduct, index) => {
        aRenderProducts.push(aProduct[0]);
        aRenderProducts[index] = { ...aRenderProducts[index], numberOfProducts: aTempProducts[index].length };
    });

    return aRenderProducts;
};

/**
 * Move products to page size arrays. First page has less products due to space taken by address and orderInfo
 * [ {}{}{}{}{}{}{}{}{}{}{}{}{}{} ] => [ [{}{}{}{}],[{}{}{}{}{}{}],[{}{}{}{}] ]
 * @returns
 */
const createPaginatedProductsLists = (aRenderProducts) => {
    const productsOnFirstPage = 4;
    const productsPerPage = 6;

    const aRenderPages = [];
    const firstChunk = aRenderProducts.slice(0, productsOnFirstPage);
    aRenderPages.push(firstChunk);
    for (let i = productsOnFirstPage; i < aRenderProducts.length; i += productsPerPage) {
        const chunk = aRenderProducts.slice(i, i + productsPerPage);
        aRenderPages.push(chunk);
    }
    return aRenderPages;
};

/**
 * PDF Document
 * Creates a PDF document based on the
 *
 * @param {*} order : The order that needs to be printed
 */
function PDFDocument({ order }) {
    const productList = createRenderableProductList(order.products);
    const paginatedProductList = createPaginatedProductsLists(productList);

    // Address section on top of the page
    const addressSection = () => (
        <View style={styles.address}>
            <View style={styles.addressLogo}>
                <Image src={logo} style={{ width: '140px' }} />
            </View>
            <View style={styles.addressField}>
                {/* <Text style={{ marginVertical: '2px' }}>Tilausnumero:</Text> */}
                <Text style={{ marginVertical: '2px' }}>Vastaanottaja:</Text>
                <Text style={{ marginVertical: '2px' }}>Toimitusosoite:</Text>
                <Text style={{ marginVertical: '2px' }}>Puhelinnumero:</Text>
            </View>
            <View style={styles.addressValue}>
                {/* <Text style={{ marginVertical: '2px' }}>{order.id ? order.id : ' '}</Text> */}
                <Text style={{ marginVertical: '2px' }}>{order.contact ? order.contact : ' '}</Text>
                <Text style={{ marginVertical: '2px' }}>{order.delivery_address ? order.delivery_address : ' '}</Text>
                <Text style={{ marginVertical: '2px' }}>{order.phone_number ? order.phone_number : ' '}</Text>
            </View>
        </View>
    );

    // First page "additional info" field
    const orderInfoSection = () => (
        <View style={styles.orderInfo}>
            <Text style={{ marginBottom: 5 }}>Lisätietoa</Text>
            <Text style={{ fontSize: 10, marginLeft: 10 }}>{order.order_info}</Text>

            {/* Render list of products to the orderInfoSection */}
            {/* <Text style={{ marginVertical: 5 }}>Tuotteet</Text>
                <View style={styles.orderInfoProductList}>
                    {productList.map((product, index) => (
                        <Text key={product.id}>
                            {product.name} x {product.numberOfProducts}
                            {index === productList.length - 1 ? '' : ', '}
                        </Text>
                    ))}
                </View> */}
        </View>
    );

    // Product card
    const productCard = (product) => (
        <View style={styles.productCard} key={product.id}>
            <Image src={`${baseUrl}/media/${product.pictures[0]}`} style={styles.productImg} />

            <Text style={{ fontSize: '12', marginBottom: '5px' }}>
                {product.name}: {product.numberOfProducts} kpl.
            </Text>
            <Text style={{ fontSize: '10', marginBottom: '5px' }}>Tuotenro: {product.group_id}</Text>
            <Text style={{ fontSize: '10', marginBottom: '5px' }}>
                Sijainti: {product.storage_name}
                {product.shelf_id ? ` / ${product.shelf_id}` : ''}
            </Text>
        </View>
    );

    const headerSection = (page) => (
        <View style={{ fontSize: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text>Tavarat Kiertoon</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>Tilausnumero: {order.id}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text>
                    Sivu {page}/{paginatedProductList.length}
                </Text>
            </View>
        </View>
    );

    // render first page products (returns a view)
    const firstPageProducts = () => (
        <View style={styles.firstPageProducts}>{paginatedProductList[0].map((product) => productCard(product))}</View>
    );

    // render products for rest of the pages (returns pages)
    const productPages = () => (
        <Page size="A4" style={styles.page}>
            {paginatedProductList.slice(1).map((pageList, index) => (
                <View key={pageList[0].id} style={styles.pageView}>
                    {headerSection(index + 2, paginatedProductList.length)}
                    <View style={styles.productPage}>{pageList.map((product) => productCard(product))}</View>
                </View>
            ))}
        </Page>
    );

    // RENDER
    return (
        <Document language="fi">
            {/* First page */}
            <Page size="A4" style={styles.page}>
                <View style={styles.pageView}>
                    {headerSection(1)}
                    {addressSection()}
                    {orderInfoSection()}
                    {firstPageProducts()}
                </View>
            </Page>

            {/* Rest of the pages */}
            {paginatedProductList.length > 1 && productPages()}
        </Document>
    );
}

/**
 * Proptypes
 */
PDFDocument.propTypes = {
    order: PropTypes.shape({
        products: PropTypes.arrayOf(PropTypes.object),
        contact: PropTypes.string,
        delivery_address: PropTypes.string,
        phone_number: PropTypes.string,
        order_info: PropTypes.string,
        id: PropTypes.number,
    }).isRequired,
};

export default PDFDocument;
