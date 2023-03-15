/* eslint-disable */
import { border } from '@mui/system';
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
    freeDescriptionSection: {
        border: '1px solid black',
        flexDirection: 'column',
        flex: 0.4,
        padding: 10,
        marginBottom: 10,
    },
    // Section
    listSection: {
        border: '1px solid black',
        padding: 10,
        flex: 0.5,
        lineHeight: '1.5',
    },
    list: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        fontSize: 10,
    },
    productPage: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        fontSize: 12,
    },
    product: {
        width: '50%', // 2 products / line
        height: '25%', // 4 lines of products / page
        fontSize: 12,
        padding: '20px',
    },
});

// Create Document Component
function PDFDocument({ order }) {
    // constants for page creation
    const productsPerPage = 8
    const productOnFirstPage = 4

    // products from props
    const orderProducts = order.products;
    console.log('### PDFCreator:', orderProducts)

    // create productList array to show.
    // move orderProducts with same barcode into same array inside productList array.
    //  => productList[0][0] is a product
    //  => productList[0].length is the number of those products
    const productList = []
    orderProducts.forEach(orderProduct => {
        const i = productList.findIndex(productListProduct => productListProduct[0]?.barcode === orderProduct.barcode)
        if (i < 0) {
            productList.push([orderProduct])
            return
        }
        productList[i].push([orderProduct])
    });
    // console.log('### productList', productList[1][0].barcode,productList[1].length)

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




    return (
        <Document language="fi">
            <Page size="A4" style={styles.orderPage}>
                <Text>Tavarat kiertoon</Text>
                {addressSection}
                <View style={styles.freeDescriptionSection}>
                    <Text style={{ marginVertical: 5 }}>Lisätietoa</Text>
                    <Text style={{ fontSize: 10 }}>{order.order_info}</Text>
                    <Text style={{ marginVertical: 5 }}>Tuotteet</Text>
                    <View style={styles.list}>
                        {orderProducts.map((product, index) => (
                            <Text key={product.id}>
                                {product.name}{index === orderProducts.length-1 ? '' : ', '}
                            </Text>
                        ))}
                    </View>
                </View>
                <View style={styles.listSection}>
                </View>
            </Page>

            <Page style={styles.productPage}>
                {orderProducts.map((product, index) => (
                    <View style={styles.product} key={product.id}>
                        <Text>
                            Tuote {product.id}: {product.name}
                        </Text>
                        <Image src={`${baseUrl}/media/${product.pictures[0]}`} style={{ width: '200px' }} />

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
