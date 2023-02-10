import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../Assets/turku_pysty_300ppi_viiva_black.png';
// import PropTypes from 'prop-types';

// JTo: Disable ESLint proptypes for this file untill we have proper structure
/* eslint react/prop-types: 0 */

// Create styles
const styles = StyleSheet.create({
    orderPage: {
        flexDirection: 'column',
        padding: 10,
        fontSize: 14,
    },
    addressSection: {
        border: '1px solid red',
        padding: 10,
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
    },
    addressLogo: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    addressTextLeft: {
        flexDirection: 'column',
        flex: 1,
    },
    addressTextRight: {
        flexDirection: 'column',
        flex: 2,
    },
    freeDescriptionSection: {
        border: '1px solid red',
        flexDirection: 'column',
        flex: 1,
        padding: 10,
        marginBottom: 10,
    },
    listSection: {
        border: '1px solid red',
        padding: 10,
        flex: 2,
        lineHeight: '1.5',
    },
    list: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    productPage: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        fontSize: 14,
    },
    product: {
        width: '50%', // 2 products / line
        height: '25%', // 4 lines of products / page
        fontSize: 14,
        padding: '20px',
    },
});

// Create Document Component
function PDFDocument({ order }) {
    const orderId = order.id;
    const orderRecipient = order.contact;
    const orderAddress = order.delivery_address;
    const orderInfo = order.order_info;
    const orderProducts = order.products.map((product) => ({ id: product, imageSrc: '../br.jpg' }));

    return (
        <Document language="fi">
            <Page size="A4" style={styles.orderPage}>
                <View style={styles.addressSection}>
                    <View style={styles.addressLogo}>
                        <Image src={logo} style={{ width: '60px' }} />
                    </View>
                    <View style={styles.addressTextLeft} />
                    <View style={styles.addressTextLeft}>
                        <Text style={{ paddingBottom: '10px' }}>Tilausnumero:</Text>
                        <Text>Vastaanottaja:</Text>
                        <Text>Toimitusosoite:</Text>
                    </View>
                    <View style={styles.addressTextRight}>
                        <Text style={{ paddingBottom: '10px' }}>{orderId}</Text>
                        <Text>{orderRecipient}</Text>
                        <Text>{orderAddress}</Text>
                    </View>
                </View>
                <View style={styles.freeDescriptionSection}>
                    <Text>{orderInfo}</Text>
                </View>
                <View style={styles.listSection}>
                    <Text style={{ marginBottom: 10 }}>Tuotteet</Text>
                    <View style={styles.list}>
                        {orderProducts.map((product, index) =>
                            index < orderProducts.length - 1 ? (
                                <Text key={product.id}>{product.id}, </Text>
                            ) : (
                                <Text key={product.id}>{product.id}</Text>
                            )
                        )}
                    </View>
                </View>
            </Page>

            <Page style={styles.productPage}>
                {orderProducts.map((product) => (
                    <View style={styles.product} key={product.id}>
                        <Text>Product {product.id}</Text>
                        <Image src="../br.jpg" style={{ width: '200px' }} />
                        <Text>Just to fill a page untill we have something to show here</Text>
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
//
