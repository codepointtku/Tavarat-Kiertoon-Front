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
function PDFDocument(props) {

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    );
}

export default PDFDocument;
