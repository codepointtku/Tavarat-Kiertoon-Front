import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import PropTypes from 'prop-types';

// JTo: Disable ESLint proptypes for this file for now
/* eslint react/prop-types: 0 */

// Create styles
const styles = StyleSheet.create({
    orderPage: {
        flexDirection: 'column',
    },
    deliveryAddressSection: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        border: '1px solid red',
        fontSize: 12,
        flexDirection: 'row',
    },
    deliveryAddressShortSection: {
        border: '1px solid green',
        flexDirection: 'column',
        flexGrow: 1,
    },
    deliveryAddressLongSection: {
        border: '1px solid green',
        flexDirection: 'column',
        flexGrow: 2,
    },
    deliveryListSection: {
        margin: 10,
        padding: 10,
        flexGrow: 9,
        border: '1px solid red',
        fontSize: 12,
    },
});

// Create Document Component
function PDFDocument({ order }) {
    console.log('PDFCreator', order);

    const orderId = order.id;
    const orderRecipient = order.recipient;
    const orderAddress = order.address;
    const orderProducts = [...order.products];

    return (
        <Document>
            <Page size="A4" style={styles.orderPage}>
                <View style={styles.deliveryAddressSection}>
                    <View style={styles.deliveryAddressShortSection} />
                    <View style={styles.deliveryAddressShortSection} />

                    <View style={styles.deliveryAddressLongSection}>
                        <Text>Tilausnumero: {orderId}</Text>
                        <Text>Vastaanottaja: {orderRecipient}</Text>
                        <Text>Toimitusosoite: {orderAddress}</Text>
                    </View>
                </View>
                <View style={styles.deliveryListSection}>
                    <Text>Tuotteet</Text>
                    {orderProducts.map((id) => (
                        <Text>- {id}</Text>
                    ))}
                </View>
            </Page>
        </Document>
    );
}

// PDFDocument.propTypes = {
//     order: PropTypes.object
// };

export default PDFDocument;
