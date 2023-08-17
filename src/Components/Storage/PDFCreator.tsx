import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../../Assets/LOGO.png';
import { type PDFOrderType } from './PDFView';

// TODO: JTo: Temporary baseUrl. Move this to env variable.
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
 * Create a grouped productlist
 *
 * move all products with same product.id into same array inside groupedProductsArray.
 *  => [{}{}{}{}{}{}{}] => [ [{}{}{}], [{}], [{}{}], [{}] ]
 *  => groupedProductsArray[0][0] == product item (f.e. individual chair)
 *     groupedProductsArray[0].length == number of product items in a product group (f.e. 5 chairs)
 *     groupedProductsArray.length == number of different product groups (f.e chairs, tables, lamps = 3 groups )
 *
 * @param {Array} orderProducts : Array of all products individually (from backend)
 * @returns {Array} groupedProductsArray : Array of product group arrays
 */
const createGroupedProductList = (orderProducts: PDFOrderType['product_items']) => {
    const groupedProducts: PDFOrderType['product_items'][] = [];
    orderProducts.forEach((orderProduct) => {
        const productIndex = groupedProducts.findIndex(
            (groupedProducts) => groupedProducts[0]?.product.id === orderProduct.product.id
        );
        if (productIndex < 0) {
            groupedProducts.push([orderProduct]);
        } else {
            groupedProducts[productIndex].push(orderProduct);
        }
    });
    return groupedProducts;
};

/**
 * Create a paginated product list for the product groups
 *
 * Move products to page size arrays. First page has less products due to space taken by address and orderInfo
 * [ [][][][] [][][][][][] [][][][] ] => [ [ [][][][] ],[ [][][][][][] ],[ [][][][] ] ]
 *
 * @returns
 */
const createPaginatedProductsLists = (groupedProducts: PDFOrderType['product_items'][]) => {
    const productsOnFirstPage = 4;
    const productsPerPage = 6;

    const paginatedProducts = [];
    const firstChunk = groupedProducts.slice(0, productsOnFirstPage);
    paginatedProducts.push(firstChunk);
    for (let i = productsOnFirstPage; i < groupedProducts.length; i += productsPerPage) {
        const chunk = groupedProducts.slice(i, i + productsPerPage);
        paginatedProducts.push(chunk);
    }
    return paginatedProducts;
};

/**
 * PDF Document
 * Creates a PDF document based on the
 *
 * JTO:
 * Explanation attempt for typescript type for PDFOrderType['product_items'][number]
 *  - PDFOrderType       : Full Loader Data. Taken as Awaited<ReturnType<typeof pdfViewLoader>> and contains everything
 *  - ['product_items']  : product_items array from datatype.
 *  - [number]           : indicates that you want to use type of one object from the array
 *
 * @param {*} order : The order that needs to be printed
 */
function PDFDocument({ order }: { order: PDFOrderType }) {
    const productList = createGroupedProductList(order.product_items);
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
                    <Text key={product[0].id}>
                        {product[0].product.name} x {product.length}
                        {index === productList.length - 1 ? '' : ', '}
                    </Text>
                ))}
            </View> */}
        </View>
    );

    // Product card
    const productCard = (product: PDFOrderType['product_items']) => {
        return (
            <View style={styles.productCard} key={product[0].id}>
                <Image
                    src={`${baseUrl}/media/${product[0]?.product?.pictures[0]?.picture_address}`}
                    style={styles.productImg}
                />

                <Text style={{ fontSize: '12', marginBottom: '5px' }}>
                    {product[0].product.name}: {product.length} kpl.
                </Text>
                <Text style={{ fontSize: '10', marginBottom: '5px' }}>Viivakoodi: {product[0].barcode}</Text>
                <Text style={{ fontSize: '10', marginBottom: '5px' }}>
                    Sijainti: {product[0].storage.name}
                    {product[0].shelf_id ? ` / ${product[0].shelf_id}` : ''}
                </Text>
            </View>
        );
    };

    // top row header with page numbers etc.
    const headerSection = (page: number) => (
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
                <View key={pageList[0][0].id} style={styles.pageView}>
                    {headerSection(index + 2)}
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

export default PDFDocument;
