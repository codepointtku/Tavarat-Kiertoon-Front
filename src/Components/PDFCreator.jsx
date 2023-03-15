/* eslint-disable */
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
// import logo from '../Assets/turku_pysty_300ppi_viiva_black.png';
import logo from '../Assets/LOGO.png';
// import PropTypes from 'prop-types';

// NOTE: JTo: Temporary baseUrl. Move this to env variable.
const baseUrl = 'http://localhost:8000';

// Create styles
const styles = StyleSheet.create({
    orderPage: {
        flexDirection: 'column',
        padding: 10,
        fontSize: 12,
    },
    // Section
    addressSection: {
        border: '1px solid lightgray',
        padding: 10,
        marginBottom: 10,
        flex: 0.1,
        flexDirection: 'row',
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
    // Section
    orderInfoSection: {
        border: '1px solid lightgray',
        flexDirection: 'column',
        flex: 0.4,
        padding: 10,
        marginBottom: 10,
    },
    // Section
    listSection: {
        // border: '1px solid black',
        padding: 10,
        flex: 0.5,
        lineHeight: '1.5',
    },
    list: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        fontSize: 10,
        marginLeft: 10,
    },
    productPage: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        fontSize: 12,
    },
    product: {
        width: '48%', // 2 products / line
        height: '25%', // 4 lines of products / page
        fontSize: 12,
        padding: 10,
        margin: 5,
        border: '1px solid lightgray',
    },
});

// Create Document Component
function PDFDocument({ order }) {
    // constants for page creation
    const productsPerPage = 8
    const productOnFirstPage = 4

    // create productList array to render.
    // read order.products that contains every product individually
    // move orderProducts with same barcode into same array inside productList array.
    //  => productList.length is number of different products
    //  => productList[0][0] is a single product
    //  => productList[0].length is the number of those products
    const productList = []
    order.products.forEach(orderProduct => {
        const i = productList.findIndex(productListProduct => productListProduct[0]?.barcode === orderProduct.barcode)
        if (i < 0) {
            productList.push([orderProduct])
            return
        }
        productList[i].push([orderProduct])
    });

    // calculate the number of pages needed



    // Address section on top of the page
    const addressSection = (
        <View style={styles.addressSection}>
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
    )

    const orderInfoSection = (
        <View style={styles.orderInfoSection}>
            <Text style={{ marginVertical: 10 }}>Lisätietoa</Text>
            <Text style={{ fontSize: 10, marginLeft: 10 }}>{order.order_info}</Text>
            <Text style={{ marginVertical: 10 }}>Tuotteet</Text>
            <View style={styles.list}>
                {productList.map((product, index) => (
                    <Text key={product[0].id}>
                        {product[0].name} x {product.length}{index === productList.length-1 ? '' : ', '}
                    </Text>
                ))}
            </View>
        </View>
    )


    return (
        <Document language="fi">
            <Page size="A4" style={styles.orderPage}>
                <Text>Tavarat kiertoon</Text>
                {addressSection}
                {orderInfoSection}
                <View style={styles.listSection}>
                </View>
            </Page>

            <Page style={styles.productPage}>
                {productList.map((product) => (
                    <View style={styles.product} key={product[0].id}>
                        <Text style={{ marginBottom: "5px" }}>
                            Tuote {product[0].id}: {product[0].name}, {product.length} kpl
                        </Text>
                        <Image src={`${baseUrl}/media/${product[0].pictures[0]}`} style={{ width: '200px' }} />

                        <Text>Tähän voi kirjoittaa lisää tietoa tuotteesta</Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
}

// PDFDocument.propTypes = {
//     order: PropTypes.object
// };

export default PDFDocument;
