/* eslint-disable */
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../Assets/LOGO.png';
// import PropTypes from 'prop-types';

// NOTE: JTo: Temporary baseUrl. Move this to env variable.
const baseUrl = 'http://localhost:8000';

// Create styles
const styles = StyleSheet.create({
    img: {
        width: '70%',
        height: 'auto',
    },

    // Pages
    page: {
        padding: 20,
        fontSize: 12,
    },
    pageView: {
        height: '100%',
        width: '100%',
        // backgroundColor: 'red',
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
        flexDirection: 'column',
        flex: 0.4,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    addressField: {
        flexDirection: 'column',
        flex: 0.2,
    },
    addressValue: {
        flexDirection: 'column',
        flex: 0.4,
    },

    // orderInfo
    orderInfo: {
        border: '1px solid lightgray',
        flex: 0.25,
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
        // border: '1px solid lightgray',
        flex: 0.65,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    productCard: {
        border: '1px solid lightgray',
        fontSize: 12,
        padding: 10,
        width: '50%', // 2 products / line
        height: '50%', // 4 lines of products / page
    },

    // -------------------------------------------------------------------------------------
    orderPage: {
        flexDirection: 'column',
        padding: 20,
        fontSize: 12,
    },
    productPage: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
        fontSize: 12,
    },

    productSection: {
        // border: '1px solid black',
        // padding: 10,
        flex: 0.6,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // lineHeight: '1.5',
    },

    list: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        fontSize: 10,
        marginLeft: 10,
    },
    // productCard: {
    //     width: '48%', // 2 products / line
    //     height: '42%', // 4 lines of products / page
    //     fontSize: 12,
    //     padding: 10,
    //     margin: 5,
    //     border: '1px solid lightgray',
    // },
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
        productIndex < 0 ? aTempProducts.push([aProduct]) : aTempProducts[productIndex].push([aProduct]);
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
 * Move products to page size arrays. First page has less products due to orderInfo
 * [ {}{}{}{}{}{}{}{}{}{}{}{}{}{} ] => [ [{}{}{}{}],[{}{}{}{}{}{}{}{}],[{}{}] ]
 * @returns
 */
const createPaginatedProductsLists = (aRenderProducts) => {
    const productsOnFirstPage = 4;
    const productsPerPage = 8;

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
    console.log('### PDF', paginatedProductList);

    // calculate the number of pages needed

    // Address section on top of the page
    const addressSection = () => {
        return (
            <View style={styles.address}>
                <View style={styles.addressLogo}>
                    <Image src={logo} style={{ width: '140px' }} />
                </View>
                <View style={styles.addressField}>
                    <Text>Tilausnumero:</Text>
                    <Text>Vastaanottaja:</Text>
                    <Text>Toimitusosoite:</Text>
                    <Text>Puhelinnumero:</Text>
                </View>
                <View style={styles.addressValue}>
                    <Text>{order.id ? order.id : ' '}</Text>
                    <Text>{order.contact ? order.contact : ' '}</Text>
                    <Text>{order.delivery_address ? order.delivery_address : ' '}</Text>
                    <Text>{order.phone_number ? order.phone_number : ' '}</Text>
                </View>
            </View>
        );
    };

    // First page "additional info" field
    const orderInfoSection = () => {
        return (
            <View style={styles.orderInfo}>
                <Text style={{ marginBottom: 5 }}>Lisätietoa</Text>
                <Text style={{ fontSize: 10, marginLeft: 10 }}>{order.order_info}</Text>
                <Text style={{ marginVertical: 5 }}>Tuotteet</Text>
                <View style={styles.orderInfoProductList}>
                    {productList.map((product, index) => (
                        <Text key={product.id}>
                            {product.name} x {product.numberOfProducts}
                            {index === productList.length - 1 ? '' : ', '}
                        </Text>
                    ))}
                </View>
            </View>
        );
    };

    // First page products
    const firstPageProducts = (paginatedProductList) => {
        return (
            <View style={styles.firstPageProducts}>
                {paginatedProductList[0].map((product) =>
                    // Render a single Product Card
                    productCard(product)
                )}
            </View>
        );
    };

    // Product card
    const productCard = (product) => {
        return (
            <View style={styles.productCard} key={product.id}>
                <Image src={`${baseUrl}/media/${product.pictures[0]}`} style={styles.img} />
                {/* <Image src={`${baseUrl}/media/${product.pictures[0]}`} style={{ width: '150px' }} /> */}
                {/* <Image src={`${baseUrl}/media/${product.pictures[0]}`} style={{ width: '100%' }} /> */}
                <Text>
                    {product.name}: {product.numberOfProducts} kpl.
                </Text>
                <Text>Tuotenumero: {product.group_id}</Text>
                <Text>
                    Sijainti: {product.storage_name}
                    {product.shelf_id ? ' / ' + product.shelf_id : ''}
                </Text>
            </View>
        );
    };

    return (
        <Document language="fi">
            <Page size="A4" style={styles.page}>
                <View style={styles.pageView}>
                    {addressSection()}
                    {orderInfoSection()}
                    {firstPageProducts(paginatedProductList)}
                </View>
            </Page>

            {/* <Page size="A4" style={styles.orderPage}>
                <Text>Tavarat kiertoon sivu 1 / {paginatedProductList.length}</Text>
                {addressSection()}
                {orderInfoSection()}
                <View style={styles.productSection}>
                    {paginatedProductList[0].map((product) =>
                        // Render a single Product Card
                        productCard(product)
                    )}
                </View>
            </Page> */}

            {/* <Page style={styles.productPage}>
                {productList.map((product) =>
                    // Render a single Product Card
                    productCard(product)
                )}
            </Page> */}
        </Document>
    );
}

// PDFDocument.propTypes = {
//     order: PropTypes.object
// };

export default PDFDocument;
