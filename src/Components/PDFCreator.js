import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        border: '1px solid green',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        border: '1px solid red',
    },
});

// Create Document Component
/* eslint-disable-next-line */
function PDFDocument({ order }) {
    /* eslint-disable-next-line */
    console.log("PDFCreator", order)

    /* eslint-disable-next-line */
    const orderId = order.id

    /* eslint-disable-next-line */
    const orderRecipient = order.recipient

    /* eslint-disable-next-line */
    const orderAddress = order.address

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                <Text>Tilaus {orderId}</Text>
                <Text>Vastaanottaja {orderRecipient}</Text>
                <Text>Toimitusosoite {orderAddress}</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                    <Text>Jotain tosi tärkeää tietoa</Text>
                </View>
            </Page>
        </Document>
    );
}

export default PDFDocument;
