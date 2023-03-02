/* eslint-disable */
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../Assets/turku_pysty_300ppi_viiva_black.png';
// import PropTypes from 'prop-types';

// NOTE: JTo: Temporary baseUrl. Move this to env variable.
const baseUrl = 'http://localhost:8000';

// Create styles
const styles = StyleSheet.create({
    orderPage: {
        flexDirection: 'column',
        padding: 10,
        fontSize: 14,
    },
    addressSection: {
        border: '1px solid black',
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
        border: '1px solid black',
        flexDirection: 'column',
        flex: 1,
        padding: 10,
        marginBottom: 10,
    },
    listSection: {
        border: '1px solid black',
        padding: 10,
        flex: 2,
        lineHeight: '1.5',
    },
    list: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        fontSize: 10,
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
    const orderProducts = order.products;

    // console.log('###', order);

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
                        {orderProducts.map((product, index) => (
                            <Text key={product.id}>
                                {product.id} - {product.name}
                            </Text>
                        ))}
                    </View>
                </View>
            </Page>

            <Page style={styles.productPage}>
                {orderProducts.map((product) => (
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
//
